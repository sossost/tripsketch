import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import { useNavigation } from "@react-navigation/native";
import { axiosBase, tokenRefresh } from "../../services/axios";
import * as SecureStore from "expo-secure-store";
import { getCurrentUser, getUserInfo } from "../../services/user";
import jwtDecode, { JwtPayload } from "jwt-decode";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../react-query/constants";
import { KAKAO_CLIENT_ID } from "@env";

const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage('message from webView')`;
const clientId = KAKAO_CLIENT_ID!;
const authorizeUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=https://port-0-tripsketch-kvmh2mljz6ccl7.sel4.cloudtype.app/api/oauth/kakao/callback&response_type=code`;

/** 카카오 로그인 페이지 컴포넌트 */
const KaKaoLogin = () => {
  const navigation = useNavigation();
  const queryClient = useQueryClient();

  // 카카오 로그인 진행하는 화면
  const KakaoLoginWebView = (url: string) => {
    requestToken(url);
  };

  /** 토큰 발급받는 함수 */
  const requestToken = async (url: string) => {
    try {
      const response = await axios.get(
        `https://kauth.kakao.com/oauth/authorize?client_id=1927d084a86a31e01a814ce0b2fe3459&redirect_uri=https://port-0-tripsketch-kvmh2mljz6ccl7.sel4.cloudtype.app/api/oauth/kakao/callback&response_type=code`
      );

      // 액세스 토큰 저장
      const accessToken = response.headers.accesstoken;
      await SecureStore.setItemAsync("accessToken", accessToken);
      console.log("액세스 토큰", accessToken);

      // 리프레시 토큰 저장
      const refreshToken = response.headers.refreshtoken;
      await SecureStore.setItemAsync("refreshToken", refreshToken);
      console.log("리프레시 토큰", refreshToken);

      // 리프레시 토큰 만료 기간 저장
      const refreshTokenExpiryDate = JSON.stringify(
        response.headers.refreshtokenexpirydate
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
      queryClient.setQueryData([queryKeys.currentUser], userInfo);
      const userInfoFromSecureStore = await getUserInfo();

      // 토큰 정상 발급되고, 유저 정보 저장 성공 후 메인 페이지로 이동
      if (tokenValue && userInfoFromSecureStore) {
        (navigation.navigate as (route: string) => void)("Home");
      }
    } catch (error) {
      console.log(error);
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
