import { StyleSheet, FlatList, View, Dimensions } from "react-native";
import { User } from "../../../types/user";
import {
  useGetCurrentUser,
  useGetSocialList,
} from "../../../hooks/useUserQuery";

import SocialCard from "./SocialCard";

type SocialCardListProps = {
  userList: User[] | undefined;
};

const SocialCardList = ({ userList }: SocialCardListProps) => {
  const currentUser = useGetCurrentUser().data;
  const followingList = useGetSocialList("팔로잉", currentUser?.nickname ?? "");

  const windowWidth = Dimensions.get("window").width;
  const calculateItemSize = (windowWidth - 40) / 2;

  return (
    <FlatList
      data={userList}
      numColumns={2}
      columnWrapperStyle={{ gap: 10 }}
      renderItem={(userData) => {
        const user = userData.item;
        const isFollowing = followingList.data.some(
          (following: User) => following.nickname === user.nickname
        );
        return (
          <View style={{ width: calculateItemSize }}>
            <SocialCard user={user} isFollowing={isFollowing} />
          </View>
        );
      }}
      alwaysBounceVertical={false}
      contentContainerStyle={styles.container}
    />
  );
};

export default SocialCardList;

const styles = StyleSheet.create({
  container: {
    paddingTop: 12,
    gap: 12,
  },
});
