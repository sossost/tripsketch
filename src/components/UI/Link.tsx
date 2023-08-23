import React from "react";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { css, styled } from "styled-components/native";
import { StackNavigation } from "../../types/RootStack";

interface LinkProps {
  page: string;
  params?: object;
  text: string;
  fontSize?: number;
}

const Link: React.FC<LinkProps> = ({ page, params, text, fontSize }) => {
  const navigation = useNavigation<StackNavigation>();

  const handlePress = () => {
    navigation.navigate(page, params);
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
