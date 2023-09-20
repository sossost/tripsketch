import { colors } from "@constants/color";
import { TextProps } from "react-native";
import { styled } from "styled-components/native";

interface BlueTitleProps extends TextProps {
  text: string;
}

const BlueTitle = ({ text, ...props }: BlueTitleProps) => {
  return (
    <TextWrapper>
      <StyledText {...props}>{text}</StyledText>
    </TextWrapper>
  );
};

export default BlueTitle;

const TextWrapper = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 5px;
  padding-bottom: 15px;
`;

const StyledText = styled.Text`
  font-size: 18px;
  font-weight: 500;
  color: ${colors.primary};
`;
