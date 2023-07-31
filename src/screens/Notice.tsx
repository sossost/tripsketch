import React, { useState } from "react";
import { View, Modal, TouchableOpacity, Text, ScrollView } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";

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

/** 알림 페이지 */
const Notice: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [markedDates, setMarkedDates] = useState<RangeKeyDict>({});
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);

  /** 달력 모달 닫는 핸들러 */
  const modalCloseHandler = () => {
    setShowModal(false);
  };

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
    <View>
      <Container>
        <HeaderInfo>
          <InfoBox>
            <CalendarIcon name="calendar" />
            <Title>여행기간</Title>
            <ContentText>
              <Text>
                {startDate} ~ {endDate}
              </Text>
            </ContentText>
            <SelectButton onPress={() => setShowModal(true)}>
              <SelectText>선택</SelectText>
            </SelectButton>
          </InfoBox>
        </HeaderInfo>

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
                  height: 65, // 레이블들이 고정된 높이를 가지도록 추가
                  borderRadius: 10,
                  backgroundColor: "white",
                }}
              >
                {/* <Text>selectedDates : {selectedDates}</Text> */}
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
                      marginBottom: "3%",
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
                    alignItems: "center",
                    justifyContent: "center",
                    flex: 1,
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: "#6F6F6F",
                      marginBottom: "3%",
                    }}
                  >
                    종료일
                  </Text>
                  <Text style={{ fontSize: 16, color: "#414141" }}>
                    {endDate}
                  </Text>
                </View>
              </View>

              {/* 달력 모달 닫기 버튼 */}
              <CloseButton onPress={modalCloseHandler}>
                <CloseIcon name="x" />
              </CloseButton>
              <Calendar
                style={{
                  borderRadius: 20,
                  marginTop: 20,
                  width: "90%",
                  aspectRatio: 0.9,
                }}
                onDayPress={dayPressHandler}
                markingType={"period"}
                markedDates={markedDates}
              />
            </ModalContainer>
          </Modal>
        )}
      </Container>
    </View>
  );
};

const ModalContainer = styled.View`
  flex: 1;
  align-items: center;
  background-color: #d4eff6;
  padding-top: 45%;
`;

const Container = styled.View`
  background-color: white;
  height: 100%;
  padding: 15px 0;
`;

const HeaderInfo = styled.View`
  padding: 0 20px;
  border-bottom-width: 1px;
  border-bottom-color: #e8e8e8;
  margin-bottom: 15px;
`;

const InfoBox = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 15px;
`;

const Title = styled.Text`
  font-size: 17px;
  font-weight: 600;
  color: #73bbfb;
  margin-right: 8px;
`;

const CalendarIcon = styled(Feather)`
  font-size: 28px;
  color: #73bbfb;
  margin-right: 5px;
`;

const CloseButton = styled.TouchableOpacity`
  position: absolute;
  top: 190px;
  right: 10px;
`;

const CloseIcon = styled(Feather)`
  font-size: 28px;
  color: #73bbfb;
  margin-right: 5px;
`;

const SelectButton = styled.TouchableOpacity`
  width: 42px;
  height: 25px;
  background-color: #73bbfb;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
`;

const ContentText = styled.Text`
  color: #6f6f6f;
  margin-right: 10px;
  font-size: 15px;
`;

const SelectText = styled.Text`
  font-size: 15px;
  color: #ffffff;
`;

export default Notice;
