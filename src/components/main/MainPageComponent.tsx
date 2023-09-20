import { useGetCurrentUser } from "@hooks/useUserQuery";
import { useNavigation } from "@react-navigation/native";
import { StackNavigation } from "@types/RootStack";
import { LINK } from "@constants/link";

import AsyncBoundary from "@components/common/AsyncBoundary";
import TrendingPostsList from "@components/main/TrendingPostsList";
import SubscribedPostsList from "@components/main/SubscribedPostsList";
import Header from "@components/UI/header/Header";
import Logo from "@components/UI/Logo";
import ProfileImage from "@components/user/profile/ProfileImage";
import PageLayout from "@components/common/PageLayout";

/**
 * @description : 메인 페이지 컴포넌트
 * @author : 장윤수
 * @update : 2023-09-21,
 * @version 1.1.0, 메인 상단 컴포넌트 변경, 리프레쉬 컨트롤 추가
 * @see None,
 */
const MainPageComponent = () => {
  const navigation = useNavigation<StackNavigation>();

  // 현재 유저 정보 가져오는 커스텀 훅
  const { data: currentUser } = useGetCurrentUser();

  // 헤더 왼쪽, 오른쪽 컴포넌트
  const headerLeft = <Logo />;
  const headerRight = currentUser && (
    <ProfileImage
      profileImage={currentUser?.profileImageUrl}
      onPress={() => navigation.navigate(LINK.MY_PAGE)}
    />
  );

  return (
    <PageLayout>
      <Header left={headerLeft} right={headerRight} />

      <AsyncBoundary>
        {currentUser ? <SubscribedPostsList /> : <TrendingPostsList />}
      </AsyncBoundary>
    </PageLayout>
  );
};

export default MainPageComponent;
