import React from "react";
import {
  TouchableOpacity,
  Text,
  TouchableOpacityProps,
  View,
  ViewStyle,
  Dimensions,
} from "react-native";

type CustomButtonProps = TouchableOpacityProps & {
  color: "blue" | "white";
  buttonText: string;
};

const { width: screenWidth } = Dimensions.get("window");

/** 커스텀 버튼 컴포넌트 */
const CustomButton = ({
  color,
  onPress,
  style,
  buttonText,
  ...rest
}: CustomButtonProps) => {
  const buttonColor: string = color === "blue" ? "#73BBFB" : "white";
  const textColor: string = color === "blue" ? "white" : "#73BBFB";
  const buttonWidth = screenWidth - 40;

  return (
    <TouchableOpacity
      style={[
        {
          width: buttonWidth,
          height: 55,
          marginHorizontal: 20,
          backgroundColor: buttonColor,
          borderRadius: 15,
          justifyContent: "center",
          alignItems: "center",
        },
        style,
      ]}
      onPress={onPress}
      {...rest}
    >
      <Text style={{ fontSize: 18, color: textColor }}>{buttonText}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
