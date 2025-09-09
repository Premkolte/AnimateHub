import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  // Ignore build output
  { ignores: ['dist'] },

  // CLIENT (browser/React) rules
  {
    files: ['client/**/*.{js,jsx}', 'src/**/*.{js,jsx}'], // adjust to your client paths
    languageOptions: {
      ecmaVersion: 'latest',
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: { react: { version: '18.3' } },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      'react/jsx-no-target-blank': 'off',
      'react-refresh/only-export-components': [
  'warn',
  {
    allowConstantExport: true,
    allowLocalVars: false, // enforce cleaner exports
  },
],
    },
  },

  // SERVER (Node) rules
  {
    files: [
      'index.js',
      'server/**/*.{js,mjs,cjs}',
      'backend/**/*.{js,mjs,cjs}',
      'src/**/*.server.{js,mjs,cjs}',
      'src/**/server/**/*.{js,mjs,cjs}',
      'src/app.js',
      'src/utils/**/*.js',
      // add/adjust paths so all backend files are included
    ],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node, // enables process, __dirname (CJS only), etc.
      },
    },
    plugins: {
      // keep it minimal; no react on the server
    },
    rules: {
      ...js.configs.recommended.rules,
      // Optionally disable browser-specific rules here if any leak in
    },
  },
]
