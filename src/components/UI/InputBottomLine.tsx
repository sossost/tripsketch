import { styled } from "styled-components/native";

interface InputBottomLine {
  label: string;
  text: string;
  onChangeText: (text: string) => void;
  textLength: number;
}

const InputBottomLine = ({
  label,
  text,
  onChangeText,
  textLength,
}: InputBottomLine) => {
  return (
    <Container>
      <Label>{label}</Label>
      <InputWrapper>
        <Input
          value={text}
          onChangeText={(text) => onChangeText(text)}
          maxLength={textLength}
        />
        <ResetBtn onPress={() => onChangeText("")}>
          <ResetIcon source={require("@assets/images/inputResetIcon.png")} />
        </ResetBtn>
      </InputWrapper>
      <LengthCheckText>
        {text.length}/{textLength}
      </LengthCheckText>
    </Container>
  );
};

export default InputBottomLine;

const Container = styled.View`
  display: flex;
  flex-direction: column;
`;

const Label = styled.Text`
  font-size: 13px;
  color: #aaa;
`;

const InputWrapper = styled.View`
  flex-direction: row;
  gap: 10px;
  align-items: center;
  width: 100%;
  margin-bottom: 6px;
  border-bottom-width: 1px;
  border-color: ${(props) => props.theme.mainBlue};
  padding: 6px 0;
`;

const Input = styled.TextInput`
  flex: 1;
  font-size: 18px;
  color: ${(props) => props.theme.mainFont};
  border-width: 0;
`;

const ResetBtn = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px 0 4px 4px;
`;

const ResetIcon = styled.Image`
  width: 18px;
  height: 18px;
`;

const LengthCheckText = styled.Text`
  font-size: 10px;
  color: #bbb;
  text-align: right;
`;
