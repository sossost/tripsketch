import { STORE_KEY } from "../constants/store";
import { getDataFromSecureStore, setDataToSecureStore } from "./secureStore";

export const updateNotification = async (newNotification: any) => {
  const prevNotifications = await getDataFromSecureStore(
    STORE_KEY.NOTIFICATION
  );
  const updatedNotifications = {
    ...prevNotifications,
    ...newNotification,
  };
  await setDataToSecureStore(STORE_KEY.NOTIFICATION, updatedNotifications);
};
