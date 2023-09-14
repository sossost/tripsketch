import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../constants/color";

/**
 * @description : 데이터 없을시 띄워주는 텍스트 컴포넌트
 *
 * @param message : 띄워줄 메시지 텍스트
 *
 * @author : 장윤수
 * @update : 2023-09-13,
 * @version 1.0.0,
 * @see None,
 */
const NoneData = ({ message }: { message: string }) => {
  return (
    <View style={[styles.container, styles.horizontal]}>
      <Text style={styles.noneDataText}>{message}</Text>
    </View>
  );
};

export default NoneData;

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
  noneDataText: {
    fontSize: 18,
    fontWeight: "500",
    color: colors.mainFont,
    textAlignVertical: "bottom",
  },
});
