import { ReactNode, useEffect, useRef } from "react";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Platform } from "react-native";
import { Subscription } from "expo-modules-core";
import { setDataToSecureStore } from "@utils/secureStore";
import { STORE_KEY } from "@constants/store";
import { saveDataToAsyncStorage } from "@utils/asyncStorage";

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

  useEffect(() => {
    if (Device.isDevice) {
      notificationListener.current =
        Notifications.addNotificationReceivedListener(
          async (notification: Notifications.Notification) => {}
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
          await saveDataToAsyncStorage<boolean>(
            STORE_KEY.PUSH_NOTIFICATION_PERMISSION,
            true
          );
          finalStatus = status;
        }

        if (finalStatus !== "granted") {
          await saveDataToAsyncStorage<boolean>(
            STORE_KEY.PUSH_NOTIFICATION_PERMISSION,
            false
          );
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
            projectId: "29ddc7fe-a117-470b-8787-7c52553fa0fb",
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
