module.exports = {
    'env': {
        'browser': true,
        'es2022': true,
        'node': true,
        'jest': true
    },
    'parser': 'espree',
    'parserOptions': {
        'ecmaVersion': 2022,
        'sourceType': 'module'
    },
    'plugins': [
        'import'
    ],
    'extends': [
        'eslint:recommended'
    ],
    'rules': {
        'indent': ['error', 4],
        'linebreak-style': ['error', 'unix'],
        'quotes': ['error', 'single'],
        'semi': ['error', 'always'],
        'no-console': 'warn',
        'no-var': 'error',
        'prefer-const': 'error',
        'eqeqeq': 'error',
        'no-unused-vars': ['warn', { 'args': 'none' }],
        'import/extensions': ['error', 'ignorePackages', {
            'js': 'never'
        }]
    },
    'settings': {
        'import/resolver': {
            'node': {
                'extensions': ['.js']
            }
        }
    }
};
