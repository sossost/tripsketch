import React from "react";

import UserPageComponent from "../components/user/UserPageComponent";
import AuthGuard from "../components/auth/AuthGuard";
import Title from "../components/UI/header/Title";
import Header from "../components/UI/header/Header";

/**
 * @description : 마이 페이지
 *
 * @author : 장윤수
 * @update : 2023-09-13,
 * @version 1.1.0, 커스텀 헤더 추가
 * @see None,
 */
const MyPage = () => {
  return (
    <AuthGuard>
      <Header left={<Title title={"마이페이지"} />} />
      <UserPageComponent />
    </AuthGuard>
  );
};

export default MyPage;
