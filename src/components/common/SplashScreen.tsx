import React, { useRef, useEffect } from "react";
import { Animated, Dimensions, Image, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Logo from "../../assets/logo.png";
import RootStack from "../../navigation/RootStack";
import { StatusBar } from "expo-status-bar";
const splashBgColor = "#000";

const SplashScreen = () => {
  //SafeArea 값
  const edges = useSafeAreaInsets();

  //애니메이션 값
  const startAnimation = useRef(new Animated.Value(0)).current;

  //로고, 타이틀 크기 조절
  const scaleLogo = useRef(new Animated.Value(1)).current;
  const scaleTitle = useRef(new Animated.Value(1)).current;

  //오프셋 애니메이션
  const moveLogo = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const moveTitle = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const opacityTitle = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    //0.5초 후 애니메이션 시작
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(startAnimation, {
          toValue: -Dimensions.get("window").height + (edges.top + 75),
          useNativeDriver: true,
        }),
        Animated.timing(scaleLogo, {
          //0.35 비율로 줄임
          toValue: 0.35,
          useNativeDriver: true,
        }),
        Animated.timing(scaleTitle, {
          //0.8 비율로 줄임
          toValue: 0.8,
          useNativeDriver: true,
        }),
        Animated.timing(moveLogo, {
          //왼쪽 끝으로 이동
          toValue: {
            x: -(Dimensions.get("window").width / 2) + 100,
            y: Dimensions.get("window").height / 2 - 10,
          },
          useNativeDriver: true,
        }),
        Animated.timing(opacityTitle, {
          //사라짐
          toValue: 0,
          useNativeDriver: true,
        }),
      ]).start();
    }, 500);
  }, []);

  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      }}
    >
      <Animated.View
        style={{
          flex: 1,
          backgroundColor: splashBgColor,
          zIndex: 1,
          transform: [{ translateY: startAnimation }],
        }}
      >
        <Animated.View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Animated.Image
            source={Logo}
            style={{
              width: 380,
              height: 80,
              marginBottom: 20,
              transform: [{ translateY: moveLogo.y }, { scale: scaleLogo }],
            }}
          ></Animated.Image>
          <Animated.Text
            style={{
              fontSize: 25,
              fontWeight: "bold",
              color: "blue",
              opacity: opacityTitle,
            }}
          >
            Tripsketch
          </Animated.Text>
        </Animated.View>
      </Animated.View>
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "white",
          zIndex: 0,
        }}
      >
        <StatusBar style="auto" />
        <RootStack />
      </Animated.View>
    </View>
  );
};

export default SplashScreen;
