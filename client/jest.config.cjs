module.exports = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|svg|css|scss)$": "jest-transform-stub",
  },
  transformIgnorePatterns: ["/node_modules/"],
  testEnvironment: "jsdom",
};
