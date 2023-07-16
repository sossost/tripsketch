import { StyleSheet, View } from "react-native";
import { useState } from "react";
import { currentUser } from "../../data/mockdata";

import VariantSelector from "../components/UI/VariantSelector";
import SocialCardList from "../components/user/social/SocialCardList";
import Loading from "../components/UI/Loading";
import SearchBar from "../components/UI/SearchBar";
import { useGetCurrentUser, useGetSocialList } from "../hooks/useUserQuery";
import { styled } from "styled-components/native";

type SocialPageProps = {
  initialVariant: "팔로워" | "팔로잉";
};

const SocialPage = ({ initialVariant }: SocialPageProps) => {
  const [variant, setVariant] = useState<"팔로워" | "팔로잉">(initialVariant);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // const { currentUser } = useGetCurrentUser();
  const { users, isLoading, isError } = useGetSocialList(
    variant,
    currentUser.user_name
  );

  return (
    <Layout>
      <VariantSelector<"팔로워" | "팔로잉">
        variant1="팔로워"
        variant2="팔로잉"
        initialVariant={initialVariant}
        setVariant={setVariant}
      />
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <div>Error Page</div>
      ) : (
        <SocialCardList currentUser={currentUser} userList={users} />
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
`;
