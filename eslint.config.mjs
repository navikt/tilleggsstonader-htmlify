import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import _import from 'eslint-plugin-import';
import prettier from 'eslint-plugin-prettier';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all,
});

export default [
    ...fixupConfigRules(
        compat.extends(
            'eslint:recommended',
            'plugin:jsx-a11y/recommended',
            'plugin:@typescript-eslint/recommended',
            'plugin:prettier/recommended',
            'plugin:import/typescript'
        )
    ),
    {
        plugins: {
            '@typescript-eslint': fixupPluginRules(typescriptEslint),
            prettier: fixupPluginRules(prettier),
            'react-hooks': fixupPluginRules(reactHooks),
            import: fixupPluginRules(_import),
        },

        languageOptions: {
            globals: {
                ...globals.node,
            },

            parser: tsParser,
            ecmaVersion: 2020,
            sourceType: 'module',

            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },

        settings: {
            react: {
                version: 'detect',
            },
        },

        rules: {
            'import/extensions': [
                'off',
                'ignorePackages',
                {
                    js: 'never',
                    jsx: 'never',
                    ts: 'never',
                    tsx: 'never',
                },
            ],

            '@typescript-eslint/ban-ts-ignore': 'off',
            '@typescript-eslint/ban-ts-comment': 'off',
            'prettier/prettier': 'warn',
            '@typescript-eslint/interface-name-prefix': 'off',
            '@typescript-eslint/no-var-requires': 'warn',
            '@typescript-eslint/no-unused-vars': 'warn',
            '@typescript-eslint/explicit-function-return-type': 'off',
            'jsx-a11y/interactive-supports-focus': 'off',
            'jsx-a11y/click-events-have-key-events': 'off',
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',
            'no-console': 'warn',
            'import/export': 'warn',

            'import/order': [
                'warn',
                {
                    alphabetize: {
                        order: 'asc',
                        caseInsensitive: true,
                    },

                    'newlines-between': 'always',
                    groups: [['builtin', 'external'], 'internal', ['parent', 'sibling'], 'index'],

                    pathGroups: [
                        {
                            pattern: 'react',
                            group: 'external',
                            position: 'before',
                        },
                        {
                            pattern: '@navikt/**',
                            group: 'internal',
                            position: 'before',
                        },
                    ],

                    pathGroupsExcludedImportTypes: ['builtin'],
                },
            ],
        },
    },
];
