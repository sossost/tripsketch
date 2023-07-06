import React, { useRef, useEffect } from "react";
import { Animated, Dimensions, Image, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export interface splashBackProps {
  willFadeOut: boolean;
}

const SplashBack: React.FC<splashBackProps> = ({ willFadeOut }) => {
  const cloud1Path = require("../../assets/images/cloud1.png");
  const cloud2Path = require("../../assets/images/cloud2.png");
  const cloud3Path = require("../../assets/images/cloud3.png");
  const cloud4Path = require("../../assets/images/cloud4.png");
  const personPath = require("../../assets/images/splash_person.png");
  const planePath = require("../../assets/images/splash_plane.png");

  //SafeArea 값
  const edges = useSafeAreaInsets();

  //애니메이션 값
  const startAnimation = useRef(new Animated.Value(0)).current;

  //오프셋 애니메이션
  const bgOpacity = useRef(new Animated.Value(0)).current;
  const moveCloud1 = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const moveCloud2 = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const moveCloud3 = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const moveCloud4 = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const movePlane = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(bgOpacity, {
        toValue: 1,
        useNativeDriver: true,
        duration: 2500,
      }),
    ]).start();

    if (willFadeOut === true) {
      Animated.parallel([
        Animated.timing(bgOpacity, {
          toValue: 0,
          useNativeDriver: true,
          duration: 1000,
        }),
      ]).start();
    }
    //0.5초 후 애니메이션 시작
    Animated.parallel([
      Animated.timing(startAnimation, {
        toValue: -Dimensions.get("window").height + (edges.top + 75),
        useNativeDriver: true,
      }),
      Animated.timing(moveCloud1, {
        //왼쪽 끝으로 이동
        toValue: {
          x: willFadeOut === true ? -200 : -500,
          y: 10,
        },
        useNativeDriver: true,
        duration: willFadeOut === true ? 3000 : 60000,
      }),
      Animated.timing(moveCloud2, {
        toValue: {
          x: willFadeOut === true ? 200 : 500,
          y: 10,
        },
        useNativeDriver: true,
        duration: willFadeOut === true ? 3000 : 60000,
      }),
      Animated.timing(moveCloud3, {
        toValue: {
          x: willFadeOut === true ? -400 : -800,
          y: 10,
        },
        useNativeDriver: true,
        duration: willFadeOut === true ? 3000 : 60000,
      }),
      Animated.timing(moveCloud4, {
        toValue: {
          x: willFadeOut === true ? 400 : 800,
          y: 10,
        },
        useNativeDriver: true,
        duration: willFadeOut === true ? 3000 : 60000,
      }),
      Animated.timing(movePlane, {
        toValue: {
          x: willFadeOut === true ? -200 : -500,
          y: willFadeOut === true ? -100 : -200,
        },
        useNativeDriver: true,
        duration: willFadeOut === true ? 6000 : 60000,
      }),
    ]).start();
  }, [willFadeOut]);

  return (
    <Animated.View
      style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        flex: 1,
        backgroundColor: "#287FE8",
        zIndex: 0,
        opacity: bgOpacity,
      }}
    >
      <Animated.View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <Animated.Image
          source={cloud1Path}
          style={{
            position: "absolute",
            width: 2000,
            height: 800,
            transform: [{ translateX: moveCloud1.x }],
          }}
        ></Animated.Image>
        <Animated.Image
          source={cloud2Path}
          style={{
            position: "absolute",
            width: 2000,
            height: 800,
            transform: [{ translateX: moveCloud2.x }],
          }}
        ></Animated.Image>
        <Animated.Image
          source={cloud3Path}
          style={{
            position: "absolute",
            width: 2500,
            height: 800,
            transform: [{ translateX: moveCloud3.x }],
          }}
        ></Animated.Image>
        <Animated.Image
          source={cloud4Path}
          style={{
            position: "absolute",
            width: 2000,
            height: 800,
            transform: [{ translateX: moveCloud4.x }],
          }}
        ></Animated.Image>
        <Animated.Image
          source={personPath}
          style={{
            position: "absolute",
            left: 10,
            width: 300,
            height: 400,
          }}
        ></Animated.Image>
        <Animated.Image
          source={planePath}
          style={{
            position: "absolute",
            right: 50,
            top: "40%",
            width: 100,
            height: 80,
            transform: [
              { translateX: movePlane.x },
              { translateY: movePlane.y },
            ],
          }}
        ></Animated.Image>
      </Animated.View>
    </Animated.View>
  );
};

export default SplashBack;
