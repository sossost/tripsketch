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
      renderItem={(userData) => {
        const user = userData.item;
        const isFollowing = currentUser
          ? currentUser?.followingList.includes(user.id)
          : false;
        return <SocialCard user={user} isFollowing={isFollowing} />;
      }}
      alwaysBounceVertical={false}
    />
  );
};

export default ListingSocialCard;
