import { Keyboard, ScrollView, Text, View } from "react-native";
import styled from "styled-components/native";
import PropTypes from "prop-types";

import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";

/** 여행 글쓰기 */
const CreatePost = () => {
  //   const hideKeyboard = () => {
  //     Keyboard.dismiss();
  //   };

  const [isPublic, setIsPublic] = useState(true);

  const publicToggleHandler = () => {
    setIsPublic(true);
  };

  const privateToggleHandler = () => {
    setIsPublic(false);
  };
  return (
    <>
      <Container>
        <HeaderInfo>
          {/* 여행기간 */}
          <InfoBox>
            <CalendarIcon name="calendar" />
            <Title>여행기간</Title>
            <ContentText>2023.03.03 ~ 2023.04.02</ContentText>
            <SelectButton>
              <SelectText>선택</SelectText>
            </SelectButton>
          </InfoBox>

          {/* 여행지 */}
          <InfoBox>
            <MapIcon name="map-marker-alt" />
            <Title>여행지</Title>
            <ContentText>아이슬란드</ContentText>
            <SelectButton>
              <SelectText>선택</SelectText>
            </SelectButton>
          </InfoBox>
        </HeaderInfo>

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
  color: #6f6f6f;
  margin-right: 10px;
  font-size: 15px;
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

export default CreatePost;
