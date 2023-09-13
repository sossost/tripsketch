import { ActivityIndicator, StyleSheet, View } from "react-native";
import { colors } from "../../constants/color";

/**
 * @description : 로딩 스피너 컴포넌트
 * @author : 장윤수
 * @update : 2023-09-13,
 * @version 1.1.0, 기존 텍스트에서 로딩스피너 애니메이션 추가
 * @see None,
 */

const Loading = () => {
  return (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});
