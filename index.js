#!/usr/bin/env node
const program = require('commander');

const { createProject } = require('./actions/createProject');
const { setTemplateSource } = require('./actions/setTemplateSource');

program
  .version('1.0.0')

program
  .command('init [projectName]')
  .action((projectName) => {
    createProject(projectName);
  });

program
  .command('setUrl [templateSourceUrl]')
  .action((templateSourceUrl) => {
    setTemplateSource(templateSourceUrl);
  })

program.parse(process.argv);
