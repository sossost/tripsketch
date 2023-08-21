import { Text, TouchableOpacity } from "react-native";
import { UserPageLayout } from "../../screens/UserPage";
import { useNavigation } from "@react-navigation/native";

import CategorySkeletonUI from "./CategorySkeletonUI";
import ProfileSkeletonUI from "./profile/ProfileSkeletonUI";

const UserPageSkeletonUI = () => {
  const navigation = useNavigation();

  return (
    <UserPageLayout>
      <ProfileSkeletonUI />
      <CategorySkeletonUI />
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(
            "UserPage" as never,
            {
              nickname: "네이버",
            } as never
          )
        }
      >
        <Text>유저버튼</Text>
      </TouchableOpacity>
    </UserPageLayout>
  );
};

export default UserPageSkeletonUI;
