#!/usr/bin/env node
const program = require('commander');

const { createProject } = require('./actions/createProject');
const { setTemplateFileUrl } = require('./actions/setTemplateFileUrl');

program
  .version('1.0.0')

program
  .command('init [projectName]', '新建项目')
  .action((projectName) => {
    createProject(projectName);
  });

program
  .command('setUrl [templateFileUrl]', '设置获取模版列表的文件源')
  .action((templateFileUrl) => {
    setTemplateFileUrl(templateFileUrl);
  })

program.parse(process.argv);
