const fs = require('fs');
const path = require('path');

const join = path.join;

const isExist = (filePath) => {
  return new Promise((resolve) => {
    fs.stat(filePath, (err) => {
      resolve(!err)
    });
  })
}

const readFileSync = (filePath) => JSON.parse(fs.readFileSync(filePath, { encoding: 'utf8' }).toString());

const getConfig = async () => {
  const configName = 'xtc.config.json';
  const defaultConfig = {
    baseUrl: './locales'
  }
  const filePath = path.resolve(configName);
  const exist = await isExist(filePath);
  const config = Object.assign({}, defaultConfig);
  if (exist) {
    // TODO: 异常处理
    const content = readFileSync(filePath);
    Object.assign(config, content);
  }
  return config;
}

function getJsonFiles(jsonPath) {
  let jsonFiles = [];
  function findJsonFile(path) {
    let files = fs.readdirSync(path);
    files.forEach(function (filename, index) {
      if (!/json$/.test(filename)) return;

      let fPath = join(path, filename);
      let stat = fs.statSync(fPath);
      // if (stat.isDirectory() === true) {
      //   findJsonFile(fPath);
      // }
      if (stat.isFile() === true) {
        let content = readFileSync(fPath);
        jsonFiles.push({
          path: fPath,
          name: filename.replace(/\.json$/i, ''),
          content
        });
      }
    });
  }
  findJsonFile(jsonPath);
  return jsonFiles;
}

const mergeKeys = (keys, appends) => {
  appends.forEach(key => {
    if (keys.indexOf(key) === -1) {
      keys.push(key);
    }
  });
}

const getAllKeys = (fileList) => {
  let keys = null;
  fileList.forEach(item => {
    let _keys = Object.keys(item.content);
    if (!keys) {
      keys = _keys;
    } else {
      mergeKeys(keys, _keys);
    }
  });
  return keys;
}

const formatData = (keys, files) => {
  let result = [];
  keys.forEach(key => {
    let data = {};
    files.forEach(file => {
      data[file.name] = file.content[key] || '';
    })
    result.push({
      name: key,
      data
    });
  });
  return result;
}

const getFilesInfo = (files, keys) => {
  const result = {};
  files.forEach(item => {
    result[item.name] = {
      percent: Math.floor(Object.keys(item.content).length * 100 / keys.length)
    };
  });
  return result;
}

const getFiles = async () => {
  const { baseUrl } = await getConfig();
  const localesPath = path.resolve(baseUrl);
  
  const files = getJsonFiles(localesPath);
  const keys = getAllKeys(files).sort();
  const info = getFilesInfo(files, keys);

  return {
    info,
    datasource: formatData(keys, files)
  };
}

module.exports = {
  getConfig,
  getFiles
}
