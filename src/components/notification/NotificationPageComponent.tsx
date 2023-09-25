import { useState } from "react";
import styled from "styled-components/native";

import VariantSelector from "@components/UI/VariantSelector";
import Header from "@components/UI/header/Header";
import Title from "@components/UI/header/Title";
import AsyncBoundary from "@components/common/AsyncBoundary";
import MyNotificationList from "@components/notification/MyNotificationList";
import PageLayout from "@components/common/PageLayout";
import NoticeList from "./NoticeList";

/**
 * @description : 알림 페이지 컴포넌트
 * @author : 장윤수
 * @update : 2023-09-20,
 * @version 1.1.0, 내소식 -> 공지사항 워딩 변경
 * @see None,
 */
const NotificationPageComponent = () => {
  const [variant, setVariant] = useState<"내소식" | "공지사항">("내소식");

  return (
    <AsyncBoundary>
      <PageLayout>
        <Header left={<Title title={"알림"} />} />
        <AdSection></AdSection>
        <VariantSelector
          variant1="내소식"
          variant2="공지사항"
          initialVariant="내소식"
          variant={variant}
          setVariant={setVariant}
        />
        <AsyncBoundary>
          {variant === "내소식" && <MyNotificationList />}
          {variant === "공지사항" && <NoticeList />}
        </AsyncBoundary>
      </PageLayout>
    </AsyncBoundary>
  );
};

const AdSection = styled.View`
  width: 100%;
  height: 80px;
  background: #eee;
  border-radius: 5px;
`;

export default NotificationPageComponent;
