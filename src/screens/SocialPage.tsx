import { Text } from "react-native";
import { useState } from "react";
import { currentUser } from "../../data/mockdata";

import VariantSelector from "../components/UI/VariantSelector";
import SocialCardList from "../components/user/social/SocialCardList";
import { useGetCurrentUser, useGetSocialList } from "../hooks/useUserQuery";
import { styled } from "styled-components/native";
import { useUserSearch } from "../hooks/useUserSearch";

type SocialPageProps = {
  initialVariant: "팔로워" | "팔로잉";
};

const SocialPage = ({ initialVariant }: SocialPageProps) => {
  const [variant, setVariant] = useState<"팔로워" | "팔로잉">(initialVariant);

  // const { currentUser } = useGetCurrentUser();
  const { UserSearchBar, users, isLoading, isError } = useUserSearch(
    variant,
    currentUser.user_name
  );

  return (
    <Layout>
      <VariantSelector<"팔로워" | "팔로잉">
        variant1="팔로워"
        variant2="팔로잉"
        initialVariant={initialVariant}
        variant={variant}
        setVariant={setVariant}
      />

      {isLoading ? (
        <Text>Loading...</Text>
      ) : isError ? (
        <Text>Error Page</Text>
      ) : (
        <SocialCardList
          currentUser={currentUser}
          userList={users}
          header={UserSearchBar}
        />
      )}
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
