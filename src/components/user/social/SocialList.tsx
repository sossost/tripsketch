import { FlatList } from "react-native";
import { User } from "../../../types/user";

import SocialItem from "./SocialItem";

interface SocialListProps {
  userList: User[];
  followBtnHandler: (nickname: string, isFollowing: boolean) => Promise<void>;
}

/**
 * @description : 닉네임과 카테고리로 페이지네이션 처리된 게시글 리스트를 요청하는 리액트 쿼리 훅
 *
 * @param userList : 팔로잉 or 팔로우 유저 리스트
 * @param followBtnHandler : 팔로우 버튼 핸들러
 *
 * @author : 장윤수
 * @update : 2023-09-12,
 * @version 1.0.1, isFollowing 불필요한 로직 삭제
 * @see None,
 */
const SocialList = ({ userList, followBtnHandler }: SocialListProps) => {
  return (
    <FlatList
      data={userList}
      renderItem={(userData) => {
        const user = userData.item;
        const isFollowing = userData.item.isFollowing;
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
