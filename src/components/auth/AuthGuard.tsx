import { ReactNode, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigation } from "../../types/RootStack";
import { useGetCurrentUser } from "../../hooks/useUserQuery";

const AuthGuard = ({ children }: { children: ReactNode }) => {
  const navigation = useNavigation<StackNavigation>();

  // 유저정보를 가져옴
  const currentUser = useGetCurrentUser();

  // 유저정보가 없으면 로그인 페이지로 이동
  useEffect(() => {
    if (currentUser.data === undefined) {
      navigation.navigate("KakaoLoginPage");
    }
  }, []);

  // 유저정보가 없으면 아무것도 렌더링하지 않음
  if (currentUser.data === undefined) {
    return null;
  }

  return <>{children}</>;
};

export default AuthGuard;
