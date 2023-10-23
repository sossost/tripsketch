import "dotenv/config";

module.exports = () => {
  return {
    ios: {
      supportsTablet: true,
      bundleIdentifier: "kr.kro.tripsketch",
      config: {
        googleMaps: {
          apiKey: process.env.EXPO_PUBLIC_GOOGLE_API_KEY_IOS,
        },
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./src/assets/logoIconBackground.png",
        backgroundColor: "#ffffff",
      },
      package: "kr.kro.tripsketch",
      permissions: ["android.permission.RECORD_AUDIO"],
      config: {
        googleMaps: {
          apiKey: process.env.EXPO_PUBLIC_GOOGLE_API_KEY_ANDROID,
        },
      },
    },
    extra: {
      eas: {
        projectId: "29ddc7fe-a117-470b-8787-7c52553fa0fb",
      },
    },
  };
};
