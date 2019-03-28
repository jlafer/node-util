# jlafer-node-util

This is my collection of utility functions that I find useful in nearly all NodeJS projects.

## Installation

    npm install --save jlafer-node-util

## Helper Functions

### argvToDict(argv)

Converts the argument, typically filled from process.argv, to a dictionary object.
```
const args = argvToDict(process.argv);
const fileName = args.filename;
```
