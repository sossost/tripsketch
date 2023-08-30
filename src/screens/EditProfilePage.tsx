import AuthGuard from "../components/auth/AuthGuard";
import EditProfileComponent from "../components/user/EditProfileComponent";

const EditProfilePage = () => {
  return (
    <AuthGuard>
      <EditProfileComponent />
    </AuthGuard>
  );
};

export default EditProfilePage;
