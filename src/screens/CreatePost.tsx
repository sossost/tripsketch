import {
  FlatList,
  Keyboard,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import styled from "styled-components/native";

import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Calendar from "react-native-calendars/src/calendar";
import MapView, { Marker, UrlTile } from "react-native-maps";
import CitySearch from "../components/post/CitySearch";

type Suggestion = {
  place_id: string;
  display_name: string;
  lat: string;
  lon: string;
};

/** 여행 글쓰기 */
const CreatePost = () => {
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
  const [isPublic, setIsPublic] = useState(true);

  /** 공개 설정 핸들러 */
  const publicToggleHandler = () => {
    setIsPublic(true);
  };

  /** 비공개 설정 핸들러 */
  const privateToggleHandler = () => {
    setIsPublic(false);
  };

  /** 여행기간 선택 핸들러 */
  const periodSelectHandler = () => {
    console.log("여행 기간 선택");
  };

  type MapPressEvent = {
    nativeEvent: {
      coordinate: {
        latitude: number;
        longitude: number;
      };
    };
  };

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
          display_name: `${
            data.address.city
              ? data.address.city
              : data.address.town
              ? data.address.town
              : data.address.road
              ? data.address.road
              : "알 수 없는 곳"
          }, ${data.address.country}`,
          latitude: Number(latitude),
          longitude: Number(longitude),
        })
      );
  };

  useEffect(() => {
    setQuery(address.display_name);
  }, [address]);

  const handleInputChange = (value: string) => {
    setQuery(value);
    searchCity(value);
  };

  const searchCity = (cityName: string) => {
    if (cityName.length > 2) {
      fetch(
        `https://nominatim.openstreetmap.org/search?city=${cityName}&format=json`
      )
        .then((response) => response.json())
        .then((data) => {
          setSuggestions(data);
          console.log(data);
        });
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: Suggestion) => {
    console.log("Selected city:", suggestion);
    // Handle the selected city, e.g., navigation or fetching more details
  };

  // react-native-calendars 패키지를 사용하여 달력을 구현 --------

  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState(new Date());

  const showStartDatepicker = () => {
    setShowStartDatePicker(true);
  };

  const showEndDatepicker = () => {
    setShowEndDatePicker(true);
  };

  const handleStartDateChange = (date: Date) => {
    setShowStartDatePicker(false);
    if (date) {
      setSelectedStartDate(date);
    }
  };

  const handleEndDateChange = (date: Date) => {
    setShowEndDatePicker(false);
    if (date) {
      setSelectedEndDate(date);
    }
  };

  // -----------

  return (
    <>
      <Container>
        <HeaderInfo>
          {/* 여행기간 */}

          <InfoBox>
            <CalendarIcon name="calendar" />
            <Title>여행기간</Title>
            {/* <ContentText>2023.03.03 ~ 2023.04.02</ContentText> */}
            <ContentText onPress={showStartDatepicker}>
              {selectedStartDate.toLocaleDateString()}
            </ContentText>
            <ContentText onPress={showEndDatepicker}>
              {selectedEndDate.toLocaleDateString()}
            </ContentText>
            {/* <SelectButton onPress={showDatepicker}> */}
            {/* <SelectButton onPress={periodSelectHandler}> */}
            {/* <SelectText>선택</SelectText> */}
            {/* </SelectButton> */}
          </InfoBox>

          {/* {showStartDatePicker && (
            <DateTimePicker
              value={selectedStartDate}
              mode="date"
              display="calendar"
              onChange={handleStartDateChange}
            />
          )}
          {showEndDatePicker && (
            <DateTimePicker
              value={selectedEndDate}
              mode="date"
              display="calendar"
              onChange={handleEndDateChange}
            />
          )} */}

          {showStartDatePicker && (
            <DateTimePickerModal
              isVisible={true}
              mode="date"
              date={selectedStartDate}
              onCancel={() => setShowStartDatePicker(false)}
              onConfirm={handleStartDateChange}
            />
          )}

          {showEndDatePicker && (
            <DateTimePickerModal
              isVisible={true}
              mode="date"
              date={selectedEndDate}
              onCancel={() => setShowEndDatePicker(false)}
              onConfirm={handleEndDateChange}
            />
          )}
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
