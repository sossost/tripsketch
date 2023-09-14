import React from "react";
import { View, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import { useNavigation } from "@react-navigation/native";
import { getCurrentUser } from "../../services/user";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "../../react-query/queryKey";
import { KAKAO_CLIENT_ID } from "@env";
import { setDataToSecureStore } from "../../utils/secureStore";
import { STORE_KEY } from "../../constants/store";
import { errorLoging } from "../../utils/errorHandler";
import { StackNavigation } from "../../types/RootStack";
import { LINK } from "../../constants/link";

import ErrorBoundary from "react-native-error-boundary";
import ErrorFallback from "../UI/ErrorFallback";

const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage('message from webView')`;
const OAUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=https://port-0-tripsketch-kvmh2mljz6ccl7.sel4.cloudtype.app/api/oauth/kakao/callback&response_type=code`;

/**
 * @description : 카카오 OAuth 로그인 페이지 컴포넌트
 * @author : 이수현
 * @update : 2023-09-12,
 * @version 1.0.2, 장윤수 : 비동기 처리 누락 수정
 * @see None,
 */

const KaKaoLogin = () => {
  const navigation = useNavigation<StackNavigation>();
  const queryClient = useQueryClient();

  /** 토큰 발급받는 함수 */
  const requestToken = async (url: string) => {
    try {
      const response = await axios.get(url);

      // 액세스 토큰 저장
      const accessToken: string = response.headers.accesstoken;
      await setDataToSecureStore<string>(STORE_KEY.ACCESS_TOKEN, accessToken);

      // 리프레시 토큰 저장
      const refreshToken: string = response.headers.refreshtoken;
      await setDataToSecureStore<string>(STORE_KEY.REFRESH_TOKEN, refreshToken);

      // 리프레시 토큰 만료 기간 저장
      const refreshTokenExpiryDate = response.headers.refreshtokenexpirydate;
      await setDataToSecureStore(
        STORE_KEY.REFRESH_TOKEN_EXPIRED_DATE,
        refreshTokenExpiryDate
      );
    } catch (error: unknown) {
      errorLoging(error, "토큰 발급 요청 실패 에러는");
    }
  };

  // 카카오 로그인 진행하는 화면
  const KakaoLoginWebView = async (url: string) => {
    // OAuth url에서 토근 발급 받은 후 스토어에 저장
    await requestToken(OAUTH_URL);

    // 현재 로그인한 유저 정보 요청 후 쿼리에 저장
    const userInfo = await getCurrentUser();
    queryClient.setQueryData([QUERY_KEY.CURRENT_USER], userInfo);

    // 홈 화면으로 이동
    navigation.push(LINK.HOME);
  };

  return (
    <View style={Styles.container}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <WebView
          style={{ flex: 1 }}
          originWhitelist={["*"]}
          scalesPageToFit={false}
          source={{
            uri: OAUTH_URL,
          }}
          injectedJavaScript={INJECTED_JAVASCRIPT}
          javaScriptEnabled
          onMessage={(event) => {
            KakaoLoginWebView(event.nativeEvent["url"]);
          }}
        />
      </ErrorBoundary>
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
