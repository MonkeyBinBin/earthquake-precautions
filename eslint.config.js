import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import prettierConfig from 'eslint-config-prettier'

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...tseslint.configs.stylistic,
  prettierConfig,
  {
    rules: {
      // TypeScript 相關規則優化
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      
      // 一般 JavaScript/TypeScript 規則
      'prefer-const': 'error',
      'no-console': 'warn',
      'no-debugger': 'error',
      
      // 程式碼品質規則 (格式化規則由 Prettier 處理)
    },
  },
  {
    // 忽略特定檔案
    ignores: [
      'dist/**',
      'node_modules/**',
      '*.config.js',
      '*.config.ts',
    ],
  }
)