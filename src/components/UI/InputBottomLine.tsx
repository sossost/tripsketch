import React from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  View,
  ViewStyle,
  Image,
  TouchableOpacity,
} from "react-native";

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
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.wrapper}>
        <TextInput
          style={[styles.input, style]}
          value={text}
          onChangeText={(text) => setText(text)}
        />
        <TouchableOpacity onPress={() => setText("")}>
          <Image
            source={require("../../assets/images/inputResetIcon.svg")}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.validation}>
        {text.length}/{textLength}
      </Text>
    </View>
  );
};

export default InputBottomLine;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
  },

  label: {
    fontSize: 12,
  },

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
