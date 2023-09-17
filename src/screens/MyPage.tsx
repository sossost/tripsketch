import UserPageComponent from "../components/user/UserPageComponent";
import AuthGuard from "../components/auth/AuthGuard";

/**
 * @description : 마이 페이지
 *
 * @author : 장윤수
 * @update : 2023-09-17,
 * @version 1.2.0, 헤더 컴포넌트 자식요소로 이동
 * @see None,
 */
const MyPage = () => {
  return (
    <AuthGuard>
      <UserPageComponent />
    </AuthGuard>
  );
};

export default MyPage;
