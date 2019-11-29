module.exports = {
	// Automatically clear mock calls and instances between every test
	clearMocks: true,
	verbose: true,
	testEnvironment: 'jsdom',
	setupFiles: ['<rootDir>/src/tests/config.js'],
	testURL: 'http://localhost/',
	coverageThreshold: {
		global: {
			branches: 60,
			functions: 60,
			lines: 60,
			statements: 60
		}
	},
	transform: {
		'^.+\\.(js|jsx)$': 'babel-jest'
	},
	moduleNameMapper: {
		'\\.(css|scss)$': '<rootDir>/__mocks__/styleMock.js',
		'\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
			'<rootDir>/__mocks__/fileMock.js'
	}
};
