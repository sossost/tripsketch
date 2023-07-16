import React from "react";
import { TouchableOpacity, Text, StyleProp, ViewStyle } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { css, styled } from "styled-components/native";

interface LinkProps {
  page: string;
  text: string;
  fontSize?: number;
}

const Link: React.FC<LinkProps> = ({ page, text, fontSize }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate(page as never);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <LinkText fontSize={fontSize}>{text}</LinkText>
    </TouchableOpacity>
  );
};

export default Link;

const LinkText = styled.Text<{ fontSize: number | undefined }>`
  color: ${(props) => props.theme.mainFont};
  font-size: ${(props) => (props.fontSize ? `${props.fontSize}px` : "16px")};
`;
