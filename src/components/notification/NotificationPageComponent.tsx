import { useState } from "react";
import styled from "styled-components/native";
import VariantSelector from "../UI/VariantSelector";

import Header from "../UI/header/Header";
import Title from "../UI/header/Title";
import AsyncBoundary from "../common/AsyncBoundary";
import MyNotificationList from "./MyNotificationList";

/**
 * @description : 알림 페이지 컴포넌트
 * @author : 장윤수
 * @update : 2023-09-17,
 * @version 1.0.1, 알림 리스트 컴포넌트, 로직 분리
 * @see None,
 */
const NotificationPageComponent = () => {
  const [variant, setVariant] = useState<"내소식" | "새소식">("내소식");

  return (
    <AsyncBoundary>
      <Header left={<Title title={"알림"} />} />
      <Container>
        <AdSection></AdSection>
        <VariantSelector
          variant1="내소식"
          variant2="새소식"
          initialVariant="내소식"
          variant={variant}
          setVariant={setVariant}
        />
        <AsyncBoundary>
          {variant === "내소식" && <MyNotificationList />}
        </AsyncBoundary>
      </Container>
    </AsyncBoundary>
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
