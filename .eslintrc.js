module.exports = {
    "root": true,
    "env": {
      "node": true
    },
    "extends": [
      "plugin:vue/essential",
      "eslint:recommended"
    ],
    "parserOptions": {
      "parser": "babel-eslint"
    },
    "rules": {
        singlequote: 'off',
        'no-console':'off',
        'no-debugger':'off',
        'no-unused-vars': 'off'
    }
}