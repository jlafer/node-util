const {fromPairs} = require('ramda');
const fs = require('fs');

function makeDir(path, mask) {
  return new Promise(function(resolve, reject) {
    fs.mkdir(path, mask, function(err) {
        if (err)
          if (err.code == 'EEXIST')
            resolve(null);
          else
            reject(err);
        else
          resolve(path);
    });
  });
}

async function ensurePathExists(parentPath, mask, ...pathNodes) {
  let path = parentPath;
  for (let node of pathNodes) {
    path += ('/' + node);
    await makeDir(path, mask);
  }
  return path;
}

function readTextFile(path) {
  return new Promise(function(resolve, reject) {
    fs.readFile(path, 'utf8',
      function(err, text) {
        if (err) reject(err);
        resolve(text);
      }
    );
  });
}

function readJsonFile(path) {
  return readTextFile(path)
  .then(function(text) {
    return new Promise(function(resolve, reject) {
      let data;
      try {
        data = JSON.parse(text);
      }
      catch (err) {
        reject(err);
      }
      resolve(data);
    });
  })
}

function readJsonFiles(dir, filenames) {
  return Promise.all(filenames.map(filename => readJsonFile(dir + filename)));
}

/*
  writeToTextFile assumes that directories in path already exist.
  If not, first call ensurePathExists().
*/
function writeToTextFile(path, str) {
  return new Promise(function(resolve, reject) {
    fs.writeFile(path, str,
      function(err) {
        if (err) reject(err);
        resolve(null);
      }
    );
  });
}

const writeToBinaryFile = writeToTextFile;

function writeToJsonFile(path, value) {
  const str = JSON.stringify(value, null, 2);
  return writeToTextFile(path, str);
}

const argToKVPairs = (arg, idx) => {
  const re = /([^=]+)[=](.+)/;
  const found = arg.match(re);
  return found ? [found[1], found[2]] : [`${idx+1}`, arg];
};

const argvToDict = (argv) => {
  const [_nodejs, script, ...rest] = argv;
  const pairs = rest.map(argToKVPairs);
  const args = fromPairs(pairs);
  return {...args, script};
}

const getBaseAxiosConfig = (baseURL, username, password) => ({
  baseURL,
  auth: {username, password}
});

module.exports = {
  ensurePathExists,
  readTextFile,
  readJsonFile,
  readJsonFiles,
  writeToTextFile,
  writeToJsonFile,
  writeToBinaryFile,
  argvToDict,
  getBaseAxiosConfig
}