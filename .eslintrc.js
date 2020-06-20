module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    "react/state-in-constructor": "off",
    "no-console": "off",
    "jsx-a11y/label-has-associated-control": [
      "error",
      {        
        "assert": "either",       
      }
    ],
  },
  parser: "babel-eslint"
};
