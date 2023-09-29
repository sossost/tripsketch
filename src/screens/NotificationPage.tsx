import withAuthGuard from "@components/auth/withAuthGuard";
import NotificationPageComponent from "../components/notification/NotificationPageComponent";

const NotificationPage = () => {
  return <NotificationPageComponent />;
};

export default withAuthGuard(NotificationPage);
