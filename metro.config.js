const { getDefaultConfig } = require("expo/metro-config");

const defaultConfig = getDefaultConfig(__dirname);

module.exports = {
  resolver: {
    alias: {
      "@components": "./src/components",
      "@screens": "./src/screens",
      "@assets": "./src/assets",
      "@utils": "./src/utils",
      "@constants": "./src/constants",
      "@hooks": "./src/hooks",
      "@react-query": "./src/react-query",
      "@navigation": "./src/navigation",
      "@services": "./src/services",
      "@types": "./src/types",
      "@context": "./src/context",
    },
  },
  transformer: {
    babelTransformerPath: require.resolve("react-native-svg-transformer"),
  },
  ...defaultConfig,
};
