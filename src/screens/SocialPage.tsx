import { StyleSheet, View } from "react-native";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { getFollowerList, getFollowingList } from "../services/user";
import { currentUser } from "../../data/mockdata";

import VariantSelector from "../components/UI/VariantSelector";
import ListingSocialCard from "../components/user/social/ListingSocialCard";
import Loading from "../components/UI/Loading";
import SearchBar from "../components/UI/SearchBar";

const SocialPage = ({
  initialVariant,
}: {
  initialVariant: "팔로워" | "팔로잉";
}) => {
  const [variant, setVariant] = useState<"팔로워" | "팔로잉">(initialVariant);
  const [text, setText] = useState<string>("");
  const userName = currentUser.user_name;

  const {
    data: users,
    isLoading,
    isError,
  } = useQuery<User[] | undefined>([variant, userName], () => {
    if (variant === "팔로워") {
      return getFollowerList(userName);
    }
    if (variant === "팔로잉") {
      return getFollowingList(userName);
    }
  });

  return (
    <View style={styles.pageLayout}>
      <VariantSelector<"팔로워" | "팔로잉">
        variant1="팔로워"
        variant2="팔로잉"
        initialVariant={variant}
        setVariant={setVariant}
      />
      <SearchBar text={text} setText={setText} />
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <div>Error Page</div>
      ) : (
        <ListingSocialCard currentUser={currentUser} userList={users} />
      )}
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
