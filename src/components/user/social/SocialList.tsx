import { styled } from "styled-components/native";
import { useGetSocialList } from "../../../hooks/useUserQuery";

import SocialItem from "./SocialItem";

interface SocialListProps {
  variant: "팔로워" | "팔로잉";
  followBtnHandler: (nickname: string, isFollowing: boolean) => Promise<void>;
  pageOwnerNickname: string;
  currentUserNickname: string | null;
}

/**
 * @description : 소셜 리스트(팔로우, 팔로잉) 컴포넌트
 *
 * @param userList : 팔로잉 or 팔로우 유저 리스트
 * @param followBtnHandler : 팔로우 버튼 핸들러
 *
 * @author : 장윤수
 * @update : 2023-09-16,
 * @version 1.2.3, 로직 안으로 변경
 * @see None,
 */
const SocialList = ({
  variant,
  followBtnHandler,
  pageOwnerNickname,
  currentUserNickname,
}: SocialListProps) => {
  // 현재 페이지의 유저 리스트를 가져옴
  const { data: userList } = useGetSocialList(variant, pageOwnerNickname);

  return (
    <SocialItemContainer>
      {userList?.map((user) => {
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
