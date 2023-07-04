import { StyleSheet, Text, View } from "react-native";

import { useState } from "react";

const PostView = () => {
  return (
    <View style={styles.container}>
      <Text>제목입니다.</Text>
      <Text>이미지 입니다.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
  },
});

export default PostView;
