import { StyleSheet, Text, View } from "react-native";
import { EvilIcons } from "@expo/vector-icons";

const LikesAndCommentText = () => {
  return (
    <View>
      <View style={styles.icon_container}>
        <EvilIcons name="heart" size={32} color="black" />
        <EvilIcons name="comment" size={32} color="black" />
      </View>
      <View style={styles.line}>
        <View style={styles.likeView_container}>
          <View style={styles.likes}>
            <View style={styles.info_name}>
              <Text style={styles.info_text}>좋아요</Text>
            </View>
            <Text style={styles.likeView_text}>234</Text>
          </View>
          <View style={styles.views}>
            <View style={styles.info_name}>
              <Text style={styles.info_text}>조회수</Text>
            </View>
            <Text style={styles.likeView_text}>4345</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  icon_container: {
    display: "flex",
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  line: {
    width: "100%",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderTopColor: "#e9e9e9",
    borderTopWidth: 1,
    borderBottomColor: "#e9e9e9",
    borderBottomWidth: 1,
  },
  likeView_container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  info_name: {},
  info_text: {
    color: "#888",
  },
  likes: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  views: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  likeView_text: {
    marginLeft: 3,
    fontSize: 12,
    fontWeight: "700",
    color: "#555",
  },
});

export default LikesAndCommentText;
