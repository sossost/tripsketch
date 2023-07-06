import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import ListingSocialCard from "../components/user/social/ListingSocialCard";
import { currentUser, users } from "../../public/data/mockdata";
import VariantSelector from "../components/UI/VariantSelector";

const SocialPage = ({
  initialVariant,
}: {
  initialVariant: "팔로워" | "팔로잉";
}) => {
  const [variant, setVariant] = useState<"팔로워" | "팔로잉">(initialVariant);
  const [userList, setUserList] = useState<User[]>();

  useEffect(() => {
    if (variant === "팔로워") {
      //const followerList =  getFollowerList(currentUser.id);
      // setUserList(followerList);
    }
    if (variant === "팔로잉") {
      //const followingList = getFollowingList(currentUser.id);
      // setUserList(followingList);
    }
  }, [variant, userList]);

  return (
    <View style={styles.pageLayout}>
      <VariantSelector<"팔로워" | "팔로잉">
        variant1="팔로워"
        variant2="팔로잉"
        initialVariant={variant}
        setVariant={setVariant}
      />
      <ListingSocialCard currentUser={currentUser} userList={users} />
    </View>
  );
};

export default SocialPage;

const styles = StyleSheet.create({
  pageLayout: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: "#ffffff",
  },

  variantWrapper: {
    flexDirection: "row",
    height: 50,
    alignItems: "center",
    position: "relative",
    marginBottom: 10,
  },

  variantBox: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    position: "relative",
    height: "100%",
  },

  underline: {
    position: "absolute",
    bottom: 0,
    height: 3,
    width: "50%", // 밑줄의 너비 조정
    backgroundColor: "#73BBFB", // 원하는 색상으로 변경
    transitionProperty: "left",
    transitionDuration: "0.3s",
  },
});
