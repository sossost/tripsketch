import { StyleSheet, FlatList, View } from "react-native";
import SocialCard from "./SocialCard";

type ListingSocialCard = {
  currentUser: User | undefined;
  userList: User[];
};

const ListingSocialCard = (props: ListingSocialCard) => {
  const { currentUser, userList } = props;
  return (
    <FlatList
      data={userList}
      numColumns={2}
      columnWrapperStyle={{ gap: 10 }}
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

export default ListingSocialCard;

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
});
