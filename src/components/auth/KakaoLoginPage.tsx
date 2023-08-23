import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import { useNavigation } from "@react-navigation/native";
import { axiosBase, tokenRefresh } from "../../services/axios";
import * as SecureStore from "expo-secure-store";
import { getCurrentUser, getUserInfo } from "../../services/user";
import * as Notifications from "expo-notifications";
import jwtDecode, { JwtPayload } from "jwt-decode";

const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage('message from webView')`;

const clientId = "1927d084a86a31e01a814ce0b2fe3459";
const authorizeUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=https://port-0-tripsketch-kvmh2mljz6ccl7.sel4.cloudtype.app/api/oauth/kakao/code&response_type=code`;

/** 카카오 로그인 페이지 컴포넌트 */
const KaKaoLogin = () => {
  const navigation = useNavigation();

  // 로그인 시 Expo 알림 토큰 요청
  useEffect(() => {
    // Expo 알림 토큰 요청하는 함수
    const registerForPushNotificationsAsync = async () => {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== "granted") {
        console.log("알림 권한이 거부되었습니다.");
        return;
      }

      const token = (
        await Notifications.getExpoPushTokenAsync({
          projectId: "f8190d6c-4843-4990-8bbb-f70715ad169f",
        })
      ).data;
      const pushToken = token.slice("ExponentPushToken[".length, -1);
      await SecureStore.setItemAsync("pushToken", pushToken);
      console.log("Expo 알림 토큰:", pushToken);
    };

    registerForPushNotificationsAsync();
  }, []);

  // 카카오 로그인 진행하는 화면
  const KakaoLoginWebView = (url: string) => {
    const exp = "code=";
    const condition = url.indexOf(exp);
    if (condition != -1) {
      const authorize_code = url.substring(condition + exp.length);
      requestToken(authorize_code);
    }
  };

  /** 유저 정보를 SecureStore에 저장하는 함수 */
  const saveUserInfo = async (profileData: any) => {
    try {
      // 유저 정보를 JSON 문자열로 변환
      const userDataJSON = JSON.stringify(profileData);
      await SecureStore.setItemAsync("userProfile", userDataJSON);
      console.log("유저 정보가 SecureStore에 성공적으로 저장되었습니다!");
    } catch (error) {
      console.error("유저 정보 저장 중 발생한 에러는...🤔", error);
    }
  };

  /** 토큰 발급받는 함수 */
  const requestToken = async (authorize_code: string) => {
    try {
      const pushToken = await SecureStore.getItemAsync("pushToken");
      const response = await axiosBase.post(`oauth/kakao/login`, {
        code: authorize_code,
        pushToken: pushToken,
      });

      // 액세스 토큰 저장
      const accessToken = response.data.accessToken;
      await SecureStore.setItemAsync("accessToken", accessToken);
      console.log("액세스 토큰", accessToken);

      // 리프레시 토큰 저장
      const refreshToken = response.data.refreshToken;
      await SecureStore.setItemAsync("refreshToken", refreshToken);

      // 리프레시 토큰 만료 기간 저장
      const refreshTokenExpiryDate = JSON.stringify(
        response.data.refreshTokenExpiryDate
      );
      await SecureStore.setItemAsync(
        "refreshTokenExpiryDate",
        refreshTokenExpiryDate
      );

      console.log("refreshTokenExpiryDate", refreshTokenExpiryDate);
      console.log(
        "리프레시 토큰 만료 시간",
        new Date(Number(refreshTokenExpiryDate))
      );

      const decodedToken: JwtPayload = jwtDecode(accessToken);

      console.log("decodedToken", decodedToken.exp);

      // accessToken의 만료 시간
      const expiryDate = new Date(Number(decodedToken.exp) * 1000);
      console.log(expiryDate);

      // SecureStore에 저장된 accessToken값 가져오기
      const tokenValue = await SecureStore.getItemAsync("accessToken");

      // 유저 정보를 SecureStore에 저장
      const userInfo = await getCurrentUser();
      await saveUserInfo(userInfo);
      const userInfoFromSecureStore = await getUserInfo();

      // 토큰 정상 발급되고, 유저 정보 저장 성공 후 메인 페이지로 이동
      if (tokenValue && userInfoFromSecureStore) {
        (navigation.navigate as (route: string) => void)("Home");
      }
    } catch (error) {
      console.log("로그인 실패와 관련한 에러는...🤔", error);
    }
  };

  return (
    <View style={Styles.container}>
      <WebView
        style={{ flex: 1 }}
        originWhitelist={["*"]}
        scalesPageToFit={false}
        source={{
          uri: authorizeUrl,
        }}
        injectedJavaScript={INJECTED_JAVASCRIPT}
        javaScriptEnabled
        onMessage={(event) => {
          KakaoLoginWebView(event.nativeEvent["url"]);
        }}
      />
    </View>
  );
};

export default KaKaoLogin;

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 24,
    backgroundColor: "#fff",
  },
});
