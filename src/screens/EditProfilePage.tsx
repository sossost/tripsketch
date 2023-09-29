import withAuthGuard from "../components/auth/withAuthGuard";
import EditProfileComponent from "../components/user/EditProfileComponent";

const EditProfilePage = () => {
  return <EditProfileComponent />;
};

export default withAuthGuard(EditProfilePage);
