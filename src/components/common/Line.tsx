import { StyleSheet, Text, View } from "react-native";

const Line = () => {
  return <View style={styles.line}></View>;
};

const styles = StyleSheet.create({
  line: {
    width: "100%",
    height: 4,
    backgroundColor: "#eee",
    marginVertical: 15,
  },
});

export default Line;
