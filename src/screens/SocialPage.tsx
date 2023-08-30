import { RouteProp, useRoute } from "@react-navigation/native";

import AuthGuard from "../components/auth/AuthGuard";
import SocialPageComponent from "../components/user/SocialPageComponent";
import { RootStackParamList } from "../types/RootStack";

type UserScreenRouteProp = RouteProp<RootStackParamList, "SocialPage">;

const SocialPage = () => {
  const route = useRoute<UserScreenRouteProp>();
  const nickname = route.params.nickname!;
  const variant = route.params.variant;

  return (
    <AuthGuard>
      <SocialPageComponent nickname={nickname} initialVariant={variant} />
    </AuthGuard>
  );
};

export default SocialPage;
