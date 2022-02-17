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

const openFile = (path, mode) => {
  return new Promise(function(resolve, reject) {
    fs.open(path, mode,
      function(err, fd) {
        if (err)
          reject(err);
        else
          resolve(fd);
      }
    );
  });
};

const writeToFile = (fd, text) => {
  return new Promise(function(resolve, reject) {
    fs.appendFile(fd, text, 'utf8',
      function(err, fd) {
        if (err)
          reject(err);
        else
          resolve(null);
      }
    );
  });
};

const closeFile = (fd) => {
  return new Promise(function(resolve, reject) {
    fs.close(fd,
      function(err, fd) {
        if (err)
          reject(err);
        else
          resolve(null);
      }
    );
  });
};

const openStream = (path) => {
  return fs.createWriteStream(path);
};

const writeRcdsToStream = (stream, rcds) => {
  rcds.forEach(rcd => {
    writeToStream(stream, rcd);
  });
};

const writeToStream = (stream, text) => {
  stream.write(text);
};

const closeStream = (stream) => {
  stream.end();
};

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

const copyTextFile = (indir, outdir, filename) => {
  const inPath = `${indir}/${filename}`;
  const outPath = `${outdir}/${filename}`;
  readTextFile(inPath)
  .then((data) => {
    //console.log(`data read from ${inPath}`);
    writeToTextFile(outPath, data)
  })
};

function checkDirExists(path) {
  return new Promise(function(resolve, _reject) {
    fs.stat(
      path,
      function(err, stats) {
        if (err)
          resolve(false);
        resolve(true);
      }
    );
  });
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
  checkDirExists,
  copyTextFile,
  ensurePathExists,
  openFile,
  writeToFile,
  closeFile,
  readTextFile,
  readJsonFile,
  readJsonFiles,
  writeToTextFile,
  writeToJsonFile,
  writeToBinaryFile,
  openStream,
  writeRcdsToStream,
  writeToStream,
  closeStream,
  argvToDict,
  getBaseAxiosConfig
}