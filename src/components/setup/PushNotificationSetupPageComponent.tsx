import * as Notifications from "expo-notifications";
import { useEffect, useState } from "react";
import { styled } from "styled-components/native";
import { colors } from "@constants/color";
import {
  getDataFromAsyncStorage,
  saveDataToAsyncStorage,
} from "@utils/asyncStorage";
import { STORE_KEY } from "@constants/store";

import Header from "@components/UI/header/Header";
import CommonHeaderLeft from "@components/UI/header/HeaderLeft";
import PageLayout from "@components/common/PageLayout";

/**
 * @description : 푸시 알림 설정 페이지 컴포넌트
 * @author : 장윤수
 * @update : 2023-09-20,
 * @version 1.0.0,
 * @see None,
 */
const PushNotificationSetupPageComponent = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  /** 푸시 알림 설정 토글 버튼 */
  const toggleSwitch = async () => {
    if (isEnabled) {
      // 푸시 알림 설정 해제
      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: false,
          shouldPlaySound: false,
          shouldSetBadge: false,
        }),
      });

      // 푸시 알림 설정 스토리지에 저장
      await saveDataToAsyncStorage(
        STORE_KEY.PUSH_NOTIFICATION_PERMISSION,
        false
      );

      // 푸시 알림 설정 상태 변경
      setIsEnabled(false);
    } else {
      // 푸시 알림 설정
      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: false,
        }),
      });

      // 푸시 알림 설정 스토리지에 저장
      await saveDataToAsyncStorage(
        STORE_KEY.PUSH_NOTIFICATION_PERMISSION,
        true
      );

      // 푸시 알림 설정 상태 변경
      setIsEnabled(true);
    }
  };

  useEffect(() => {
    // 앱 시작시 알림 권한 상태 확인
    async function checkNotificationPermission() {
      const pushNotificationPermission: boolean = await getDataFromAsyncStorage(
        STORE_KEY.PUSH_NOTIFICATION_PERMISSION
      );

      setIsEnabled(pushNotificationPermission);
    }

    checkNotificationPermission();
  }, []);

  return (
    <PageLayout>
      <Header left={<CommonHeaderLeft title="푸시 알림 설정" />} />
      <ListItem>
        <ListItemText>푸시 알림 설정</ListItemText>
        <ToggleButton
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </ListItem>
    </PageLayout>
  );
};

export default PushNotificationSetupPageComponent;

const ListItem = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

const ListItemText = styled.Text`
  font-size: 18px;
  font-weight: 500;
  color: ${colors.mainFont};
`;

const ToggleButton = styled.Switch`
  transform: scale(1.2);
`;
