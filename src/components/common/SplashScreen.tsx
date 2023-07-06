import React from "react";
import { Animated, Image, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Logo from "../../assets/images/bg_plane.PNG";
const splashBgColor = "#fff";

const SplashScreen = () => {
  const edge = useSafeAreaInsets();
  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: splashBgColor,
      }}
    >
      <Animated.View>
        <Image source={Logo}></Image>
      </Animated.View>
    </View>
  );
};

export default SplashScreen;
