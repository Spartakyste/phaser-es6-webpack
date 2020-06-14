module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    "indent": ["error", 4],
    "max-len" : ["error",  { "code": 170, "ignoreComments": true }],
    "new-cap": ["error", { "properties": false }],
    "class-methods-use-this" : 'off'
  },
};
