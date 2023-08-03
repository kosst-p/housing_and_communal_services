module.exports = {
    root: true,
    env: {
        es2021: true,
        node: true,
        commonjs: true
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    parser: '@typescript-eslint/parser',
    plugins: [
        '@typescript-eslint'
    ],
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module'
    },
    rules: {
        '@typescript-eslint/no-unused-vars': [ 'warn', { argsIgnorePattern: '^_', ignoreRestSiblings: true } ],
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
        'space-in-parens': [ 'error', 'always' ], 'space-infix-ops': 'error',
        'array-bracket-spacing': [ 'error', 'always' ],
        'arrow-body-style': 'error',
        'arrow-parens': 'error',
        'arrow-spacing': 'error',
        'keyword-spacing': 'error',
        'no-trailing-spaces': 'error',
        'no-multi-spaces': 'error',
        'block-spacing': [ 'error', 'always' ],
        'comma-spacing': [ 'error', { before: false, after: true } ],
        'template-curly-spacing': [ 'error', 'always' ],
        'key-spacing': [ 'error', { beforeColon: false, afterColon: true } ],
        'computed-property-spacing': [ 'error', 'always' ],
        'padding-line-between-statements': [
            'error',
            {
                blankLine: 'always',
                prev: '*',
                next: [
                    'block-like',
                    'break',
                    'case',
                    'class',
                    'continue',
                    'iife',
                    'return',
                    'throw',
                ],
            },
            {
                blankLine: 'always',
                prev: [
                    'directive',
                    'import',
                    'export',
                    'const',
                    'let',
                    'block-like',
                ],
                next: '*',
            },
            {
                blankLine: 'always',
                prev: [
                    'expression',
                ],
                next: [
                    'const',
                    'let',
                ],
            },
            {
                blankLine: 'never',
                prev: 'directive',
                next: 'directive',
            },
            {
                blankLine: 'any',
                prev: 'import',
                next: 'import',
            },
            {
                blankLine: 'any',
                prev: 'export',
                next: 'export',
            },
            {
                blankLine: 'any',
                prev: [
                    'const',
                    'let',
                ],
                next: [
                    'const',
                    'let',
                ],
            },
        ],
        'space-unary-ops': [ 'error', { words: true, nonwords: false, overrides: { '!': true } } ],
        'eol-last': 'error',
        'brace-style': [
            'error',
            'stroustrup',
        ],
    },
    ignorePatterns: [ 'node_modules/', 'dist/' ]
};
