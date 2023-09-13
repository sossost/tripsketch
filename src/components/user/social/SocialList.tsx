import { FlatList } from "react-native";
import { User } from "../../../types/user";

import SocialItem from "./SocialItem";

interface SocialListProps {
  userList: User[];
  followBtnHandler: (nickname: string, isFollowing: boolean) => Promise<void>;
  currentUserNickname: string | null;
}

/**
 * @description : 소셜 리스트(팔로우, 팔로잉) 컴포넌트
 *
 * @param userList : 팔로잉 or 팔로우 유저 리스트
 * @param followBtnHandler : 팔로우 버튼 핸들러
 *
 * @author : 장윤수
 * @update : 2023-09-13,
 * @version 1.1.1, 소셜리스트에 유저가 나일 경우 팔로우 버튼이 보이지 않도록 수정
 * @see None,
 */
const SocialList = ({
  userList,
  followBtnHandler,
  currentUserNickname,
}: SocialListProps) => {
  return (
    <FlatList
      data={userList}
      renderItem={(userData) => {
        const user = userData.item;
        const isFollowing = userData.item.isFollowing;
        const isMe = user.nickname === currentUserNickname ? true : false;
        return (
          <SocialItem
            user={user}
            isFollowing={isFollowing}
            followBtnHandler={followBtnHandler}
            isMe={isMe}
          />
        );
      }}
      alwaysBounceVertical={false}
    />
  );
};

export default SocialList;
