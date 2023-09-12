import { Button, StyleSheet, Text, View } from "react-native";

const ErrorFallback = (props: { error: Error; resetError: Function }) => {
  console.log("에러폴백에서 잡힌에러는" + props.error);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Something happened!</Text>
      <Text style={styles.text}>{props.error.toString()}</Text>
      <Button onPress={() => props.resetError} title={"Try again"} />
    </View>
  );
};

export default ErrorFallback;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ecf0f1",
    padding: 8,
    textAlign: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  icon: {
    fontSize: 48,
  },
  text: {
    marginVertical: 16,
  },
});
