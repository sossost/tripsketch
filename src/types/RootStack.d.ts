export type RootStackParamList = {
  Home: undefined;
  UserPage: { nickname: string };
  SocialPage: { nickname: string; variant: "팔로워" | "팔로잉" };
  KakaoLoginPage: undefined;
  PostDetail: { postId: string };
  UpdatePost: { postId: string };
  OpensourceLicenceDetailPage: { libraryName: string };
  // 다른 스크린도 필요한 경우 정의할 수 있음
};

const Stack = createStackNavigator<RootStackParamList>();

export type StackNavigation = StackNavigationProp<RootStackParamList>;
