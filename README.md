# jlafer-node-util

This is my collection of utility functions that I find useful in nearly all NodeJS projects.

## Installation

    npm install --save jlafer-node-util

## Helper Functions

### makeDir(path, mask)

### ensurePathExists(parentPath, mask, ...pathNodes)

### openFile(path, mode)

### writeToFile = (fd, text)

### closeFile = (fd)

### openStream = (path)

### writeRcdsToStream = (stream, rcds)

### writeToStream = (stream, text)

### closeStream = (stream)

### readTextFile(path)

### readJsonFile(path)

### readJsonFiles(dir, filenames)

### writeToTextFile(path, str)

### writeToBinaryFile(path, data)

### writeToJsonFile(path, value)

### argvToDict(argv)
Converts the argument, typically filled from process.argv, to a dictionary object.
```
const args = argvToDict(process.argv);
const fileName = args.filename;
```


### getBaseAxiosConfig(baseURL, username, password)
Returns a base Axios configuration that uses Basic authentication.
```
const baseConfig = getBaseAxiosConfig(
  'https://flex-api.twilio.com/v1/', 'joe', 'blow'
);
return axios({...baseConfig, url: `FlexFlows`});
```