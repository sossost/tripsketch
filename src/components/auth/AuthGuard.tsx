import { ReactNode } from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigation } from "../../types/RootStack";
import { useGetCurrentUser } from "../../hooks/useUserQuery";

const AuthGuard = ({ children }: { children: ReactNode }) => {
  const currentUser = useGetCurrentUser();

  const navigation = useNavigation<StackNavigation>();

  if (!currentUser.data) {
    navigation.navigate("LoginPage");
  }

  return <>{children}</>;
};

export default AuthGuard;
