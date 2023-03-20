module.exports = {
	extends: ['turbo', 'prettier'],
	plugins: ['solid', '@typescript-eslint'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 6,
		sourceType: 'module',
	},
}
  