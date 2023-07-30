module.exports = {
    env: {
        es2021: true,
        browser: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
    ],
    parser: '@babel/eslint-parser',
    settings: {
        react: {
            version: 'detect'
        },
    },
    parserOptions: {
        sourceType: 'module',
        ecmaVersion: 'latest',
        requireConfigFile: false,
        babelOptions: {
            presets: ['@babel/preset-react']
        }
    },
    rules: {},
}