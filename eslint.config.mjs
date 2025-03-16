import js from '@eslint/js';
import globals from 'globals';
import pluginImport from 'eslint-plugin-import';

/** @type {import('eslint').Linter.Config[]} */
export default [
    {
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'module',
            globals: {
                ...globals.browser,
                ...globals.node,
                ...globals.jest
            },
        },
        plugins: {
            import: pluginImport, // Подключаем плагин import
        },
        settings: {
            'import/resolver': {
                node: {
                    extensions: ['.js'],
                },
            },
        },
    },
    js.configs.recommended,
    {
        rules: {
            indent: ['error', 4],
            eqeqeq: 'error',
            quotes: ['error', 'single'],
            semi: ['error', 'always'],
            'linebreak-style': ['error', 'windows'],
            'no-console': 'warn',
            'no-var': 'error',
            'prefer-const': 'error',
            'no-unused-vars': ['warn', { args: 'none' }],
            'import/extensions': ['error', 'ignorePackages', { js: 'never' }],
            'eol-last': ['error', 'always'],
            'object-curly-spacing': ['error', 'always'],
        },
    },
];
