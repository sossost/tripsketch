import { useState } from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";

type VariantProps<T extends string> = {
  variant1: T;
  variant2: T;
  initialVariant: T;
  setVariant: React.Dispatch<React.SetStateAction<T>>;
};

const VariantSelector = <T extends string>(props: VariantProps<T>) => {
  const { variant1, variant2, initialVariant, setVariant } = props;

  const [underlinePosition, setUnderlinePosition] = useState(
    initialVariant === variant1 ? "0%" : "50%"
  );

  return (
    <View style={styles.variantWrapper}>
      <TouchableOpacity
        style={styles.variantBox}
        onPress={() => {
          setUnderlinePosition("0%");
          setVariant(variant1);
        }}
      >
        <Text>{variant1}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.variantBox}
        onPress={() => {
          setUnderlinePosition("50%");
          setVariant(variant2);
        }}
      >
        <Text>{variant2}</Text>
      </TouchableOpacity>
      <View
        style={[
          styles.underline,
          { left: underlinePosition }, // 밑줄의 위치 조정
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  variantWrapper: {
    flexDirection: "row",
    height: 50,
    alignItems: "center",
    position: "relative",
    marginBottom: 10,
  },

  variantBox: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    position: "relative",
    height: "100%",
  },

  underline: {
    position: "absolute",
    bottom: 0,
    height: 3,
    width: "50%", // 밑줄의 너비 조정
    backgroundColor: "#73BBFB", // 원하는 색상으로 변경
    transitionProperty: "left",
    transitionDuration: "0.3s",
  },
});

export default VariantSelector;
