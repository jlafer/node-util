# jlafer-node-util

This is my collection of utility functions that I find useful in nearly all NodeJS projects.

## Installation

    npm install --save jlafer-node-util

## Helper Functions

### makeDir(path, mask)

### checkDirExists(path)

### ensurePathExists(parentPath, mask, ...pathNodes)

### copyTextFile(indir, outdir, filename)

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

### executeShellCmd(cmd)
Runs the `cmd` string argument as a command in the NodeJS operating system. The command returns a Promise which resolves to the `stdout` output on success or the `stderr` output on a failure.
