import { View, Modal, Text, TouchableOpacity } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { colors } from "@constants/color";

LocaleConfig.locales["ko"] = {
  monthNames: [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ],
  monthNamesShort: [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ],
  dayNames: ["일", "월", "화", "수", "목", "금", "토"],
  dayNamesShort: ["일", "월", "화", "수", "목", "금", "토"],
  today: "오늘",
};
LocaleConfig.defaultLocale = "ko";

/** 날짜 정보 Type */
interface RangeKeyDict {
  [key: string]: {
    startingDay?: boolean;
    endingDay?: boolean;
    color: string;
    selected?: boolean;
  };
}

interface CalenderProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  markedDates: RangeKeyDict;
  setMarkedDates: React.Dispatch<React.SetStateAction<RangeKeyDict>>;
  selectedDates: string[];
  setSelectedDates: React.Dispatch<React.SetStateAction<string[]>>;
  startDate: string | null;
  setStartDate: React.Dispatch<React.SetStateAction<string | null>>;
  endDate: string | null;
  setEndDate: React.Dispatch<React.SetStateAction<string | null>>;
}

const PostCalender = ({
  showModal,
  setShowModal,
  markedDates,
  setMarkedDates,
  selectedDates,
  setSelectedDates,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}: CalenderProps) => {
  /** 달력 모달 닫는 핸들러 */
  const modalCloseHandler = () => {
    setShowModal(false);
  };

  // react-native-calendars 패키지를 사용하여 달력을 구현 --------
  /** 날짜 클릭 핸들러 */
  const dayPressHandler = (day: { dateString: string }) => {
    if (selectedDates.length === 0) {
      setSelectedDates([day.dateString]);
      setMarkedDates({ [day.dateString]: { color: "lightblue" } });
    } else if (selectedDates.length === 1) {
      const startDate = selectedDates[0];
      const endDate = day.dateString;
      const sortedDates = [startDate, endDate].sort();

      const newMarkedDates: RangeKeyDict = {
        [sortedDates[0]]: { startingDay: true, color: "lightblue" },
        [sortedDates[1]]: { endingDay: true, color: "lightblue" },
      };

      const rangeDates = getRangeDates(sortedDates[0], sortedDates[1]);
      Object.keys(rangeDates).forEach((date) => {
        if (date !== sortedDates[0] && date !== sortedDates[1]) {
          newMarkedDates[date] = { color: "lightblue" };
        }
      });

      setMarkedDates(newMarkedDates);
      setSelectedDates(sortedDates);
      setStartDate(sortedDates[0]);
      setEndDate(sortedDates[1]);
    } else if (selectedDates.length >= 2) {
      setSelectedDates([day.dateString]);
      setMarkedDates({ [day.dateString]: { color: "lightblue" } });
      setStartDate(null);
      setEndDate(null);
    }
  };

  /** 사이 날짜 구하는 함수 */
  const getRangeDates = (start: string, end: string) => {
    const rangeDates: RangeKeyDict = {};
    const currentDate = new Date(start);
    while (currentDate <= new Date(end)) {
      rangeDates[currentDate.toISOString().split("T")[0]] = {
        color: "lightblue",
      };
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return rangeDates;
  };

  return (
    <InfoBox>
      <CalendarIcon name="calendar" />
      <Title>여행기간</Title>

      <ContentText>
        <Text onPress={() => setShowModal(true)}>
          {startDate === null ? "선택" : `${startDate} ~ ${endDate}`}
        </Text>
      </ContentText>

      {/* 날짜 선택 클릭시 달력에서 여행 기간 선택 */}
      {showModal && (
        <Modal visible={showModal} animationType="fade">
          <ModalContainer>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                width: "80%",
                height: "65", // 레이블들이 고정된 높이를 가지도록 추가
                borderRadius: 10,
                backgroundColor: "white",
                paddingVertical: 5,
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  flex: 1,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: "#6F6F6F",
                    marginBottom: "2%",
                  }}
                >
                  시작일
                </Text>
                <Text style={{ fontSize: 16, color: "#414141" }}>
                  {startDate}
                </Text>
              </View>
              <View
                style={{
                  width: 1,
                  height: "70%",
                  backgroundColor: "#e3e3e3",
                }}
              ></View>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  flex: 1,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: "#6F6F6F",
                    marginBottom: "2%",
                  }}
                >
                  종료일
                </Text>
                <Text style={{ fontSize: 16, color: "#414141" }}>
                  {endDate}
                </Text>
              </View>
            </View>

            <Calendar
              style={{
                borderRadius: 20,
                marginTop: 20,
                width: "90%",
                aspectRatio: 0.85,
              }}
              onDayPress={dayPressHandler}
              markingType={"period"}
              markedDates={markedDates}
            />
            <TouchableOpacity
              style={{
                width: "30%",
                height: "6%",
                backgroundColor: "white",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 10,
                marginTop: 10,
              }}
              onPress={modalCloseHandler}
            >
              <Text style={{ fontSize: 18 }}>선택하기</Text>
            </TouchableOpacity>
          </ModalContainer>
        </Modal>
      )}
    </InfoBox>
  );
};

export default PostCalender;

/** 여행기간 */
const InfoBox = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 15px;
`;

/** 달력 아이콘 */
const CalendarIcon = styled(Feather)`
  font-size: 22px;
  color: ${colors.primary};
  margin-right: 5px;
`;

/** 주제 Text */
const Title = styled.Text`
  font-size: 17px;
  font-weight: 600;
  color: ${colors.primary};
  margin-right: 8px;
`;

/** 내용 Text */
const ContentText = styled.Text`
  width: 70%;
  color: ${colors.primary};
  margin-right: 10px;
  font-size: 16px;
  text-decoration: underline ${colors.primary};
`;

const ModalContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${colors.pastel};
`;
