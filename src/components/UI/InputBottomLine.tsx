import {
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
  Image,
  TouchableOpacity,
} from "react-native";
import { styled } from "styled-components/native";

interface InputBottomLine {
  label: string;
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  textLength: number;
  style?: StyleProp<ViewStyle>;
}

const InputBottomLine = ({
  label,
  text,
  setText,
  textLength,
  style,
}: InputBottomLine) => {
  return (
    <Container>
      <Label>{label}</Label>
      <InputWrapper>
        <Input value={text} onChangeText={(text) => setText(text)} />
        <TouchableOpacity onPress={() => setText("")}>
          <Image
            source={require("../../assets/images/inputResetIcon.svg")}
            style={styles.icon}
          />
        </TouchableOpacity>
      </InputWrapper>
      <Text style={styles.validation}>
        {text.length}/{textLength}
      </Text>
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
  font-size: 16px;
  border-width: 0;
`;

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 6,
    borderBottomWidth: 1,
    borderColor: "#73BBFB",
    paddingVertical: 8,
  },

  input: {
    flex: 1,
    fontSize: 16,
    borderWidth: 0,
    outlineStyle: "none",
  },

  icon: {
    width: 16,
    height: 16,
  },

  validation: {
    fontSize: 10,
    color: "#bbbbbb",
    textAlign: "right",
  },
});
