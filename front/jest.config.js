module.exports = {
  testEnvironment: "jsdom",
  transform: {
    ".+\\.(css|styl|less|sass|scss)$": "jest-css-modules-transform",
    "\\.js$": ["babel-jest", { presets: ["next/babel"] }],
  },
  testMatch: ["**/*.test.[jt]s?(x)"],
  setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
};
