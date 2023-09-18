import { useGetCurrentUser } from "../../hooks/useUserQuery";

import MainWelcome from "./MainWelcome";
import AsyncBoundary from "../common/AsyncBoundary";
import TrendingPosts from "./TrendingPosts";
import SubscribedPostsList from "./SubscribedPostsList";
import PageLayout from "../common/PageLayout";

/**
 * @description : 메인 페이지 컴포넌트
 * @author : 장윤수
 * @update : 2023-09-14,
 * @version 1.0.0,
 * @see None,
 */
const MainPageComponent = () => {
  const { data: currentUser } = useGetCurrentUser();

  return (
    <PageLayout>
      {currentUser && <MainWelcome currentUser={currentUser} />}
      <AsyncBoundary>
        {currentUser ? <SubscribedPostsList /> : <TrendingPosts />}
      </AsyncBoundary>
    </PageLayout>
  );
};

export default MainPageComponent;
