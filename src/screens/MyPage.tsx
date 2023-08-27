import React from "react";
import UserPageComponent from "../components/user/UserPageComponent";
import AuthGuard from "../components/auth/AuthGuard";

const MyPage = () => {
  return (
    <AuthGuard>
      <UserPageComponent variant="myPage" />
    </AuthGuard>
  );
};

export default MyPage;
