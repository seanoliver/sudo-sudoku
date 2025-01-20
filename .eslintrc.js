module.exports = {
parser: '@typescript-eslint/parser',
plugins: ['@typescript-eslint'],
extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
],
env: {
    node: true,
    es2022: true,
},
parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
},
rules: {
    quotes: ['error', 'single'],
    'max-len': ['error', { code: 80 }],
    semi: ['error', 'never'],
    '@typescript-eslint/semi': ['error', 'never'],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'error',
},
}

