import { Text } from "react-native";
import { useState } from "react";

import VariantSelector from "../components/UI/VariantSelector";
import SocialCardList from "../components/user/social/SocialCardList";
import { useGetSocialList } from "../hooks/useUserQuery";
import { styled } from "styled-components/native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../types/RootStack";
import AuthGuard from "../components/auth/AuthGuard";
import Header from "../components/UI/header/Header";
import BackButton from "../components/UI/header/BackButton";
import Title from "../components/UI/header/Title";
import { colors } from "../constants/color";

type UserScreenRouteProp = RouteProp<RootStackParamList, "SocialPage">;

const SocialPage = () => {
  const route = useRoute<UserScreenRouteProp>();
  const nickname = route.params.nickname!;
  const initialVariant = route.params.variant;

  const [variant, setVariant] = useState<"팔로워" | "팔로잉">(initialVariant);

  const users = useGetSocialList(variant, nickname);

  return (
    <Layout>
      <SocialHeader>
        <BackButton />
        <SocialHeaderText>
          {nickname}님{variant === "팔로워" ? "을" : "이"} 구독하는&nbsp;
          <ColoredText>{users.data.length}</ColoredText>명
        </SocialHeaderText>
        <Spacing />
      </SocialHeader>
      <AuthGuard>
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
          <SocialCardList userList={users.data} />
        )}
      </AuthGuard>
    </Layout>
  );
};

export default SocialPage;

const Layout = styled.View`
  display: flex;
  flex: 1;
  padding: 0 15px;
  background-color: white;
  gap: 5px;
`;

const SocialHeader = styled.View`
  padding-top: 40px;
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
  font-size: 20px;
`;

const Spacing = styled.View`
  width: 20px;
`;
