module.exports = {
  extends: [
    'turbo',
    'eslint:recommended',
    'plugin:solid/typescript',
    'plugin:tailwindcss/recommended',
  ],
  plugins: ['solid', '@typescript-eslint', 'tailwindcss'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
  rules: {
    'turbo/no-undeclared-env-vars': 'off',
    'tailwindcss/no-custom-classname': 'off',
  },
}
