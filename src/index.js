const {fromPairs} = require('ramda');

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

module.exports = {
  argvToDict
}