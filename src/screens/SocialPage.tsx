import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../types/RootStack";

import SocialPageComponent from "../components/user/SocialPageComponent";
import withAuthGuard from "@components/auth/withAuthGuard";

type UserScreenRouteProp = RouteProp<RootStackParamList, "SocialPage">;

const SocialPage = () => {
  const route = useRoute<UserScreenRouteProp>();
  const pageOwnerNickname = route.params.nickname!;
  const variant = route.params.variant;

  return (
    <SocialPageComponent
      pageOwnerNickname={pageOwnerNickname}
      initialVariant={variant}
    />
  );
};

export default withAuthGuard(SocialPage);
