import withAuthGuard from "@components/auth/withAuthGuard";
import UserPageComponent from "../components/user/UserPageComponent";

const MyPage = () => {
  return <UserPageComponent />;
};

export default withAuthGuard(MyPage);
