import { StyleSheet, FlatList, View } from "react-native";
import SocialCard from "./SocialCard";
import SearchBar from "../../UI/SearchBar";
import {
  ComponentType,
  JSXElementConstructor,
  ReactElement,
  useState,
} from "react";

type SocialCardListProps = {
  currentUser: User | undefined;
  userList: User[] | undefined;
  header?:
    | ReactElement<any, string | JSXElementConstructor<any>>
    | ComponentType<any>
    | null
    | undefined;
};

const SocialCardList = (props: SocialCardListProps) => {
  const { currentUser, userList, header } = props;

  return (
    <FlatList
      data={userList}
      numColumns={2}
      columnWrapperStyle={{ gap: 10 }}
      ListHeaderComponent={header}
      renderItem={(userData) => {
        const user = userData.item;
        const isFollowing = currentUser
          ? currentUser?.followingList.includes(user.user_name)
          : false;
        return <SocialCard user={user} isFollowing={isFollowing} />;
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
