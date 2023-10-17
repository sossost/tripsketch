import { View, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import { useNavigation } from "@react-navigation/native";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "@react-query/queryKey";
import { getCurrentUser, kakaoLogin } from "@services/user";
import { LINK } from "@constants/link";
import { errorLoging } from "@utils/errorHandler";
import { setAccessToken, setRefreshToken } from "@utils/token";
import { StackNavigation } from "@types/RootStack";

const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage('message from webView')`;

/**
 * @description : 카카오 OAuth 로그인 페이지 컴포넌트
 * @author : 이수현
 * @update : 2023-09-12,
 * @version 1.0.3, 장윤수 : 로그아웃 후 로그인 안되는 로직 해결
 * @see None,
 */

const KaKaoLogin = () => {
  const navigation = useNavigation<StackNavigation>();
  const queryClient = useQueryClient();

  /** 토큰 발급받는 함수 */
  const requestToken = async () => {
    try {
      const response = await kakaoLogin();

      // 액세스 토큰 저장
      const accessToken: string = response.headers.accesstoken;

      if (!accessToken) return;

      await setAccessToken(accessToken);

      // 리프레시 토큰 저장
      const refreshToken: string = response.headers.refreshtoken;
      await setRefreshToken(refreshToken);
    } catch (error: unknown) {
      errorLoging(error, "토큰 발급 요청 실패 에러는");
    }
  };

  // 카카오 로그인 진행하는 화면
  const KakaoLoginWebView = async () => {
    // 토큰 발급 요청
    await requestToken();

    // 현재 로그인한 유저 정보 요청 후 쿼리에 저장
    const userInfo = await getCurrentUser();
    queryClient.setQueryData([QUERY_KEY.CURRENT_USER], userInfo);

    // 메인 화면으로 이동
    if (userInfo) {
      navigation.navigate(LINK.MAIN);
    }
  };

  return (
    <View style={Styles.container}>
      <WebView
        style={{ flex: 1 }}
        originWhitelist={["*"]}
        scalesPageToFit={false}
        source={{
          uri: `https://kauth.kakao.com/oauth/authorize?client_id=1927d084a86a31e01a814ce0b2fe3459&redirect_uri=https://port-0-tripsketch-kvmh2mljz6ccl7.sel4.cloudtype.app/api/oauth/kakao/callback&response_type=code`,
        }}
        injectedJavaScript={INJECTED_JAVASCRIPT}
        javaScriptEnabled
        onMessage={KakaoLoginWebView}
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
