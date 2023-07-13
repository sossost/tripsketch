import React, { useRef, useEffect, useState } from "react";
import { Animated, Button, Dimensions, Image, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import RootStack from "../../navigation/RootStack";
import { StatusBar } from "expo-status-bar";
import SplashBack, { splashBackProps } from "./SplashBack";
const splashBgColor = "#fff";

const SplashScreen = ({ children }) => {
  const [fadeOut, setFadeOut] = useState(false);
  const [isGone, setIsGone] = useState(false);

  const logoPath = require("../../assets/logo_white.png");
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
  const opacityContent = useRef(new Animated.Value(0)).current;
  const startDisappear = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(opacityContent, {
          toValue: 1,
          useNativeDriver: true,
          duration: 500,
        }),
      ]).start();
    }, 2500);
    if (fadeOut) {
      setTimeout(() => {
        setIsGone(true);
      }, 1500);
      setTimeout(() => {
        Animated.timing(startDisappear, {
          toValue: 0,
          useNativeDriver: true,
          duration: 500,
        }).start();
      }, 1000);
      //0.5초 후 애니메이션 시작
      Animated.parallel([
        Animated.timing(startAnimation, {
          toValue: -Dimensions.get("window").height + (edges.top + 64),
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
            x: -Dimensions.get("window").width + 100,
            y: Dimensions.get("window").height - 100,
          },
          useNativeDriver: true,
        }),
        Animated.timing(opacityTitle, {
          //사라짐
          toValue: 0,
          useNativeDriver: true,
        }),
        Animated.timing(opacityContent, {
          toValue: 0,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [fadeOut]);

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
      {isGone ? (
        <></>
      ) : (
        <Animated.View
          style={{
            flex: 1,
            backgroundColor: splashBgColor,
            zIndex: 5,
            transform: fadeOut === true ? [{ translateY: startAnimation }] : [],
            opacity: fadeOut === true ? startDisappear : 1,
            overflow: "hidden",
          }}
        >
          <Animated.View
            style={{
              flex: 1,
              alignItems: "center",
              zIndex: 2,
              top: "20%",
              justifyContent: "flex-start",
            }}
          >
            <Animated.Image
              source={logoPath}
              style={{
                width: 250,
                height: 54,
                marginBottom: 20,
                transform:
                  fadeOut === true
                    ? [
                        { translateY: moveLogo.y },
                        //{ scale: scaleLogo }
                      ]
                    : [],
              }}
            ></Animated.Image>
            <Animated.Text
              style={{
                fontSize: 15,
                color: "white",
                opacity: fadeOut === true ? opacityTitle : 1,
                transform: fadeOut === true ? [{ translateY: moveLogo.y }] : [],
              }}
            >
              당신의 여행을 스케치하세요.
            </Animated.Text>
          </Animated.View>
          <SplashBack willFadeOut={fadeOut === true ? true : false} />
          {fadeOut ? (
            <></>
          ) : (
            // 로그인 및 둘러보기 관련 내용 넣을 공간
            <Animated.View
              style={{
                position: "absolute",
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                marginVertical: 150,
                margin: 20,
                height: "70%",
                borderRadius: 30,
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                //backgroundColor: "white",
                opacity: opacityContent,
                zIndex: 3,
              }}
            >
              <Text>여기에 암거나 넣어주세요 ㅎㅎㅎㅎ</Text>
              <Button
                title="둘러보기"
                onPress={() => setFadeOut(true)}
              ></Button>
            </Animated.View>
          )}
        </Animated.View>
      )}

      <View
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
        {children}
      </View>
    </View>
  );
};

export default SplashScreen;
