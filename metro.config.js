const { getDefaultConfig } = require("expo/metro-config");

const defaultConfig = getDefaultConfig(__dirname);

module.exports = {
  resolver: {
    alias: {
      "@components": "./src/components",
      "@screens": "./src/screens",
      "@assets": "./src/assets",
    },
  },
  transformer: {
    babelTransformerPath: require.resolve("react-native-svg-transformer"),
  },
  ...defaultConfig,
};
