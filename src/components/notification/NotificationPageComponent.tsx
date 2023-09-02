import React, { useEffect, useState } from "react";
import { Button } from "react-native";
import styled from "styled-components/native";
import VariantSelector from "../UI/VariantSelector";
import NoticePostCard from "../post/card/NoticePostCard";
import { Notification } from "../../types/Notification";
import * as Notifications from "expo-notifications";
import { getDataFromSecureStore } from "../../utils/secureStore";
import { STORE_KEY } from "../../constants/store";

const NotificationPageComponent = () => {
  const [notifications, setNotifications] = useState([]);
  const [variant, setVariant] = useState<"내소식" | "새소식">("내소식");

  async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "You've got mail! 📬",
        body: "Here is the notification body",
        data: { data: "goes here" },
      },
      trigger: { seconds: 2 },
    });
  }

  console.log(notifications);

  useEffect(() => {
    const getNotifications = async () => {
      const notifications = await getDataFromSecureStore(
        STORE_KEY.NOTIFICATION
      );
      setNotifications(notifications);
    };

    getNotifications();
  }, []);

  return (
    <Container>
      <AdSection></AdSection>
      <VariantSelector
        variant1="내소식"
        variant2="새소식"
        initialVariant="내소식"
        variant={variant}
        setVariant={setVariant}
      />
      <List
        data={notifications}
        renderItem={({ item }) => <NoticePostCard notification={item as any} />}
        keyExtractor={(item: any) => item.id}
        contentContainerStyle={{
          gap: 10,
          paddingVertical: 20,
          paddingHorizontal: 2,
        }}
      />
      <Button
        title="Press to schedule a notification"
        onPress={async () => {
          await schedulePushNotification();
        }}
      />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  align-items: center;
  background-color: #fff;
  padding: 0 20px;
`;

const AdSection = styled.View`
  width: 100%;
  height: 80px;
  background: #eee;
  border-radius: 5px;
`;
const List = styled.FlatList`
  width: 100%;
`;

export default NotificationPageComponent;
