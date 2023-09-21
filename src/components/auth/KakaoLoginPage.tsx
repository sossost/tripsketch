import { View, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import { useNavigation } from "@react-navigation/native";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "@react-query/queryKey";
import { STORE_KEY } from "@constants/store";
import { getCurrentUser, kakaoLogin } from "@services/user";
import { LINK } from "@constants/link";
import { errorLoging } from "@utils/errorHandler";
import { setDataToSecureStore } from "@utils/secureStore";
import { StackNavigation } from "@types/RootStack";

const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage('message from webView')`;
const BASE_URL = process.env.API_BASE_URL;

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
  const requestToken = async () => {
    try {
      const response = await kakaoLogin();

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
  const KakaoLoginWebView = async () => {
    // OAuth url에서 토근 발급 받은 후 스토어에 저장
    await requestToken();

    // 현재 로그인한 유저 정보 요청 후 쿼리에 저장
    const userInfo = await getCurrentUser();
    queryClient.setQueryData([QUERY_KEY.CURRENT_USER], userInfo);

    // 홈 화면으로 이동
    navigation.push(LINK.HOME);
  };

  return (
    <View style={Styles.container}>
      <WebView
        style={{ flex: 1 }}
        originWhitelist={["*"]}
        scalesPageToFit={false}
        source={{
          uri: `${BASE_URL}/oauth/kakao/redirect`,
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
