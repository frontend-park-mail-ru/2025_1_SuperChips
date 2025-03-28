import js from '@eslint/js';
import globals from 'globals';
import pluginImport from 'eslint-plugin-import';
import typescript from '@typescript-eslint/eslint-plugin';
import parser from '@typescript-eslint/parser';

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
                typescript: {},
            },
        },
    },
    {
        files: ['**/*.ts'],
        languageOptions: {
            parser: parser,
            parserOptions: {
                project: './tsconfig.json'
            }
        },
        plugins: {
            '@typescript-eslint': typescript
        },
        rules: {
            ...typescript.configs.recommended.rules,
            'no-undef': 'off',
            '@typescript-eslint/no-unused-vars': 'off',
            'no-unused-vars': 'off'
        }
    },
    js.configs.recommended,
    {
        plugins: {
            '@typescript-eslint': typescript,
            import: pluginImport
        },
        rules: {
            indent: ['error', 4],
            eqeqeq: 'error',
            quotes: ['error', 'single'],
            semi: ['error', 'always'],
            'linebreak-style': ['error', 'windows'],
            'no-console': 'warn',
            'no-var': 'error',
            'prefer-const': 'error',
            'import/extensions': ['error', 'ignorePackages', { js: 'never', ts: 'never' }],
            'eol-last': ['error', 'always'],
            'object-curly-spacing': ['error', 'always'],
            '@typescript-eslint/no-unused-vars': 'off',
            'no-unused-vars': 'off'
        },
    },
];
