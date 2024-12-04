import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import { useNavigation } from "@react-navigation/native";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "@react-query/queryKey";
import { getCurrentUser, kakaoLogin } from "@services/user";
import { LINK } from "@constants/link";
import { errorLoging } from "@utils/errorHandler";
import { setAccessToken, setRefreshToken } from "@utils/token";
import { StackNavigation } from "../../types/RootStack";

const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage('message from webView')`;

const BASE_KAKAO_URL = "https://tripsketch.kro.kr/api/oauth/kakao";
const KAKAO_AUTH_URL = `${BASE_KAKAO_URL}/redirect`;
const KAKAO_CALLBACK_URL = `${BASE_KAKAO_URL}/callback`;

const KaKaoLogin: React.FC = () => {
  const navigation = useNavigation<StackNavigation>();
  const queryClient = useQueryClient();
  const [isLoginInProgress, setIsLoginInProgress] = useState(false);
  const [lastDetectedUrl, setLastDetectedUrl] = useState("");

  const requestToken = async () => {
    try {
      const { headers } = await kakaoLogin();
      const { accesstoken: accessToken, refreshtoken: refreshToken } = headers;
      if (accessToken) await setAccessToken(accessToken);
      if (refreshToken) await setRefreshToken(refreshToken);
    } catch (error: unknown) {
      errorLoging(error, "토큰 발급 요청 실패");
    }
  };

  const performKakaoLogin = async () => {
    await requestToken();
    const userInfo = await getCurrentUser();
    queryClient.setQueryData([QUERY_KEY.CURRENT_USER], userInfo);
    if (userInfo) navigation.navigate(LINK.MAIN);
  };

  const handleNavigationChange = (navState: any) => {
    const currentUrl = navState.url;
    if (lastDetectedUrl === currentUrl) return;
    setLastDetectedUrl(currentUrl);
    if (
      !isLoginInProgress &&
      currentUrl.includes(KAKAO_CALLBACK_URL) &&
      currentUrl.includes("code=")
    ) {
      setIsLoginInProgress(true);
      performKakaoLogin();
    }
  };

  return (
    <View style={styles.container}>
      <WebView
        style={{ flex: 1 }}
        originWhitelist={["*"]}
        scalesPageToFit={false}
        source={{ uri: KAKAO_AUTH_URL }}
        injectedJavaScript={INJECTED_JAVASCRIPT}
        javaScriptEnabled
        onNavigationStateChange={handleNavigationChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 24,
    backgroundColor: "#fff",
  },
});

export default KaKaoLogin;
