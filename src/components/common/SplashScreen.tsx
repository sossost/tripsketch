import React, {
  useRef,
  useEffect,
  useState,
  ReactNode,
  useContext,
} from "react";
import { Animated, Dimensions, View } from "react-native";

import SplashBack from "./SplashBack";
import KakaoLoginButton from "../auth/KakaoLoginButton";
import CustomButton from "../UI/CustomButton";
import { FadeOutContext } from "../../context/fadeOutContext";
import { useGetCurrentUser } from "../../hooks/useUserQuery";
import { getAccessToken } from "@utils/token";

const splashBgColor = "#fff";

/**
 * @description : 소셜 페이지 컴포넌트
 * @author : 황반석
 * @update : 2023-09-22,
 * @version 1.2.0, 장윤수 : 애니메이션 fade out으로 통일
 * @see None,
 */
const SplashScreen = ({ children }: { children: ReactNode }) => {
  const currentUser = useGetCurrentUser();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { fadeOut, setFadeOut } = useContext(FadeOutContext);
  const [isGone, setIsGone] = useState(false);

  const logoPath = require("../../assets/logo_white.png");

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

  // 로그인 되어있으면 버튼 없이 바로 넘어가기
  useEffect(() => {
    let timer: NodeJS.Timeout;

    timer = setTimeout(async () => {
      if (isLoggedIn) {
        setFadeOut(true);
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [currentUser.data]);

  useEffect(() => {
    const checkLoggedIn = async () => {
      const accessToken = await getAccessToken();
      if (accessToken) {
        setIsLoggedIn(true);
      }
    };
    checkLoggedIn();
  }, []);

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
          toValue: -Dimensions.get("window").height,
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
              }}
            ></Animated.Image>
            <Animated.Text
              style={{
                fontSize: 16,
                color: "white",
                opacity: fadeOut === true ? opacityTitle : 1,
              }}
            >
              당신의 여행을 스케치하세요
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
              <KakaoLoginButton />

              <CustomButton
                onPress={() => setFadeOut(true)}
                buttonText="둘러보기"
                style={{
                  marginVertical: 10,
                }}
                color="white"
              ></CustomButton>
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
