module.exports = () => ({
  files: ['{fp,index,combine}.js'],
  tests: ['{fp,index}.test.js'],
  env: { runner: 'node', type: 'node' },
  testFramework: 'jest',
});
