import { StyleSheet, View } from "react-native";
import { ClipLoader } from "react-spinners";

const Loading = () => {
  return (
    <View style={styles.container}>
      <ClipLoader color="#73BBFB" />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
