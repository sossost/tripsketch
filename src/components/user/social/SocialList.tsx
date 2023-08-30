import { FlatList, View } from "react-native";
import { User } from "../../../types/user";

import SocialItem from "./SocialItem";

type SocialListProps = {
  userList: User[];
  currentUserFollowingList: User[];
  followBtnHandler: (nickname: string, isFollowing: boolean) => Promise<void>;
};

const SocialList = ({
  userList,
  currentUserFollowingList,
  followBtnHandler,
}: SocialListProps) => {
  return (
    <FlatList
      data={userList}
      renderItem={(userData) => {
        const user = userData.item;
        const isFollowing =
          currentUserFollowingList?.some(
            (following: User) => following.nickname === user.nickname
          ) || false;
        return (
          <SocialItem
            user={user}
            isFollowing={isFollowing}
            followBtnHandler={followBtnHandler}
          />
        );
      }}
      alwaysBounceVertical={false}
    />
  );
};

export default SocialList;
