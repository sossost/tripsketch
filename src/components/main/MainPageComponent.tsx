import { useGetCurrentUser } from "@hooks/useUserQuery";

import MainWelcome from "@components/main/MainWelcome";
import AsyncBoundary from "@components/common/AsyncBoundary";
import TrendingPostsList from "@components/main/TrendingPostsList";
import SubscribedPostsList from "@components/main/SubscribedPostsList";
import PageLayout from "@components/common/PageLayout";

/**
 * @description : 메인 페이지 컴포넌트
 * @author : 장윤수
 * @update : 2023-09-20,
 * @version 1.0.0,
 * @see None,
 */
const MainPageComponent = () => {
  const { data: currentUser } = useGetCurrentUser();

  return (
    <PageLayout>
      {currentUser && <MainWelcome currentUser={currentUser} />}
      <AsyncBoundary>
        {currentUser ? <SubscribedPostsList /> : <TrendingPostsList />}
      </AsyncBoundary>
    </PageLayout>
  );
};

export default MainPageComponent;
