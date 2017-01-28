module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true
  },
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  rules: {
    'no-const-assign': 'warn',
    'no-this-before-super': 'warn',
    'no-undef': 'warn',
    'no-global-assign': 'error',
    'no-unreachable': 'warn',
    'no-unused-vars': ['warn', { 'vars': 'all', 'args': 'none' }],
    'constructor-super': 'warn',
    'valid-typeof': 'warn',
    'no-fallthrough': 'warn',
    'no-redeclare': 'warn',
    'no-cond-assign': 'warn',
    'no-dupe-keys': 'warn',
    'no-duplicate-case': 'warn',
    'use-isnan': 'warn',
    'semi': 'warn',
    'no-mixed-spaces-and-tabs': 'warn',
    'no-trailing-spaces': 'warn',
    'no-multi-spaces': 'warn',
    'indent': ['warn', 'tab'],
    'brace-style': ['warn', 'stroustrup'],
		'comma-spacing': 'warn',    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
