import React from "react";
import { TouchableOpacity, Text, Dimensions, Image, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

const { width: screenWidth } = Dimensions.get("window");

/** 카카오 로그인 버튼 컴포넌트 */
const KakaoLoginButton = () => {
  /** 버튼 너비 (양쪽 패딩 20씩 제외한 길이) */
  const buttonWidth = screenWidth - 40;
  const navigation = useNavigation();

  /** 카카오톡 로그인 버튼 핸들러 */
  const loginButtonHandler = () => {
    (navigation.navigate as (route: string) => void)("KakaoLoginPage");
  };

  return (
    <TouchableOpacity
      style={[
        {
          width: buttonWidth,
          height: 55,
          backgroundColor: "#FBDF57",
          borderRadius: 15,
          justifyContent: "center",
          alignItems: "center",
        },
      ]}
      onPress={loginButtonHandler}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          source={require("../../assets/images/kakaoIcon.png")}
          style={{ width: 20, resizeMode: "contain", marginRight: 5 }}
        />
        <Text style={{ fontSize: 17, color: "#414141" }}>
          카카오톡으로 5초만에 시작하기
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default KakaoLoginButton;
