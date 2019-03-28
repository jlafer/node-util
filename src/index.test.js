const {argvToDict} = require('./index');

// create all test data
const nodejs = 'nodejs';
const script = 'my-script';
const emptyArgv = [
  nodejs,
  script
];
const positionalOnlyArgv = [
  ...emptyArgv,
  'arg1',
  'arg2'
];
const namedOnlyArgv = [
  ...emptyArgv,
  'key1=val1',
  'key2=val2'
];
const mixedArgv = [
  ...emptyArgv,
  'arg1',
  'arg2',
  'key1=val1',
  'key2=val2'
];
const scriptMap = {
  script: script
};
const positionalOnlyMap = {
  ...scriptMap,
  '1': 'arg1',
  '2': 'arg2'
};
const namedOnlyMap = {
  ...scriptMap,
  key1: 'val1',
  key2: 'val2'
};
const mixedMap = {
  ...scriptMap,
  '1': 'arg1',
  '2': 'arg2',
  key1: 'val1',
  key2: 'val2'
};

// argvToDict tests
test("argvToDict with no args returns only script", () => {
  expect(argvToDict(emptyArgv)).toEqual(scriptMap);
});
test("argvToDict with positional args returns positional map", () => {
  expect(argvToDict(positionalOnlyArgv)).toEqual(positionalOnlyMap);
});
test("argvToDict with named args returns named map", () => {
  expect(argvToDict(namedOnlyArgv)).toEqual(namedOnlyMap);
});
test("argvToDict with mixed args returns mixed map", () => {
  expect(argvToDict(mixedArgv)).toEqual(mixedMap);
});
