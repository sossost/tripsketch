import { UserPageLayout } from "./UserPageComponent";

import CategorySkeletonUI from "./category/CategorySkeletonUI";
import ProfileSkeletonUI from "./profile/ProfileSkeletonUI";

const UserPageSkeletonUI = () => {
  return (
    <UserPageLayout>
      <ProfileSkeletonUI />
      <CategorySkeletonUI />
    </UserPageLayout>
  );
};

export default UserPageSkeletonUI;
