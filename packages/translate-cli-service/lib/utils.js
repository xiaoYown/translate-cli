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

const readFileSync = (filePath) => {
  return JSON.parse(fs.readFileSync(filePath, { encoding: 'utf8' }).toString());
}

const defaultConfig = {
  baseUrl: './locales_'
}
const configName = 'xtc.config.json';
const getConfig = async () => {
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
const updateConfig = async (newConfig) => {
  const filePath = path.resolve(configName);
  const exist = await isExist(filePath);
  const config = Object.assign({}, defaultConfig);
  if (exist) {
    // TODO: 异常处理
    const content = readFileSync(filePath);
    Object.assign(config, content, newConfig);
  }
  writeFile(
    filePath,
    config
  )
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
  let filledLength = 0;
  files.forEach(item => {
    filledLength = Object.keys(item.content).filter(key => !!item.content[key])
    result[item.name] = {
      percent: Math.floor(filledLength.length * 100 / keys.length) / 100
    };
  });
  return result;
}

const getLocalesPath = async () => {
  const { baseUrl } = await getConfig();
  return path.resolve(baseUrl);
}

const getFiles = async () => {
  const localesPath = await getLocalesPath();
  const existFolder = await isExist(localesPath);

  if (existFolder) {
    const files = getJsonFiles(localesPath);
    const keys = getAllKeys(files).sort();
    const info = getFilesInfo(files, keys);
  
    return {
      info,
      datasource: formatData(keys, files)
    };
  } else {
    return null;
  }
  
}

const getAllLangs = async () => {
  const localesPath = await getLocalesPath();
  return getJsonFiles(localesPath).map(item => item.name);
}

function writeFile (filePath, content) {
  fs.writeFileSync(
    path.join(filePath),
    JSON.stringify(content, null, 2)
  );
}

const saveFiles = async (datasource) => {
  const langs = await getAllLangs();
  const files = {};
  let lang = null;
  langs.forEach(langName => {
    lang = {};
    datasource.forEach(item => {
      lang[item.name] = item.data[langName];
    });
    files[langName] = lang;
  });
  const localesPath = await getLocalesPath();
  for (let key in files) {
    writeFile(path.join(localesPath, `${key}.json`), files[key]);
  }
}

const addTranslate = async (data) => {
  const localesPath = await getLocalesPath();
  const files = getJsonFiles(localesPath);
  files.forEach(item => {
    writeFile(
      item.path,
      Object.assign(item.content, { [data.key]: data.values[item.name] })
    )
  });
}

const batchRemoveKeys = async (keys) => {
  const localesPath = await getLocalesPath();
  const files = getJsonFiles(localesPath);
  files.forEach(item => {
    keys.forEach(key => {
      delete item.content[key];
    })
    writeFile(item.path, item.content)
  });
}

module.exports = {
  getConfig,
  updateConfig,

  getFiles,
  saveFiles,
  addTranslate,
  
  batchRemoveKeys,
}
