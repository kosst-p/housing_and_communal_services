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
        ecmaVersion: 2017,
        babelOptions: {
            presets: ['@babel/preset-react']
        }
    },
        rules: {
        'indent': [ 'error', 4 ],
        'quote-props': [
            'error',
            'consistent-as-needed'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'always'
        ],
        'object-curly-spacing': [ 'error', 'always' ],
        'space-before-blocks': 'error',
        'space-before-function-paren': [
            'error',
            {
                anonymous: 'always',
                named: 'never',
                asyncArrow: 'always'
            }
        ],
        'space-in-parens': [ 'error', 'always' ],'space-infix-ops': 'error',
        'array-bracket-spacing': [ 'error', 'always' ],
        'arrow-body-style': 'error',
        'arrow-parens': 'error',
        'arrow-spacing': 'error',
        'keyword-spacing': 'error',
        'no-trailing-spaces': 'error',
        'no-multi-spaces': 'error',
    },
    ignorePatterns: [ 'node_modules/', 'dist/' ]
}