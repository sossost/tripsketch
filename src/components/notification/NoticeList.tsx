import { styled } from "styled-components/native";
import { Dimensions } from "react-native";
import { colors } from "@constants/color";
const { width: SCREEN_WIDTH } = Dimensions.get("window");

const NoticeList = () => {
  return (
    <NoticeCardLayout>
      <NoticeTitle>휴면 처리 관련 공지</NoticeTitle>
      <NoticeContent>
        최종 로그인 후 <UnderlinedText>24개월</UnderlinedText>동안 재접속이 없을
        경우 계정이 삭제되고 활동 기록(게시글, 댓글 등)은 자동 삭제되지
        않습니다.
      </NoticeContent>
      <NoticeWarning>
        * 해당 내용을 숙지하지 않아 발생하는 모든 책임은 유저 본인에게 있습니다.
      </NoticeWarning>
    </NoticeCardLayout>
  );
};

const NoticeCardLayout = styled.TouchableOpacity`
  display: flex;
  width: ${SCREEN_WIDTH - 44}px;
  background-color: white;
  border-radius: 30px;
  margin-bottom: 30px;
  margin-top: 10px;
  padding: 25px 30px;
  shadow-color: #000;
  shadow-opacity: 0.25;
  shadow-radius: 1.5px;
  shadow-offset: 0px 0px;
  elevation: 2;
  justify-content: center;
  align-items: center;
`;

const NoticeTitle = styled.Text`
  font-weight: 600;
  font-size: 18px;
  margin-bottom: 15px;
  color: ${colors.secondary};
`;

const NoticeContent = styled.Text`
  font-weight: 400;
  font-size: 15px;
  line-height: 23px;
  padding: 0 5px;
  color: ${colors.mainFont};
`;

const NoticeWarning = styled.Text`
  padding: 0 10px;
  font-weight: 400;
  font-size: 15px;
  line-height: 23px;
  color: ${colors.subFont};
  margin-top: 10px;
`;

const UnderlinedText = styled.Text`
  font-weight: 400;
  font-size: 15px;
  padding: 0 5px;
  color: ${colors.mainFont};
  text-decoration-line: underline;
`;

export default NoticeList;
