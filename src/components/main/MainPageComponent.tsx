import { useGetCurrentUser } from "@hooks/useUserQuery";
import { FlatList, RefreshControl } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { StackNavigation } from "@types/RootStack";
import { LINK } from "@constants/link";
import { styled } from "styled-components/native";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "@react-query/queryKey";

import AsyncBoundary from "@components/common/AsyncBoundary";
import TrendingPostsList from "@components/main/TrendingPostsList";
import SubscribedPostsList from "@components/main/SubscribedPostsList";
import Header from "@components/UI/header/Header";
import Logo from "@components/UI/Logo";
import ProfileImage from "@components/user/profile/ProfileImage";

/**
 * @description : 메인 페이지 컴포넌트
 * @author : 장윤수
 * @update : 2023-09-21,
 * @version 1.1.0, 메인 상단 컴포넌트 변경, 리프레쉬 컨트롤 추가
 * @see None,
 */
const MainPageComponent = () => {
  const navigation = useNavigation<StackNavigation>();
  const queryClient = useQueryClient();

  // 현재 유저 정보 가져오는 커스텀 훅
  const { data: currentUser } = useGetCurrentUser();

  // 리스트 리프레쉬 핸들러
  const handleRefresh = () => {
    queryClient.invalidateQueries([
      QUERY_KEY.POSTS,
      QUERY_KEY.SUBSCRIPTED_USERS,
    ]);
  };

  // 리스트 리프레쉬 컨트롤 컴포넌트
  const refreshContral = (
    <RefreshControl refreshing={false} onRefresh={handleRefresh} />
  );

  // 헤더 왼쪽, 오른쪽 컴포넌트
  const headerLeft = <Logo />;
  const headerRight = currentUser && (
    <ProfileImage
      profileImage={currentUser?.profileImageUrl}
      onPress={() => navigation.navigate(LINK.MY_PAGE)}
    />
  );

  return (
    <MainLayout refreshControl={refreshContral}>
      <FlatList
        data={null}
        renderItem={null}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <Header
              style={{ marginVertical: 15 }}
              left={headerLeft}
              right={headerRight}
            />

            <AsyncBoundary>
              {currentUser ? <SubscribedPostsList /> : <TrendingPostsList />}
            </AsyncBoundary>
          </>
        }
        contentContainerStyle={{
          paddingBottom: 50,
          paddingHorizontal: 2,
        }}
      />
    </MainLayout>
  );
};

export default MainPageComponent;

const MainLayout = styled.ScrollView`
  display: flex;
  flex: 1;
  background-color: #fff;
  padding: 20px;
  padding-top: 30px;
  gap: 15px;
`;
