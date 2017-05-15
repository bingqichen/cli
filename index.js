#!/usr/bin/env node
const program = require('commander');

const { createProject } = require('./actions/createProject');
const { setTemplateFileUrl } = require('./actions/setTemplateFileUrl');

program
  .version('1.0.0')

program
  .command('init [projectName]')
  .action((projectName) => {
    createProject(projectName);
  });

program
  .command('setUrl [templateFileUrl]')
  .action((templateFileUrl) => {
    setTemplateFileUrl(templateFileUrl);
  })

program.parse(process.argv);
