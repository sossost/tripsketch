import { ReactNode, useEffect } from "react";
import { useGetCurrentUser } from "../../hooks/useUserQuery";
import AuthConfirm from "./AuthConfirmModal";

/**
 * @description : 인증이 필요한 페이지를 숨기고 인증 유도 모달을 띄우는 컴포넌트
 * @author : 장윤수
 * @update : 2023-09-13,
 * @version 1.1.0, 기존 로그인 페이지로 이동하는 기능을 제거하고 인증 유도 컴포넌트를 띄우도록 수정
 * @see None,
 */
const AuthGuard = ({ children }: { children: ReactNode }) => {
  // 유저정보를 가져옴
  const currentUser = useGetCurrentUser();

  // 유저정보가 없으면 기존 페이지 대신 인증 유도 컴포넌트를 띄움
  if (!currentUser.data) {
    return <AuthConfirm />;
  }

  return <>{children}</>;
};

export default AuthGuard;
