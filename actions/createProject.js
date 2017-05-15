#!/usr/bin/env node
const path = require('path');
const fs = require('fs')
const inquirer = require('inquirer');
const axios = require('axios');
const { mkdir, exec, rm, cd } = require('shelljs');

const templateSource = require('../config/templateSource.json');

const questions = [{
  type: 'input',
  name: 'version',
  message: 'version',
  default: '1.0.0'
}, {
  type: 'input',
  name: 'description',
  message: 'description',
  default: ''
}, {
  type: 'input',
  name: 'author',
  message: 'author',
  default: ''
}, {
  type: 'input',
  name: 'license',
  message: 'license',
  default: 'MIT'
}];

const getTemplateList = () => (
  axios.get(templateSource.fileUrl)
    .then(response => response.data)
    .catch((error) => {
      console.log(error)
    })
)

const createProject = async (initName) => {
  const templateList = await getTemplateList();

  questions.unshift({
    type: 'list',
    name: 'template',
    message: 'template',
    choices: Object.keys(templateList)
  });
  if (!initName) {
    questions.unshift({
      type: 'input',
      name: 'name',
      message: 'project-name'
    });
  };

  inquirer
    .prompt(questions)
    .then(({ name = initName, template, version, description, author, license }) => {

      const projectPath = path.resolve(process.cwd(), `./${name}`);

      mkdir('-p', projectPath);

      console.log('clone project started');
      exec(`git clone ${templateList[template]} ${projectPath}`, (code) => {
        if (code !== 0) {
          console.error(code);
          return;
        }

        rm('-rf', path.join(projectPath, './.git'));
        const packageObj = require(path.join(projectPath, './package.json'));
        packageObj.name = name;
        packageObj.version = version;
        packageObj.description = description;
        packageObj.author = author;
        packageObj.license = license;

        fs.writeFileSync(path.join(projectPath, './package.json'), JSON.stringify(packageObj, null, 2));

        cd(projectPath);
        console.log('npm install started');
        exec('npm install');
      });
    })
}


module.exports = {
  createProject
}
