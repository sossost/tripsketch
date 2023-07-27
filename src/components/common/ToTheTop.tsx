import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

const ToTheTop = () => {
  return (
    <View style={styles.buttonItself}>
      <TouchableOpacity>
        <Text style={styles.buttonText}>맨 위로</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ToTheTop;

const styles = StyleSheet.create({
  buttonItself: {
    margin: 10,
    bottom: 0,
    right: 0,
    position: "absolute",
    width: 80,
    height: 50,
    borderRadius: 100,
    backgroundColor: "white",
    shadowColor: "#111",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    zIndex: 5,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
  },
});
