import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../types/RootStack";

import UserPageComponent from "../components/user/UserPageComponent";

type UserScreenRouteProp = RouteProp<RootStackParamList, "UserPage">;

const UserPage = () => {
  // 라우터에서 넘어온 닉네임 파라미터를 변수에 할당
  const route = useRoute<UserScreenRouteProp>();
  const nickname = route.params.nickname;

  return <UserPageComponent nickname={nickname} />;
};

export default UserPage;
