import AuthGuard from "../components/auth/AuthGuard";
import NotificationPageComponent from "../components/notification/NotificationPageComponent";

const NotificationPage = () => {
  return (
    <AuthGuard>
      <NotificationPageComponent />
    </AuthGuard>
  );
};

export default NotificationPage;
