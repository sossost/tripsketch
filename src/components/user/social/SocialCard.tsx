import { StyleSheet, Image, Text, View, TouchableOpacity } from "react-native";
import { User } from "../../../types/user";

type SocialCardProps = {
  user: User;
  isFollowing: boolean;
};

const SocialCard = ({ user, isFollowing }: SocialCardProps) => {
  const followBtnImagePath = isFollowing
    ? require("../../../assets/images/isFollowingIcon.png")
    : require("../../../assets/images/isNotFollowingIcon.png");

  const followBtnStyle = isFollowing
    ? styles.isFollowingBtn
    : styles.isNotFollowingBtn;

  const followBtnHandler = async () => {
    try {
      if (isFollowing) {
        // axios
      } else {
        // axios
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <View style={styles.cardContainer}>
      <View style={styles.profileImageWrapper}>
        <Image
          source={{ uri: user.profileImageUrl }}
          style={styles.profileImage}
        />
      </View>
      <View style={styles.contantWrapper}>
        <Text>{user.nickname}</Text>
        <TouchableOpacity onPress={followBtnHandler}>
          <Image source={followBtnImagePath} style={followBtnStyle} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SocialCard;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#cccccc",
    flexDirection: "column",
    flex: 1,
  },

  profileImageWrapper: {
    position: "relative",
    paddingTop: "80%",
    backgroundColor: "#cccccc",
  },

  profileImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    resizeMode: "cover",
  },

  contantWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
    padding: 10,
  },

  isFollowingBtn: {
    height: 24,
    width: 22,
  },
  isNotFollowingBtn: {
    height: 24,
    width: 22,
  },
});
