import { Text } from "react-native";
import { useState } from "react";

import { useGetCurrentUser, useGetSocialList } from "../../hooks/useUserQuery";
import { useSocialControllerInSocialPage } from "../../hooks/useFollowQuery";
import { styled } from "styled-components/native";
import { colors } from "../../constants/color";

import VariantSelector from "../UI/VariantSelector";
import SocialList from "./social/SocialList";
import BackButton from "../UI/header/BackButton";
import ErrorBoundary from "react-native-error-boundary";
import ErrorFallback from "../UI/ErrorFallback";
import Loading from "../UI/Loading";

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
 * @update : 2023-09-12,
 * @version 1.1.1, 소셜리스트에 유저가 나일 경우 팔로우 버튼이 보이지 않도록 수정
 * @see None,
 */
const SocialPageComponent = ({
  pageOwnerNickname,
  initialVariant,
}: SocialPageComponentProps) => {
  // 페이지의 variant 상태를 관리하는 state
  const [variant, setVariant] = useState<"팔로워" | "팔로잉">(initialVariant);

  // 현재 로그인한 유저의 정보를 가져옴
  const currentUser = useGetCurrentUser().data;

  // 현재 페이지의 유저 리스트를 가져옴
  const userList = useGetSocialList(variant, pageOwnerNickname);

  // 팔로우 버튼을 눌렀을 때의 핸들러
  const followBtnHandler = useSocialControllerInSocialPage({
    currentUser,
    pageOwnerNickname,
    variant,
  });

  return (
    <Layout>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <SocialHeader>
          <BackButton />
          <SocialHeaderText>
            <ColoredText>{pageOwnerNickname}</ColoredText>님
            {variant === "팔로워" ? "을" : "이"} 구독하는&nbsp;
            <ColoredText>{userList.data?.length || 0}</ColoredText>명
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

        {userList.isLoading ? (
          <Loading />
        ) : userList.isError ? (
          <Text>에러</Text>
        ) : (
          <SocialList
            userList={userList.data || []}
            followBtnHandler={followBtnHandler}
            currentUserNickname={currentUser?.nickname || null}
          />
        )}
      </ErrorBoundary>
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
