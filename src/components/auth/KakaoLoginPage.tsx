import React from "react";
import { View, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import { useNavigation } from "@react-navigation/native";
import { axiosBase } from "../../../api/axios";
import { tokenState } from "../../recoil/atom";
import { useRecoilState } from "recoil";

const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage('message from webView')`;

const clientId = "1927d084a86a31e01a814ce0b2fe3459";
// const authorizeUrl = `https://accounts.kakao.com/login/?continue=https%3A%2F%2Fkauth.kakao.com%2Foauth%2Fauthorize%3Fresponse_type%3Dcode%26redirect_uri%3Dhttps%253A%252F%252Fport-0-tripsketch-kvmh2mljz6ccl7.sel4.cloudtype.app%252Foauth%252Fkakao%252Fcode%26through_account%3Dtrue%26client_id%3D${clientId}#login`;
const authorizeUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=https://port-0-tripsketch-kvmh2mljz6ccl7.sel4.cloudtype.app/api/oauth/kakao/code&response_type=code`;

/** 카카오 로그인 페이지 컴포넌트 */
const KaKaoLogin = () => {
  const navigation = useNavigation();

  // 토큰 상태 관리
  const [token, setToken] = useRecoilState(tokenState);

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
      console.log("response...", response);

      // headers에서 토큰값 추출
      const tokenValue = response.headers.authorization.split(" ")[1];
      console.log("bearerToken", tokenValue);

      // recoil에 token 설정
      setToken(tokenValue);

      // 토큰이 정상발급 된 경우 메인 페이지로 이동
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
