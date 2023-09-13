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
 * @update : 2023-09-13,
 * @version 1.1.2, FlatList 사용할경우 렌더링 누락되는 버그 있어서 map으로 변경
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
