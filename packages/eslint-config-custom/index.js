module.exports = {
  extends: ['turbo'],
  plugins: ['@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
  rules: {
    'turbo/no-undeclared-env-vars': 'off',
  },
}
