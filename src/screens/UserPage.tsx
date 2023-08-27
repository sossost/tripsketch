import { RouteProp, useRoute } from "@react-navigation/native";
import UserPageComponent from "../components/user/UserPageComponent";
import { RootStackParamList } from "../types/RootStack";

type UserScreenRouteProp = RouteProp<RootStackParamList, "UserPage">;

const UserPage = () => {
  // 라우터에서 넘어온 닉네임 파라미터를 변수에 할당
  const route = useRoute<UserScreenRouteProp>();
  const nickname = route.params.nickname;

  return <UserPageComponent nickname={nickname} variant="userPage" />;
};

export default UserPage;
