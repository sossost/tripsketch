import { FlatList } from "react-native";
import { User } from "../../../types/user";

import SocialItem from "./SocialItem";
import { styled } from "styled-components/native";

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
 * @update : 2023-09-14,
 * @version 1.1.3, 키값 누락 추가
 * @see None,
 */
const SocialList = ({
  userList,
  followBtnHandler,
  currentUserNickname,
}: SocialListProps) => {
  return (
    <SocialItemContainer>
      {userList.map((user) => {
        const isFollowing = user.isFollowing;
        const isMe = user.nickname === currentUserNickname ? true : false;
        return (
          <SocialItem
            key={user.nickname}
            user={user}
            isFollowing={isFollowing}
            followBtnHandler={followBtnHandler}
            isMe={isMe}
          />
        );
      })}
    </SocialItemContainer>
  );
};

export default SocialList;

const SocialItemContainer = styled.ScrollView`
  flex-direction: column;
  margin-top: 10px;
`;
