module.exports = {
  'env': {
    'node': true,
    'es6': true,
    'browser': true,
  },
  'globals': {
    'process': true,
  },
  'extends': [
    'eslint:recommended',
  ],
  'overrides': [
    {
      'files': [
        './views/404/**.js',
        './views/app/**.js',
        './views/components/**.js',
        './views/home/**.js',
        './views/login/**.js',
        './views/signup/**.js',
      ],
      'parserOptions': {
        'sourceType': 'module'
      }
    }
  ],
  'parserOptions': {
    'ecmaVersion': 2020,
  },
  'rules': {
    'indent': [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'windows'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'always'
    ],
    'eqeqeq': 'error',
    'no-trailing-spaces': 'error',
    'object-curly-spacing': [
      'error', 'always'
    ],
    'arrow-spacing': [
      'error', { 'before': true, 'after': true }
    ],
    'no-console': 0,
  },
};