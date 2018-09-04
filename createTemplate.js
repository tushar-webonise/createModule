var fs = require('fs');
var path = require('path');
var strings = require('./templateConfig.js');
const modulePath = './FOLDERNAME-module';
const outputFolder = './dist';
var readDirFiles = require('read-dir-files');

var files = [];

readDirFiles.list(modulePath, function(err, filenames) {
  if (err) return console.dir(err);
  createModule(filenames);
});

function smartReplace(name) {
  let newName = name;

  Object.keys(strings).forEach(function(key) {
    var find = key;
    var regX = new RegExp(find, 'g');
    newName = newName.replace(regX, strings[key]);
  });

  return newName;
}

function createModule(files) {
  files.forEach(file => {
    console.log(file);
    var _newFileName = smartReplace(file);
    //console.log(file);
    //if folder
    if (fs.lstatSync(file).isDirectory()) {
      try {
        fs.mkdirSync(_newFileName);
      } catch (e) {}
    } else {
      //if file
      var data = fs.readFileSync(file, 'utf8');
      var newText = smartReplace(data);
      fs.writeFileSync(_newFileName, newText);
    }
  });
}
