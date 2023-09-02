import { ReactNode, useEffect, useRef } from "react";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Platform } from "react-native";
import { Subscription } from "expo-modules-core";
import { setDataToSecureStore } from "../utils/secureStore";
import { STORE_KEY } from "../constants/store";
import { updateNotification } from "../utils/updateNotification";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const notificationListener = useRef<Subscription>();
  const responseListener = useRef<Subscription>();
  const lastNotificationResponse = Notifications.useLastNotificationResponse();

  useEffect(() => {
    if (Device.isDevice) {
      notificationListener.current =
        Notifications.addNotificationReceivedListener(
          async (notification: Notifications.Notification) => {
            await updateNotification(notification);
          }
        );

      responseListener.current =
        Notifications.addNotificationResponseReceivedListener((response) => {
          console.log("리스폰스:" + response);
        });

      return () => {
        if (
          typeof notificationListener.current !== "undefined" &&
          typeof responseListener.current !== "undefined"
        ) {
          Notifications.removeNotificationSubscription(
            notificationListener.current
          );
          Notifications.removeNotificationSubscription(
            responseListener.current
          );
        }
      };
    }
  }, []);

  // 로그인 시 Expo 알림 토큰 요청
  useEffect(() => {
    // Expo 알림 토큰 요청하는 함수
    const registerForPushNotificationsAsync = async () => {
      if (Device.isDevice) {
        const { status: existingStatus } =
          await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        if (existingStatus !== "granted") {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }

        if (finalStatus !== "granted") {
          console.log("알림 권한이 거부되었습니다.");
          return;
        }

        if (Platform.OS === "android") {
          await Notifications.setNotificationChannelAsync("default", {
            name: "default",
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: "#FF231F7C",
          });
        }

        const token = (
          await Notifications.getExpoPushTokenAsync({
            projectId: "f8190d6c-4843-4990-8bbb-f70715ad169f",
          })
        ).data;
        const pushToken = token.slice("ExponentPushToken[".length, -1);
        await setDataToSecureStore(STORE_KEY.PUSH_TOKEN, pushToken);
      } else {
        alert("Must use physical device for Push Notifications");
      }
    };

    registerForPushNotificationsAsync();
  }, []);

  return <>{children}</>;
};

export default NotificationProvider;
