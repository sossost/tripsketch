import React from "react";
import { View, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage('message from webView')`;

// my
const redirectUri = "https://172.30.1.72:19000/Home";
const clientId = "a08ecb16e847eb5dc824cc7d0ef71908";
const authorizeUrl = `https://accounts.kakao.com/login/?continue=https%3A%2F%2Fkauth.kakao.com%2Foauth%2Fauthorize%3Fresponse_type%3Dcode%26redirect_uri%3D${encodeURIComponent(
  redirectUri
)}%26client_id%3D${clientId}`;

// 호준님
// const redirectUri = "http://localhost:8080/oauth/kakao";
// const clientId = "3D1927d084a86a31e01a814ce0b2fe3459";
// const authorizeUrl =
//   "https://accounts.kakao.com/login/?continue=https%3A%2F%2Fkauth.kakao.com%2Foauth%2Fauthorize%3Fresponse_type%3Dcode%26redirect_uri%3Dhttp%253A%252F%252Flocalhost%253A8080%252Foauth%252Fkakao%26through_account%3Dtrue%26client_id%3D1927d084a86a31e01a814ce0b2fe3459";

const KaKaoLogin = () => {
  function KakaoLoginWebView(data: any) {
    const exp = "code=";
    var condition = data.indexOf(exp);
    if (condition != -1) {
      var authorize_code = data.substring(condition + exp.length);
      console.log("authorize_code...", authorize_code);
    }
  }

  return (
    <View style={Styles.container}>
      <WebView
        style={{ flex: 1 }}
        originWhitelist={["*"]}
        scalesPageToFit={false}
        source={{
          // uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`,
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
