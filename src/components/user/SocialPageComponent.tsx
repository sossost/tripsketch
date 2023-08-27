import { Text } from "react-native";
import { useState } from "react";

import {
  useGetCurrentUser,
  useGetSocialList,
  useSocialController,
} from "../../hooks/useUserQuery";
import { styled } from "styled-components/native";
import { colors } from "../../constants/color";

import VariantSelector from "../UI/VariantSelector";
import SocialList from "./social/SocialList";
import BackButton from "../UI/header/BackButton";

interface SocialPageComponentProps {
  nickname: string;
  initialVariant: "팔로워" | "팔로잉";
}

const SocialPageComponent = ({
  nickname,
  initialVariant,
}: SocialPageComponentProps) => {
  // 페이지의 variant 상태를 관리하는 state
  const [variant, setVariant] = useState<"팔로워" | "팔로잉">(initialVariant);

  // 현재 로그인한 유저의 정보를 가져옴
  const currentUser = useGetCurrentUser().data!;

  // 현재 로그인한 유저의 팔로잉 리스트를 가져옴
  const currentUserFollowingList = useGetSocialList(
    "팔로잉",
    currentUser.nickname
  ).data;

  // 현재 페이지의 유저 리스트를 가져옴
  const users = useGetSocialList(variant, nickname);

  // 팔로우 버튼을 눌렀을 때의 핸들러
  const followBtnHandler = useSocialController(currentUser);

  return (
    <Layout>
      <SocialHeader>
        <BackButton />
        <SocialHeaderText>
          <ColoredText>{nickname}</ColoredText>님
          {variant === "팔로워" ? "을" : "이"} 구독하는&nbsp;
          <ColoredText>{users.data.length}</ColoredText>명
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

      {users.isLoading ? (
        <Text>Loading...</Text>
      ) : users.isError ? (
        <Text>Error Page</Text>
      ) : (
        <SocialList
          userList={users.data}
          currentUserFollowingList={currentUserFollowingList}
          followBtnHandler={followBtnHandler}
        />
      )}
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
