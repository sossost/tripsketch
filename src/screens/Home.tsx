import React, { useRef } from "react";
import { ScrollView } from "react-native";
import { useGetCurrentUser } from "../hooks/useUserQuery";
import { styled } from "styled-components/native";

import SubscribedPostsList from "../components/main/SubscribedPostsList";
import TrendingPosts from "../components/main/TrendingPosts";
import AsyncBoundary from "../components/common/AsyncBoundary";
import MainWelcome from "../components/main/MainWelcome";

/**
 * @description : 메인 페이지 컴포넌트
 * @author : 장윤수
 * @update : 2023-09-14,
 * @version 1.0.0,
 * @see None,
 */
const Home = () => {
  const { data: currentUser } = useGetCurrentUser();

  return (
    <MainPageLayout>
      {currentUser && <MainWelcome currentUser={currentUser} />}
      <AsyncBoundary>
        {currentUser ? <SubscribedPostsList /> : <TrendingPosts />}
      </AsyncBoundary>
    </MainPageLayout>
  );
};

const MainPageLayout = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: flex-start;
  padding-top: 40px;
`;

export default Home;
