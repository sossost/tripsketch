import Spacing from "../UI/header/Spacing";
import CategorySkeletonUI from "./category/CategorySkeletonUI";
import ProfileSkeletonUI from "./profile/ProfileSkeletonUI";

const UserPageSkeletonUI = () => {
  return (
    <>
      <ProfileSkeletonUI />
      <Spacing direction="vertical" size={15} />
      <CategorySkeletonUI />
      <Spacing direction="vertical" size={15} />
    </>
  );
};

export default UserPageSkeletonUI;
