import React from "react";
import { View, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import { useNavigation } from "@react-navigation/native";
import { axiosBase } from "../../../api/axios";
import * as SecureStore from "expo-secure-store";

const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage('message from webView')`;

const clientId = "1927d084a86a31e01a814ce0b2fe3459";
const authorizeUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=https://port-0-tripsketch-kvmh2mljz6ccl7.sel4.cloudtype.app/api/oauth/kakao/code&response_type=code`;

/** 카카오 로그인 페이지 컴포넌트 */
const KaKaoLogin = () => {
  const navigation = useNavigation();

  // 카카오 로그인 진행하는 화면
  const KakaoLoginWebView = (url: string) => {
    const exp = "code=";
    const condition = url.indexOf(exp);
    if (condition != -1) {
      const authorize_code = url.substring(condition + exp.length);
      console.log("authorize_code", authorize_code);
      requestToken(authorize_code);
    }
  };

  // 토큰 발급받는 부분
  const requestToken = async (authorize_code: string) => {
    try {
      const response = await axiosBase.get(
        `/api/oauth/kakao/login?code=${authorize_code}`
      );

      // 액세스 토큰 저장
      const accessToken = JSON.stringify(response.data.accessToken);
      await SecureStore.setItemAsync("accessToken", accessToken);

      // 리프레시 토큰 저장
      const refreshToken = JSON.stringify(response.data.refreshToken);
      await SecureStore.setItemAsync("refreshToken", refreshToken);

      // 리프레시 토큰 만료 기간 저장
      const refreshTokenExpiryDate = JSON.stringify(
        response.data.refreshTokenExpiryDate
      );
      await SecureStore.setItemAsync(
        "refreshTokenExpiryDate",
        refreshTokenExpiryDate
      );

      // 토큰이 정상 발급 된 경우 메인 페이지로 이동
      const tokenValue = await SecureStore.getItemAsync("accessToken");
      if (tokenValue) {
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
