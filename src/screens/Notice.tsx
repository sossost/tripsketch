import React from "react";
import { View, Button, StyleSheet } from "react-native";
import { getCurrentUser } from "../services/user";

const Notice = () => {
  const handleRefreshTokenTest = async () => {
    // 리프레시 토큰 테스트
    await getCurrentUser();
  };

  return (
    <View style={styles.container}>
      {/* 리프레시 토큰 테스트 버튼 */}
      <Button
        title="리프레시 토큰 테스트 (유저 정보 요청)"
        onPress={handleRefreshTokenTest}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Notice;
