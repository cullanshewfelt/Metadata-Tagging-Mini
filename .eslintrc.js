module.exports = {
	"env": {
		"browser": true,
		"es6": true,
		"node": true
	},
	// "parser": "babel-eslint",
	// "parserOptions": {
  //       "ecmaVersion": 6,
  //       "sourceType": "module",
  //       "ecmaFeatures": {
  //           "jsx": true,
  //           "modules": true,
  //           "experimentalObjectRestSpread": true
  //       }
  //   },
	"extends": ["eslint:recommended", "plugin:react/recommended"],
	"globals": {
		"Atomics": "readonly",
		"SharedArrayBuffer": "readonly"
	},
	"parserOptions": {
		"ecmaFeatures": {
			"jsx": true
		},
		"ecmaVersion": 2018,
		"sourceType": "module"
	},
	"plugins": [
		"react"
	],
	"rules": {
		"indent": [
			"error",
			2
		],
		"react/prop-types": 0, // turns off react prop-types errors
		"react/no-unescaped-entities": 0, // turns off react/no-unescaped-entities errors
		"linebreak-style": [
			"error",
			"unix"
		],
		"quotes": [
			"error",
			"double"
		],
		"semi": [
			"error",
			"always"
		]
	}
};
