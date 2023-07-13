import { StyleSheet, View } from "react-native";
import { useState } from "react";
import { currentUser } from "../../data/mockdata";

import VariantSelector from "../components/UI/VariantSelector";
import SocialCardList from "../components/user/social/SocialCardList";
import Loading from "../components/UI/Loading";
import SearchBar from "../components/UI/SearchBar";
import { useGetCurrentUser, useGetSocialList } from "../hooks/useUserQuery";

type SocialPageProps = {
  initialVariant: "팔로워" | "팔로잉";
};

const SocialPage = ({ initialVariant }: SocialPageProps) => {
  const [variant, setVariant] = useState<"팔로워" | "팔로잉">(initialVariant);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // const { currentUser } = useGetCurrentUser();
  const { users, isLoading, isError } = useGetSocialList(
    variant,
    currentUser.user_name
  );

  return (
    <View style={styles.pageLayout}>
      <VariantSelector<"팔로워" | "팔로잉">
        variant1="팔로워"
        variant2="팔로잉"
        initialVariant={initialVariant}
        setVariant={setVariant}
      />
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <div>Error Page</div>
      ) : (
        <SocialCardList currentUser={currentUser} userList={users} />
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
