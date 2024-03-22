module.exports = {
  root: true,
  env: {
    "browser": true,
    "node": true,
    "es6": true
  },
  'extends': [
    'plugin:react/recommended',
    'eslint:recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  }
}
