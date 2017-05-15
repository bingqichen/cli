#!/usr/bin/env node
const path = require('path');
const fs = require('fs')
const inquirer = require('inquirer');
const axios = require('axios');
const { mkdir, cd, exec, rm } = require('shelljs');

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
  default: 'react && dva project.'
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
  axios.get(templateSource.source)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
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
      mkdir('-p', path.resolve(process.cwd(), `./${name}`));
      cd(path.resolve(process.cwd(), `./${name}`));

      exec(`git clone ${templateList[template]}`, (code) => {
        if (code !== 0) return;
        rm('-rf', path.resolve('.git'));
        const packageObj = require('./package.json');
        packageObj.name = name;
        packageObj.version = version;
        packageObj.description = description;
        packageObj.author = author;
        packageObj.license = license;

        fs.writeFileSync('./package.json', JSON.stringify(templateSource, null, 2));

        exec('npm install');
      });
    })
}


module.exports = {
  createProject
}
