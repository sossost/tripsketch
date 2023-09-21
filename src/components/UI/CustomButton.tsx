import { colors } from "@constants/color";
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
  const buttonColor: string = color === "blue" ? colors.primary : colors.white;
  const textColor: string = color === "blue" ? colors.white : colors.primary;

  return (
    <TouchableOpacity
      style={[
        {
          width: "100%",
          height: 55,
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
