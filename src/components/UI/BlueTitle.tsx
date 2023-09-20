import { colors } from "@constants/color";
import { TextProps } from "react-native";
import { styled } from "styled-components/native";

interface BlueTitleProps extends TextProps {
  text: string;
  isLine?: boolean;
}

const BlueTitle = ({ text, isLine = false, ...props }: BlueTitleProps) => {
  return (
    <TextWrapper>
      {isLine && <Line />}
      <StyledText {...props}>{text}</StyledText>
      {isLine && <Line />}
    </TextWrapper>
  );
};

export default BlueTitle;

const TextWrapper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 5px 5px 20px 5px;
  gap: 10px;
`;

const StyledText = styled.Text`
  font-size: 18px;
  font-weight: 500;
  color: ${colors.primary};
`;

const Line = styled.View`
  flex: 1;
  height: 2px;
  background-color: ${colors.lightGrey};
`;
