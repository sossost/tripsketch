import { useGetCurrentUser } from "../../hooks/useUserQuery";

import AuthConfirm from "./AuthConfirm";
import Loading from "../UI/Loading";

/**
 * @description : 인증이 필요한 페이지를 숨기고 인증 유도 모달을 띄우는 컴포넌트
 * @author : 장윤수
 * @update : 2023-09-28,
 * @version 1.3.0, 인증 가드 HoC로 리팩토링
 * @see None,
 */
const withAuthGuard = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  return function AuthGuard(props: P) {
    const currentUser = useGetCurrentUser();

    if (currentUser.isLoading) {
      return <Loading />;
    }

    if (!currentUser.data) {
      return <AuthConfirm />;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuthGuard;
