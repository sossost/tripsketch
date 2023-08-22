import { View, Modal, Text, ScrollView, TouchableOpacity } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import styled from "styled-components/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import MapView, { Marker, UrlTile } from "react-native-maps";

type Suggestion = {
  place_id: string;
  display_name: string;
  lat: string;
  lon: string;
};

/** 여행 글쓰기 */

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

/** 여행 글쓰기 */
const CreatePost: React.FC = () => {
  const [isPublic, setIsPublic] = useState(true);
  const [query, setQuery] = useState<string>("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [mapViewOn, setMapViewOn] = useState(false);
  const [address, setAddress] = useState({
    country: "",
    city: "",
    town: "",
    road: "",
    display_name: "",
    latitude: 0,
    longitude: 0,
  });

  const [showModal, setShowModal] = useState(false);
  const [markedDates, setMarkedDates] = useState<RangeKeyDict>({});
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);

  // 230728

  /** 공개 설정 핸들러 */
  const publicToggleHandler = () => {
    setIsPublic(true);
  };

  /** 비공개 설정 핸들러 */
  const privateToggleHandler = () => {
    setIsPublic(false);
  };

  /** 달력 모달 닫는 핸들러 */
  const modalCloseHandler = () => {
    setShowModal(false);
  };

  type MapPressEvent = {
    nativeEvent: {
      coordinate: {
        latitude: number;
        longitude: number;
      };
    };
  };

  /** 지도클릭시 도시 선택하는 핸들러 */
  const handlePressLocation = async (event: MapPressEvent) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
    )
      .then((response) => response.json())
      .then((data) =>
        setAddress({
          country: data.address.country,
          city: data.address.city,
          town: data.address.town,
          road: data.address.road,
          display_name: data.display_name,
          latitude: Number(latitude),
          longitude: Number(longitude),
        })
      );
  };

  useEffect(() => {
    setQuery(address.display_name);
  }, [address]);

  /** 입력에 따라 도시를 찾는 핸들러 */

  const handleInputChange = (value: string) => {
    setQuery(value);
    searchCity(value);
  };

  /** 도시 검색 */
  const searchCity = (cityName: string) => {
    if (cityName.length > 1) {
      fetch(
        `https://nominatim.openstreetmap.org/search?city=${cityName}&format=json`
      )
        .then((response) => response.json())
        .then((data) => {
          setSuggestions(data);
          console.log(suggestions);
        });
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = async (suggestion: Suggestion) => {
    fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${suggestion.lat}&lon=${suggestion.lon}&zoom=18&addressdetails=1`
    )
      .then((response) => response.json())
      .then((data) =>
        setAddress({
          country: data.address.country,
          city: data.address.city,
          town: data.address.town,
          road: data.address.road,
          display_name: data.display_name,
          latitude: Number(suggestion.lat),
          longitude: Number(suggestion.lon),
        })
      );
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
    <>
      <Container>
        <HeaderInfo>
          {/* 여행기간 */}

          <InfoBox>
            <CalendarIcon name="calendar" />
            <Title>여행기간</Title>

            <ContentText>
              <Text onPress={() => setShowModal(true)}>
                {startDate === null
                  ? "날짜를 선택해주세요."
                  : `${startDate} ~ ${endDate}`}
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
                  {/* <CloseButton onPress={modalCloseHandler}>
                    <CloseIcon name="x" />
                  </CloseButton> */}
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

          {/* 여행지 */}
          <InfoBox>
            <MapIcon name="map-marker-alt" />
            <Title>여행지</Title>
            <ContentText onPress={() => setMapViewOn(!mapViewOn)}>
              선택
            </ContentText>
          </InfoBox>
        </HeaderInfo>
        {mapViewOn && (
          <SelectLocation>
            <SelectLocationUpper>
              <View></View>

              <TouchableOpacity onPress={() => setMapViewOn(false)}>
                <Text>╳</Text>
              </TouchableOpacity>
            </SelectLocationUpper>
            <SelectLocationUpperBottom>
              <LocationInput
                value={query}
                onChangeText={handleInputChange}
                placeholder="도시 이름을 입력해주세요."
              />
              <FontAwesome name="check" size={24} color="#73bbfb" />
              {query.length === 0 ? (
                <></>
              ) : suggestions.length > 0 ? (
                <LocationSuggestions>
                  {suggestions.map((e) => {
                    return (
                      <TouchableOpacity
                        style={{
                          width: "100%",
                          height: 50,
                          backgroundColor: "white",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: 10,
                          marginTop: 10,
                        }}
                      >
                        <LocationSuggestionsFields>
                          <LocationSuggestionsTexts>
                            {e.display_name}
                          </LocationSuggestionsTexts>
                        </LocationSuggestionsFields>
                      </TouchableOpacity>
                    );
                  })}
                </LocationSuggestions>
              ) : (
                <></>
              )}
            </SelectLocationUpperBottom>

            <SelectLocationMiddle>
              <MapView
                style={{
                  width: "100%",
                  zIndex: 5,
                  position: "absolute",
                  height: 500,
                }}
                onPress={handlePressLocation}
              >
                <UrlTile
                  urlTemplate="http://c.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  maximumZ={19}
                />
                <Marker
                  coordinate={{
                    latitude: address.latitude,
                    longitude: address.longitude,
                  }}
                  title="My Marker"
                  description="Some description"
                />
              </MapView>
            </SelectLocationMiddle>
            <SelectLocationLower></SelectLocationLower>
          </SelectLocation>
        )}

        <ScrollView>
          <BodyInfo>
            {/* 제목 */}
            <Title>제목</Title>
            <TitleInput placeholder="여행기의 제목을 작성해주세요" />

            {/* 내용 */}
            <ContentPhotoBox>
              <Title>내용</Title>
              <PhotoIcon name="photo" />
            </ContentPhotoBox>
            {/* <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
          > */}
            <ContentInput
              multiline
              placeholder="내용을 자유롭게 작성해주세요"
              //   returnKeyType="done"
              //   onSubmitEditing={hideKeyboard}
            />
            {/* </ScrollView> */}

            {/* 태그 */}
            <Title>태그</Title>
            <TitleInput placeholder="ex) #프랑스, #해외여행" />

            {/* 공개 설정 */}
            <Title>공개 설정</Title>
            <VisibilityBox>
              <VisibilityButton
                isSelected={isPublic}
                onPress={publicToggleHandler}
              >
                <ButtonText isSelected={isPublic}>전체공개</ButtonText>
              </VisibilityButton>
              <VisibilityButton
                isSelected={!isPublic}
                onPress={privateToggleHandler}
              >
                <ButtonText isSelected={!isPublic}>비공개</ButtonText>
              </VisibilityButton>
            </VisibilityBox>
          </BodyInfo>

          <BottomInfo>
            <ActionButton cancel={true}>
              <ActionButtonText cancel={true}>취소</ActionButtonText>
            </ActionButton>
            <ActionButton cancel={false}>
              <ActionButtonText cancel={false}>등록</ActionButtonText>
            </ActionButton>
          </BottomInfo>
        </ScrollView>
      </Container>
    </>
  );
};

/** 전체 감싸는 container */
const Container = styled.View`
  background-color: white;
  height: 100%;
  padding: 15px 0;
`;

const ModalContainer = styled.View`
  flex: 1;
  align-items: center;
  background-color: #d4eff6;
  padding-top: 45%;
`;

/** 여행기간, 여행지 감싸는 View */
const HeaderInfo = styled.View`
  padding: 0 20px;
  border-bottom-width: 1px;
  border-bottom-color: #e8e8e8;
  margin-bottom: 15px;
`;

/** 제목, 내용, 태그, 공개설정 감싸는 View */
const BodyInfo = styled.View`
  padding: 0 20px;
`;

/** 여행기간 */
const InfoBox = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 15px;
`;

/** 주제 Text */
const Title = styled.Text`
  font-size: 17px;
  font-weight: 600;
  color: #73bbfb;
  margin-right: 8px;
`;

/** 달력 아이콘 */
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

/** 여행지 아이콘 */
const MapIcon = styled(FontAwesome5)`
  font-size: 28px;
  color: #73bbfb;
  margin-left: 3px;
  margin-right: 9px;
`;

/** 선택 Button */
const SelectButton = styled.TouchableOpacity`
  width: 42px;
  height: 25px;
  background-color: #73bbfb;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
`;

/** 내용 Text */
const ContentText = styled.Text`
  color: #73bbfb;
  margin-right: 10px;
  font-size: 16px;
  font-style: italic;
  text-decoration: underline #73bbfb;
`;

/** 선택 Text */
const SelectText = styled.Text`
  font-size: 15px;
  color: #ffffff;
`;

/** 사진 첨부 아이콘 */
const PhotoIcon = styled(FontAwesome)`
  color: #73bbfb;
  font-size: 28px;
  margin-right: 20px;
`;

/** 내용, 사진 업로드 묶는 View */
const ContentPhotoBox = styled.View`
  flex-direction: row;
  align-items: center;
`;

/** 제목 TextInput */
const TitleInput = styled.TextInput`
  padding: 15px 12px;
  font-size: 16px;
  border: 1.2px solid #e8e8e8;
  border-radius: 5px;
  margin-top: 10px;
  margin-bottom: 15px;
  color: #6f6f6f;
`;

const LocationInput = styled.TextInput`
  padding: 10px 10px;
  height: 45px;
  font-size: 18px;
  border: none;
  border-radius: 5px;
  width: 70%;
  z-index: 20;

  color: #6f6f6f;
`;

/** 여행 내용 TextInput */
const ContentInput = styled.TextInput`
  height: 300px;
  padding: 15px 12px;
  font-size: 16px;
  border: 1.2px solid #e8e8e8;
  border-radius: 5px;
  margin-top: 10px;
  margin-bottom: 15px;
  color: #6f6f6f;
`;

/** 전체 공개, 비공개 설정 묶는 View */
const VisibilityBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
`;

/** 전체 공개 버튼 */
const VisibilityButton = styled.TouchableOpacity<{ isSelected: boolean }>`
  width: 170px;
  height: 37px;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (props.isSelected ? "#73bbfb" : "#ffffff")};
  border-color: #73bbfb;
  border-width: 1px;
`;

/** 전체 공개 텍스트 */
const ButtonText = styled.Text<{ isSelected: boolean }>`
  color: ${(props) => (props.isSelected ? "#ffffff" : "#73bbfb")};
  font-size: 16px;
`;

/** 취소, 등록 버튼 감싸는 View */
const BottomInfo = styled.View`
  padding: 0 20px;
  border-top-width: 1px;
  border-top-color: #e8e8e8;
  margin-top: 15px;
  flex-direction: row;
  justify-content: flex-end;
  padding-top: 15px;
`;

/** 취소, 등록 버튼 */
const ActionButton = styled.TouchableOpacity<{ cancel: boolean }>`
  width: 80px;
  height: 40px;
  background-color: ${(props) => (props.cancel ? "#ffffff" : "#73bbfb")};
  border-color: #73bbfb;
  border-width: 1px;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
`;

/** 취소, 등록 텍스트 */
const ActionButtonText = styled.Text<{ cancel: boolean }>`
  color: ${(props) => (props.cancel ? "#73bbfb" : "#ffffff")};
  font-size: 16px;
`;

const SelectLocation = styled.View`
  background-color: white;
  shadow-color: "#111";
  shadow-opacity: 0.1;
  shadow-radius: 8rem;
  shadow-offset-x: 50px;
  top: 10%;
  left: 0;
  position: absolute;
  width: 90%;
  height: 300px;
  color: white;
  border-radius: 30px;
  margin: 20px;
  font-size: 15px;
  z-index: 3;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  border-width: 0.5px;
  border-color: #dddddd;
  overflow: hidden;
`;

const SelectLocationUpper = styled.View`
  width: 100%;
  height: 50px;
  color: white;
  padding: 0 20px;
  font-size: 16px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const SelectLocationUpperBottom = styled.View`
  width: 100%;
  height: 50px;
  color: white;

  padding: 10px;
  padding-right: 20px;

  font-size: 16px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  backgroundcolor: white;
  z-index: 10;
`;

const LocationSuggestions = styled.View`
  margin: 13px;
  margin-top: 10px;
  background-color: white;
  width: 100%;
  height: auto;
  position: absolute;
  z-index: 20;
  top: 150%;
  display: flex;
  flex-direction: column;
  justify-contents: flex-start;
  align-items: flex-start;
  border-radius: 20px;
  overflow: hidden;
  padding: 10px;
  shadow-color: black;
  shadow-opacity: 0.2;
  shadow-radius: 5px;
  border: solid;
  border-width: 0.5px;
  border-color: #dddddd;
`;

const LocationSuggestionsFields = styled.View`
  background-color: white;
  width: 100%;
  height: 50px;
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;

  align-items: flex-start;
  padding: 13px;
`;

const LocationSuggestionsTexts = styled.Text`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  align-items: flex-start;
  font-size: 16px;
`;

const SelectLocationMiddle = styled.View`
  background-color: gray;
  width: 100%;
  height: 220px;
  color: white;
  font-size: 16px;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
  border-width: 0.5px;
  border-color: #cccccc;
`;

const SelectLocationLower = styled.View`
  width: 100%;
  height: 100px;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin: 10px;
  padding: 10px;
`;

const SelectLocationButtonText = styled.Text`
  font-size: 16px;
  color: white;
`;

export default CreatePost;
