#!/usr/bin/env node
const path = require('path');
const fs = require('fs')
const templateSource = require('../config/templateSource.json');

const setTemplateFileUrl = (templateFileUrl) => {
  if (!templateFileUrl) {
    console.error('templateSourceUrl undefined!');
    process.exit(1);
  }
  templateSource.fileUrl = templateFileUrl;

  fs.writeFileSync(path.resolve(__dirname, '../config/templateSource.json'), JSON.stringify(templateSource, null, 2));
}

module.exports = {
  setTemplateFileUrl
}
