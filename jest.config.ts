export default {
  
  clearMocks: true,
  preset: "ts-jest",
  moduleFileExtensions : [
    "ts",
    "tsx",
    "js"
  ],
  moduleNameMapper:{
    '^(.*)\\.js$': '$1',
  },
  transform: {
    "\\.(ts|tsx)$": "ts-jest",
    '^.+\\.jsx?$': 'babel-jest',
  },
  testRegex: "/__tests__/.*\\.test.(ts|tsx|js)$"
};
