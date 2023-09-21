import { styled } from "styled-components/native";
import { LINK } from "@constants/link";
import { colors } from "@constants/color";
import { useNavigation } from "@react-navigation/native";
import { StackNavigation } from "@types/RootStack";
import { resetDataInSecureStore } from "@utils/secureStore";
import { STORE_KEY } from "@constants/store";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { SUCCESS_MESSAGE } from "@constants/message";
import { ERROR_MESSAGE } from "@constants/message";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "@react-query/queryKey";
import useModal from "@hooks/useModal";

import Header from "@components/UI/header/Header";
import CommonHeaderLeft from "@components/UI/header/HeaderLeft";
import PageLayout from "@components/common/PageLayout";
import ConfirmModal from "@components/auth/ConfirmModal";

const SETUP_PAGE_LIST = [
  {
    title: "푸시 알림 설정",
    screenName: LINK.SETUP.PUSH_NOTIFICATION_SETUP_PAGE,
  },
  {
    title: "오픈소스 라이선스",
    screenName: LINK.SETUP.OPENSOURCE_LICENCE_PAGE,
  },
  {
    title: "개인정보 처리방침",
    screenName: LINK.SETUP.PRIVACY_POLICY_PAGE,
  },
  {
    title: "게시물 운영 정책",
    screenName: LINK.SETUP.POST_MANAGEMENT_POLICY_PAGE,
  },
  {
    title: "계정 관리",
    screenName: LINK.SETUP.ACCOUNT_MANAGEMENT_PAGE,
  },
];

/**
 * @description : 설정 및 개인정보 페이지 컴포넌트
 * @author : 장윤수
 * @update : 2023-09-21,
 * @version 1.1., 로그아웃 모달 추가
 * @see None
 */
const SetupPageCompnent = () => {
  const navigation = useNavigation<StackNavigation>();
  const queryClient = useQueryClient();
  const { isModalOpen, closeModal, openModal } = useModal();

  const handleLogout = async () => {
    try {
      await resetDataInSecureStore(STORE_KEY.ACCESS_TOKEN);
      await resetDataInSecureStore(STORE_KEY.REFRESH_TOKEN);
      queryClient.setQueryData([QUERY_KEY.CURRENT_USER], null);
      navigation.navigate(LINK.MAIN);
      Toast.show({ type: "success", text1: SUCCESS_MESSAGE.LOGOUT });
    } catch (error: unknown) {
      Toast.show({ type: "error", text1: ERROR_MESSAGE.LOGOUT });
    }
  };

  return (
    <PageLayout>
      <Header left={<CommonHeaderLeft title="개인정보 및 설정" />} />
      <SetupList>
        {SETUP_PAGE_LIST.map((item) => {
          return (
            <SetupItem
              key={item.title}
              onPress={() => navigation.navigate(item.screenName)}
            >
              <SetupItemTitle>{item.title}</SetupItemTitle>
              <SetupItemLinkIcon
                source={require("@assets/images/nextIcon.png")}
              />
            </SetupItem>
          );
        })}
        <SetupItem onPress={openModal}>
          <LogoutText>로그아웃</LogoutText>
        </SetupItem>
      </SetupList>

      {isModalOpen && (
        <ConfirmModal
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          message={`로그아웃을\n진행하시겠습니까?`}
          cancelText="취소"
          confirmText="로그아웃"
          onClickConfirm={handleLogout}
        />
      )}
    </PageLayout>
  );
};

export default SetupPageCompnent;

const SetupList = styled.View`
  display: flex;
  flex-direction: column;
`;

const SetupItem = styled.TouchableOpacity`
  padding: 16px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const SetupItemTitle = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: ${colors.mainFont};
`;

const SetupItemLinkIcon = styled.Image`
  width: 18px;
  height: 18px;
  object-fit: contain;
`;

const LogoutText = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: #d73131;
`;
