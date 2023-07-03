import React from "react";
import { TouchableOpacity, Text, TouchableOpacityProps } from "react-native";

type CustomButtonProps = TouchableOpacityProps & {
  color: "blue" | "white";
  buttonText: string;
};

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

  return (
    <TouchableOpacity
      style={[
        {
          width: 300,
          height: 52,
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
      <Text style={{ fontSize: 18, color: textColor }}>{buttonText}</Text>{" "}
    </TouchableOpacity>
  );
};

export default CustomButton;
