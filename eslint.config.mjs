<<<<<<< HEAD
import { ESLint } from 'eslint';

export default [
  { parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'prettier'
    ] }
];
=======
import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended
)
>>>>>>> e0dd8f52b7381c00f776401dbced922e8ba8a3c7
