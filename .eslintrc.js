module.exports = {
	root: true,
	env: {
		node: true,
	},
	extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/airbnb'],
	parserOptions: {
		parser: 'babel-eslint',
	},
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'linebreak-style': ['error', 'windows'],
		indent: [1, 'tab'],
		indent: 'off',
		'no-tabs': 0,
		'no-return-assign': 0,
		'arrow-parens': 0,
	},
	overrides: [
		{
			files: [
				'**/__tests__/*.{j,t}s?(x)',
				'**/tests/unit/**/*.spec.{j,t}s?(x)',
			],
			env: {
				jest: true,
			},
		},
	],
};
