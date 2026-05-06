import js from '@eslint/js';
import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';
import prettierPlugin from 'eslint-plugin-prettier';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import globals from 'globals';

export default [
    // Grunnleggende JS-regler
    js.configs.recommended,

    // TypeScript-regler for .ts og .tsx
    {
        files: ['**/*.ts', '**/*.tsx'],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                ecmaVersion: 2020,
                sourceType: 'module',
                ecmaFeatures: { jsx: true },
            },
            globals: { ...globals.node },
        },
        plugins: {
            '@typescript-eslint': typescriptEslintPlugin,
            import: importPlugin,
            prettier: prettierPlugin,
            'react-hooks': reactHooksPlugin,
            'jsx-a11y': jsxA11yPlugin,
        },
        rules: {
            // TypeScript-spesifikke regler
            '@typescript-eslint/ban-ts-ignore': 'off',
            '@typescript-eslint/ban-ts-comment': 'off',
            '@typescript-eslint/interface-name-prefix': 'off',
            '@typescript-eslint/no-var-requires': 'warn',
            '@typescript-eslint/no-unused-vars': 'off',
            '@typescript-eslint/explicit-function-return-type': 'off',

            'no-unused-vars': 'off',
            'no-undef': 'off',

            // Import-regler
            'import/extensions': [
                'off',
                'ignorePackages',
                { js: 'never', jsx: 'never', ts: 'never', tsx: 'never' },
            ],
            'import/export': 'warn',
            // 'import/order': [
            //     'warn',
            //     {
            //         alphabetize: { order: 'asc', caseInsensitive: true },
            //         'newlines-between': 'always',
            //         groups: [['builtin', 'external'], 'internal', ['parent', 'sibling'], 'index'],
            //         pathGroups: [
            //             { pattern: 'react', group: 'external', position: 'before' },
            //             { pattern: '@navikt/**', group: 'internal', position: 'before' },
            //         ],
            //         pathGroupsExcludedImportTypes: ['builtin'],
            //     },
            // ],

            // Prettier
            'prettier/prettier': 'warn',

            // React Hooks
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',

            // JSX a11y
            ...jsxA11yPlugin.configs.recommended.rules,
            'jsx-a11y/interactive-supports-focus': 'off',
            'jsx-a11y/click-events-have-key-events': 'off',

            // Diverse
            'no-console': 'warn',
        },
        settings: {
            react: { version: 'detect' },
        },
    },

    // JS/JSX-filer
    {
        files: ['**/*.js', '**/*.jsx'],
        languageOptions: {
            ecmaVersion: 2020,
            sourceType: 'module',
            ecmaFeatures: { jsx: true },
            globals: { ...globals.node },
        },
        plugins: {
            import: importPlugin,
            prettier: prettierPlugin,
            'react-hooks': reactHooksPlugin,
            'jsx-a11y': jsxA11yPlugin,
        },
        rules: {
            'prettier/prettier': 'warn',
            'no-console': 'warn',
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',
            ...jsxA11yPlugin.configs.recommended.rules,
            'jsx-a11y/interactive-supports-focus': 'off',
            'jsx-a11y/click-events-have-key-events': 'off',
        },
        settings: {
            react: { version: 'detect' },
        },
    },
];
