import React from "react";
import { View, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import { axiosBase } from "../../../api/axios";
import axios from "axios";

const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage('message from webView')`;

// 230717 배포 완료 기준
const redirectUri =
  "https://port-0-tripsketch-kvmh2mljz6ccl7.sel4.cloudtype.app";
const clientId = "1927d084a86a31e01a814ce0b2fe3459";
const authorizeUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}/oauth/kakao/callback&response_type=code`;

const KaKaoLogin = () => {
  // 카카오 로그인 진행하는 화면
  const KakaoLoginWebView = (url: string) => {
    console.log("url...", url);
    // const exp = "code=";
    // const condition = url.indexOf(exp);
    // if (condition != -1) {
    //   const authorize_code = url.substring(condition + exp.length);
    //   console.log("authorize_code", authorize_code);
    //   requestToken(authorize_code);
    // }

    // fetch(
    //   `https://kauth.kakao.com/oauth/authorize?client_id=1927d084a86a31e01a814ce0b2fe3459&redirect_uri=https://port-0-tripsketch-kvmh2mljz6ccl7.sel4.cloudtype.app/oauth/kakao/callback&response_type=${authorize_code}`
    // )

    axios
      .get(url)
      .then((response) => {
        console.log("response!!!", response);
      })
      .catch((error) => {
        console.log("error...", error);
      });
  };

  // 토큰 발급받는 부분
  const requestToken = async (authorize_code: string) => {
    try {
      // 1) 트립스케치 서버에 토큰 헤더에 담아서 요청하는 부분
      // const response = await axiosBase.get(`oauth/kakao/callback`, {
      //   headers: {
      //     Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJibXAudG9tQGdtYWlsLmNvbSIsIm5pY2tuYW1lIjoi7Lm07Lm07JikIiwiaWF0IjoxNjg5MzM0MjI2LCJleHAiOjE2ODkzMzc4MjZ9.ErZgQ4tWbeGXZwYhd09xtPtx9tFNLo_UY3-ctc0gGD8`,
      //   },
      // });
      // const response = await axiosBase.get(
      //   `oauth/kakao/callback/code=${authorize_code}`
      // );
      // console.log("response...", response);
      // axios
      //   .get(url)
      //   .then((response) => {
      //     console.log("response...", response.data);
      //   })
      //   .catch((error) => {
      //     console.log("error...", error);
      //   });
      // 2) 카카오측에 인가코드를 통해 접근 토큰 받는 코드
      // const tokenResponse = await axios.post(
      //   "https://kauth.kakao.com/oauth/token",
      //   {
      //     grant_type: "authorization_code",
      //     client_id: clientId,
      //     redirect_uri: redirectUri,
      //     code: authorize_code,
      //   }
      // );
      // console.log("tokenResponse...", tokenResponse);
      // const accessToken = tokenResponse.data.access_token;
      // console.log("accessToken...", accessToken);
      // const userResponse = await axiosBase.get(`oauth/user`, {
      //   headers: {
      //     Authorization: `Bearer ${accessToken}`,
      //   },
      // });
      // console.log("user response...", userResponse);
    } catch (error) {
      console.log("로그인 토큰 요청 실패와 관련한 오류는..🧐", error);
    }

    // const accessToken = "none";
    // axios({
    //   method: "post",
    //   url: "https://kauth.kakao.com/oauth/token",
    //   params: {
    //     grant_type: "authorization_code",
    //     client_id: clientId,
    //     redirect_uri: redirectUri,
    //     code: authorize_code,
    //   },
    // })
    //   .then((response) => {
    //     console.log(response);
    //     const accessToken = response.data.access_token;
    //     console.log(accessToken);
    //   })
    //   .catch((error) => {
    //     console.log("error...", error);
    //   });
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
