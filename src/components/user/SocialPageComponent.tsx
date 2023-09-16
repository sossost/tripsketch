import { useState } from "react";
import {
  useGetCurrentUser,
  useGetUserByNickname,
} from "../../hooks/useUserQuery";
import { useSocialControllerInSocialPage } from "../../hooks/useFollowQuery";
import { styled } from "styled-components/native";
import { colors } from "../../constants/color";

import VariantSelector from "../UI/VariantSelector";
import SocialList from "./social/SocialList";
import BackButton from "../UI/header/BackButton";
import AsyncBoundary from "../common/AsyncBoundary";

interface SocialPageComponentProps {
  pageOwnerNickname: string;
  initialVariant: "팔로워" | "팔로잉";
}

/**
 * @description : 소셜 페이지 컴포넌트
 *
 * @param pageOwnerNickname : 해당 페이지 주인의 닉네임
 * @param initialVariant : 페이지의 초기 variant 상태 (팔로워, 팔로잉)
 *
 * @author : 장윤수
 * @update : 2023-09-16,
 * @version 1.2.1, 유저리스트 로직 분리
 * @see None,
 */
const SocialPageComponent = ({
  pageOwnerNickname,
  initialVariant,
}: SocialPageComponentProps) => {
  // 페이지의 variant 상태를 관리하는 state
  const [variant, setVariant] = useState<"팔로워" | "팔로잉">(initialVariant);

  const isFollowerPage = variant === "팔로워" ? true : false;

  // 현재 로그인한 유저의 정보를 가져옴
  const { data: currentUser } = useGetCurrentUser();

  // 현재 페이지 주인의 정보를 가져옴
  const { data: pageOwner } = useGetUserByNickname(pageOwnerNickname);

  // 팔로우 버튼을 눌렀을 때의 핸들러
  const followBtnHandler = useSocialControllerInSocialPage({
    currentUser,
    pageOwnerNickname,
    variant,
  });

  return (
    <Layout>
      <SocialHeader>
        <BackButton />
        <SocialHeaderText>
          <ColoredText>{pageOwnerNickname}</ColoredText>님
          {isFollowerPage ? "을" : "이"} 구독하는&nbsp;
          <ColoredText>
            {isFollowerPage
              ? pageOwner?.followersCount
              : pageOwner?.followingCount || 0}
          </ColoredText>
          명
        </SocialHeaderText>
        <Spacing />
      </SocialHeader>

      <VariantSelector<"팔로워" | "팔로잉">
        variant1="팔로워"
        variant2="팔로잉"
        initialVariant={initialVariant}
        variant={variant}
        setVariant={setVariant}
      />

      <AsyncBoundary>
        <SocialList
          variant={variant}
          pageOwnerNickname={pageOwnerNickname}
          followBtnHandler={followBtnHandler}
          currentUserNickname={currentUser?.nickname || null}
        />
      </AsyncBoundary>
    </Layout>
  );
};

export default SocialPageComponent;

const Layout = styled.View`
  display: flex;
  flex: 1;
  padding: 0 15px;
  background-color: white;
  gap: 5px;
`;

const SocialHeader = styled.View`
  padding-top: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const SocialHeaderText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${colors.mainFont};
  padding-bottom: 1px;
`;

const ColoredText = styled.Text`
  color: ${colors.primary};
  font-size: 18px;
`;

const Spacing = styled.View`
  width: 20px;
`;
