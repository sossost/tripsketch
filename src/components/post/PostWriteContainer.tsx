import { Text, Image, Dimensions, Alert } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { FontAwesome } from "@expo/vector-icons";
import { colors } from "../../constants/color";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigation } from "../../types/RootStack";
import * as ImagePicker from "expo-image-picker";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";
import { resetStateStorage } from "./utils/resetStateStorage";

import DeleteXbutton from "../../components/common/DeleteXbutton";
import usePostTrip from "./hooks/usePostTrip";
import useUpdatePost from "./hooks/useUpdatePost";
import Loading from "../UI/Loading";
import PostCalender from "./components/write/PostCalendar";
import PostSearchLocation from "./components/write/PostSearchLocation";
import useDeleteAlert from "./hooks/useDeleteAlert";
import Header from "@components/UI/header/Header";
import CommonHeaderLeft from "@components/UI/header/HeaderLeft";

type Suggestion = {
  place_id: string;
  display_name: string;
  lat: string;
  lon: string;
};

type Region = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

/** 날짜 정보 Type */
interface RangeKeyDict {
  [key: string]: {
    startingDay?: boolean;
    endingDay?: boolean;
    color: string;
    selected?: boolean;
  };
}

/* TitleInput Type 추가 */
interface TitleInputProps {
  name: string;
}

/* ContentInput Type 추가 */
interface ContentInputProps {
  name: string;
}

interface PostPageProps {
  updateId?: string;
  updateData?: any;
}

interface ViewProps {
  height?: number;
}

/** 여행 글쓰기 */
const PostWriteContainer: React.FC<PostPageProps> = ({
  updateId,
  updateData,
}) => {
  const [query, setQuery] = useState<string>("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [mapViewOn, setMapViewOn] = useState(false);
  const [locationName, setLocationName] = useState(
    updateId ? updateData.hashtagInfo.displayName : ""
  );
  const [address, setAddress] = useState({
    countryCode: updateId ? updateData.hashtagInfo.countryCode : "",
    address: updateId ? updateData.hashtagInfo.address : "",
    municipality: updateId ? updateData.hashtagInfo.municipality : "",
    name: updateId ? updateData.hashtagInfo.name : "",
    country: updateId ? updateData.hashtagInfo.country : "",
    city: updateId ? updateData.hashtagInfo.city : "",
    town: "",
    road: updateId ? updateData.hashtagInfo.road : "",
    display_name: updateId ? updateData.hashtagInfo.displayName : "",
    latitude: updateId ? updateData.latitude : 0,
    longitude: updateId ? updateData.longitude : 0,
  });

  // Map 위치 저장 - default 한국 지도(서울)에서 시작하기
  const [region, setRegion] = useState<Region>({
    latitude: 37.5665,
    longitude: 126.978,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  const [showModal, setShowModal] = useState(false);
  const [markedDates, setMarkedDates] = useState<RangeKeyDict>({});
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<string | null>(
    updateId ? updateData.startedAt : null
  );
  const [endDate, setEndDate] = useState<string | null>(
    updateId ? updateData.endAt : null
  );
  const [image, setImage] = useState<string[]>(
    updateId ? updateData.images : []
  );
  const [deleteUpdateImage, setDeleteUpdateImage] = useState<string[]>([]);
  const [addUpdateImage, setAddUpdateImage] = useState<string[]>([]);
  const [title, setTitle] = useState<string>(updateId ? updateData.title : "");
  const [content, setContent] = useState<string>(
    updateId ? updateData.content : ""
  );
  const [hashtag, setHashtag] = useState<string>("");
  const [hashtagList, setHashtagList] = useState<string[]>(
    updateId ? updateData.hashtagInfo.etc : []
  );
  const [isPublic, setIsPublic] = useState<boolean>(
    updateId ? updateData.isPublic : true
  );
  const [errors, setErrors] = useState({
    title: "",
    content: "",
    address: "",
  });
  // address 입력 여부를 관리하는 상태
  const [isAddressTouched, setIsAddressTouched] = useState(false);

  // 도시 검색 로딩 상태 저장
  const [isSearchLoading, setIsSearchLoading] = useState(false);

  const navigation = useNavigation<StackNavigation>();

  const isCheckEmpty =
    Object.values(errors).every((error) => error === "") &&
    startDate !== null &&
    locationName !== "" &&
    title !== "" &&
    content !== "" &&
    image.length !== 0 &&
    address.country !== "";

  // title 유효성 검사
  const validateTitle = (title: string) => {
    let error = "";
    if (title.length > 0 && title.trim().length < 5) {
      error = "5글자 이상 입력하세요.";
      setErrors((prevState) => ({ ...prevState, title: error }));
    } else {
      setErrors((prevState) => ({ ...prevState, title: "" }));
    }
  };

  // content 유효성 검사
  const validateContent = (content: string) => {
    let error = "";
    if (content.length > 0 && content.trim().length < 5) {
      error = "5글자 이상 입력하세요.";
      setErrors((prevState) => ({ ...prevState, content: error }));
    } else {
      setErrors((prevState) => ({ ...prevState, content: "" }));
    }
  };

  // address 유효성 검사
  const addressCountry = address.country;
  const validateAddress = (addressCountry: string) => {
    let error = "";
    if (addressCountry === "") {
      error = "존재하지 않는 여행지입니다. 다시 선택해주세요.";
      setErrors((prevState) => ({ ...prevState, address: error }));
    } else {
      setErrors((prevState) => ({ ...prevState, address: "" }));
    }
  };

  // 상태변수 초기화
  const resetState = () =>
    resetStateStorage({
      setQuery,
      setMapViewOn,
      setLocationName,
      setShowModal,
      setSuggestions,
      setMarkedDates,
      setSelectedDates,
      setStartDate,
      setEndDate,
      setImage,
      setTitle,
      setContent,
      setHashtag,
      setHashtagList,
      setIsPublic,
      setAddress,
      setRegion,
      setIsAddressTouched,
    });

  // 입력 필드 값이 변경될 때 호출하는 함수
  const inputChangeHandler = (name: string, value: string) => {
    if (name === "title") {
      setTitle(value);
      validateTitle(value);
    } else if (name === "content") {
      setContent(value);
      validateContent(value);
    } else if (name === "hashtag") {
      setHashtag(value);
    }
  };

  // 해시태그 추가 핸들러
  const maxTagCount = 5;
  const addHashtagHandler = () => {
    if (hashtag.trim() !== "" && hashtagList.length < maxTagCount) {
      if (hashtagList.includes(hashtag)) {
        Alert.alert("알림", `중복된 태그입니다.`);
        setHashtag("");
      } else {
        setHashtagList([...hashtagList, hashtag]);
        setHashtag(""); // 입력 필드를 초기화
      }
    } else if (hashtagList.length === maxTagCount) {
      Alert.alert("알림", `최대 태그 개수는 ${maxTagCount}개입니다.`);
      setHashtag("");
    } else {
      Alert.alert("알림", "태그를 입력해주세요.");
    }
  };

  // 해시태그 삭제 핸들러
  const deleteHashtagHandler = (deleteTag: string) => {
    const updatedList = hashtagList.filter((item) => item !== deleteTag);
    setHashtagList(updatedList);
  };

  /** 공개 설정 핸들러 */
  const publicToggleHandler = () => {
    setIsPublic(true);
  };

  /** 비공개 설정 핸들러 */
  const privateToggleHandler = () => {
    setIsPublic(false);
  };

  /** 이미지 수 최대 10개로 제한 */
  const maxImageCount = 10;

  /** 화면 너비 가져오기  */
  const windowWidth = Dimensions.get("window").width - 40;
  const imageWidth = windowWidth * 0.19;

  /* 화면 높이 가져오기 */
  const windowHeight: number = Dimensions.get("window").height;

  // 이미지 업데이트 시 사용 - 기존 데이터 카피
  let copyImageData: string[] = [];
  if (updateId) {
    copyImageData = [...updateData.images];
  }

  const pickImage = async () => {
    // 이미지 초과 시 알림
    if (image.length >= maxImageCount) {
      alert(`이미 ${maxImageCount}장을 선택하셨습니다.`);
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: true,
      selectionLimit: maxImageCount,
    });

    if (!result.canceled) {
      const compressedUris = await Promise.all(
        result.assets.map(async (asset) => {
          // 이미지 압축을 수행
          if (asset.width >= 960) {
            const compressedUri = await manipulateAsync(
              asset.uri,
              [{ resize: { width: 960 } }],
              { compress: 0.8, format: SaveFormat.JPEG }
            );
            return compressedUri;
          } else {
            const compressedUri = await manipulateAsync(
              asset.uri,
              [{ resize: { width: 640 } }],
              { compress: 0.8, format: SaveFormat.JPEG }
            );
            return compressedUri;
          }
        })
      );

      const selectedUris = compressedUris.map((asset) => asset.uri);
      const newImages = [...image, ...selectedUris];

      if (newImages.length > maxImageCount) {
        alert(
          `이미지 선택 제한을 초과했습니다. 최대 ${maxImageCount}장을 선택할 수 있습니다.`
        );
      } else {
        setImage(newImages);
        if (updateId) {
          setAddUpdateImage(selectedUris);
        }
      }
    }
  };

  // 선택한 이미지 리스트에서 제거하기
  const deleteImage = (deleteImageUrl: string) => {
    const updatedImageList = image.filter((item) => item !== deleteImageUrl);
    const updatedModifyImageList = addUpdateImage.filter(
      (item) => item !== deleteImageUrl
    );
    setImage(updatedImageList);
    setAddUpdateImage(updatedModifyImageList);
    if (copyImageData.includes(deleteImageUrl)) {
      setDeleteUpdateImage([...deleteUpdateImage, deleteImageUrl]);
    }
  };

  const cancelPost = () => {
    const cancelAlertFunction = useDeleteAlert({
      clearRequest: resetState,
      backRequest: navigation,
      alertTitle: "작성을 취소하고 이전 페이지로 돌아가시겠습니까?",
      alertCancel: "계속 작성할래요.",
      alertOk: "네!",
    });
    cancelAlertFunction();
  };

  const postTripData = {
    id: updateId || "",
    image: !updateId ? image : addUpdateImage,
    title: title,
    content: content,
    address: address,
    startDate: startDate || "",
    endDate: endDate || "",
    isPublic: isPublic,
    hashtagList: hashtagList,
    resetState: resetState,
    deletedImageUrls: deleteUpdateImage,
  };

  const { submitPost, isLoading } = usePostTrip(postTripData);
  const { submitUpdatePost, isUpdateLoading } = useUpdatePost(postTripData);

  return (
    <>
      <Header
        left={<CommonHeaderLeft title={updateId ? "수정하기" : "작성하기"} />}
        style={{ paddingHorizontal: 20, paddingTop: 50, paddingBottom: 10 }}
      />
      <Container>
        {isLoading || isUpdateLoading ? (
          <LoadingPopup height={windowHeight}>
            <LoadingBox>
              <Loading />
            </LoadingBox>
          </LoadingPopup>
        ) : null}
        <HeaderInfo>
          {/* 여행기간 */}
          <PostCalender
            showModal={showModal}
            setShowModal={setShowModal}
            markedDates={markedDates}
            setMarkedDates={setMarkedDates}
            selectedDates={selectedDates}
            setSelectedDates={setSelectedDates}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
          />

          {/* 여행지 */}
          <PostSearchLocation
            query={query}
            setQuery={setQuery}
            suggestions={suggestions}
            setSuggestions={setSuggestions}
            mapViewOn={mapViewOn}
            setMapViewOn={setMapViewOn}
            locationName={locationName}
            setLocationName={setLocationName}
            address={address}
            setAddress={setAddress}
            region={region}
            setRegion={setRegion}
            isSearchLoading={isSearchLoading}
            setIsSearchLoading={setIsSearchLoading}
            isAddressTouched={isAddressTouched}
            setIsAddressTouched={setIsAddressTouched}
            addressCountry={addressCountry}
            validateAddress={validateAddress}
            errors={errors}
          />
        </HeaderInfo>

        <ScrollViewContainer>
          <BodyInfo>
            {/* 제목 */}
            <ValidateTitleContainer>
              <Title>제목</Title>
              <Text>
                {errors.title !== "" ? (
                  <ValidationText>{errors.title}</ValidationText>
                ) : null}
              </Text>
            </ValidateTitleContainer>
            <TitleInput
              name="title"
              value={title}
              onChangeText={(value) => inputChangeHandler("title", value)}
              placeholder="여행기의 제목을 작성해주세요"
            />

            {/* 내용 */}
            <ContentPhotoBox>
              <ValidateTitleContainer>
                <Title>내용</Title>
                <Text>
                  {errors.content !== "" ? (
                    <ValidationText>{errors.content}</ValidationText>
                  ) : null}
                </Text>
              </ValidateTitleContainer>
            </ContentPhotoBox>

            <ContentInput
              multiline
              placeholder="내용을 자유롭게 작성해주세요"
              name="content"
              value={content}
              onChangeText={(value) => inputChangeHandler("content", value)}
              style={{ textAlignVertical: "top" }}
            />

            {/* 이미지 업로드 */}
            <ImageTitleContainer>
              <Title>
                이미지 <ImageInnerText>* 최대 10장</ImageInnerText>
              </Title>
              <PickImageButton onPress={pickImage}>
                <PickImageButtonText>
                  <PhotoIcon name="photo" onPress={pickImage} />
                  <Text style={{ marginLeft: 10 }}> 추가</Text>
                </PickImageButtonText>
              </PickImageButton>
            </ImageTitleContainer>
            <ImageViewContainer imageCount={image.length}>
              {image.map((imageUri, index) => (
                <ImageInnerContainer key={index}>
                  <Image
                    source={{ uri: imageUri }}
                    style={{ width: imageWidth, height: imageWidth }}
                  />
                  <DeleteBox>
                    <DeleteXbutton
                      onPress={() => deleteImage(imageUri)}
                      color={"white"}
                    ></DeleteXbutton>
                  </DeleteBox>
                </ImageInnerContainer>
              ))}
            </ImageViewContainer>

            {/* 태그 */}
            <Title>태그</Title>
            <TagContainer>
              <TitleInput
                name="hashtag"
                value={hashtag}
                onChangeText={(value) => inputChangeHandler("hashtag", value)}
                placeholder="ex) 프랑스"
              />
              <TagSelectButton onPress={addHashtagHandler}>
                <Text>+</Text>
              </TagSelectButton>
            </TagContainer>
            {hashtagList && hashtagList.length > 0 ? (
              <TagList>
                {hashtagList.map((item, index) => (
                  <TagItem key={index}>
                    <TagItemText>{item}</TagItemText>
                    <DeleteXbutton onPress={() => deleteHashtagHandler(item)} />
                  </TagItem>
                ))}
              </TagList>
            ) : null}

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
            <ActionButton cancel={true} onPress={cancelPost}>
              <ActionButtonText cancel={true}>취소</ActionButtonText>
            </ActionButton>
            <ActionButton
              cancel={false}
              onPress={updateId ? submitUpdatePost : submitPost}
              disabled={!isCheckEmpty}
              style={{ opacity: isCheckEmpty ? 1 : 0.5 }}
            >
              <ActionButtonText cancel={false}>등록</ActionButtonText>
            </ActionButton>
          </BottomInfo>
        </ScrollViewContainer>
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

/* 로딩 팝업 */
const LoadingPopup = styled.View<ViewProps>`
  position: absolute;
  top: 0;
  width: 100%;
  height: ${(props) => props.height}px;
  background-color: rgba(20, 20, 20, 0.7);
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoadingBox = styled.View`
  width: 70%;
  height: 130px;
  background-color: #fff;
  border-radius: 5px;
  padding: 5px;
  display: flex;
`;

/** 여행기간, 여행지 감싸는 View */
const HeaderInfo = styled.View`
  padding: 0 20px;
  border-bottom-width: 1px;
  border-bottom-color: #e8e8e8;
  margin-bottom: 15px;
`;

/* 스크롤뷰 컨테이너 */
const ScrollViewContainer = styled.ScrollView`
  margin-bottom: 75px;
`;

/** 제목, 내용, 태그, 공개설정 감싸는 View */
const BodyInfo = styled.View`
  padding: 0 20px;
`;

/** 주제 Text */
const Title = styled.Text`
  font-size: 17px;
  font-weight: 600;
  color: ${colors.primary};
  margin-right: 8px;
  margin-top: 20px;
`;

/** Validation을 포함하는 주제 View */
const ValidateTitleContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
`;

const ValidationText = styled.Text`
  font-size: 12px;
  color: #999;
`;

/** 사진 첨부 아이콘 */
const PhotoIcon = styled(FontAwesome)`
  color: #fff;
  font-size: 12px;
`;

/** 내용, 사진 업로드 묶는 View */
const ContentPhotoBox = styled.View`
  flex-direction: row;
  align-items: center;
`;

/** 제목 TextInput */
const TitleInput = styled.TextInput<TitleInputProps>`
  padding: 10px 12px;
  font-size: 16px;
  border: 1.2px solid #e8e8e8;
  border-radius: 5px;
  margin-top: 12px;
  margin-bottom: 12px;
  color: #6f6f6f;
`;

/** 여행 내용 TextInput */
const ContentInput = styled.TextInput<ContentInputProps>`
  height: 300px;
  padding: 12px 12px;
  font-size: 16px;
  border: 1.2px solid #e8e8e8;
  border-radius: 5px;
  margin-top: 10px;
  margin-bottom: 15px;
  color: #6f6f6f;
`;

/* 이미지 업로드 */
const ImageTitleContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
`;

const ImageInnerText = styled.Text`
  font-size: 10px;
  color: #999;
`;

const ImageViewContainer = styled.View<{ imageCount: number }>`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: ${(props) =>
    props.imageCount === 5 || props.imageCount === 10
      ? "space-between"
      : "flex-start"};
  gap: 3px;
  margin: 10px 0px;
`;

const ImageInnerContainer = styled.View`
  position: relative;
`;

const DeleteBox = styled.View`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PickImageButton = styled.TouchableOpacity`
  width: 60px;
  height: 30px;
  background-color: ${colors.primary};
  border-radius: 5px;
  text-align: center;
  padding: 0px 7px;
`;

const PickImageButtonText = styled.Text`
  color: ${colors.white};
  text-align: center;
  line-height: 30px;
`;

/* Tag */
const TagContainer = styled.View`
  width: 100%;
  position: relative;
`;

const TagSelectButton = styled.TouchableOpacity`
  width: 28px;
  height: 28px;
  background-color: ${colors.lightGrey};
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 10px;
  top: 50%;
  margin-top: -14px;
`;

const TagList = styled.View`
  display: flex;
  flex-direction: row;
  gap: 3px;
  flex-wrap: wrap;

  margin-bottom: 15px;
`;
const TagItem = styled.View`
  background-color: #ececec;
  padding: 3px 3px 3px 7px;
  border-radius: 5px;

  display: flex;
  flex-direction: row;
  align-items: center;
`;

const TagItemText = styled.Text`
  color: #888;
  font-size: 13px;
  margin-right: 0px;
`;

/** 전체 공개, 비공개 설정 묶는 View */
const VisibilityBox = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
  gap: 3px;
`;

/** 전체 공개 버튼 */
const VisibilityButton = styled.TouchableOpacity<{ isSelected: boolean }>`
  width: 49.3%;
  height: 37px;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  background-color: ${(props) =>
    props.isSelected ? colors.primary : "#ffffff"};
  border-color: ${(props) => (props.isSelected ? colors.primary : "#ddd")};
  border-width: 1px;
`;

/** 전체 공개 텍스트 */
const ButtonText = styled.Text<{ isSelected: boolean }>`
  color: ${(props) => (props.isSelected ? "#ffffff" : "#999")};
  font-size: 16px;
`;

/** 취소, 등록 버튼 감싸는 View */
const BottomInfo = styled.View`
  padding: 0 20px;
  border-top-width: 1px;
  border-top-color: #e8e8e8;
  margin-top: 25px;
  flex-direction: row;
  justify-content: flex-end;
  padding-top: 25px;
  padding-bottom: 30px;
`;

/** 취소, 등록 버튼 */
const ActionButton = styled.TouchableOpacity<{ cancel: boolean }>`
  width: 80px;
  height: 40px;
  background-color: ${(props) => (props.cancel ? "#ffffff" : colors.primary)};
  border-color: ${colors.primary};
  border-width: 1px;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
`;

/** 취소, 등록 텍스트 */
const ActionButtonText = styled.Text<{ cancel: boolean }>`
  color: ${(props) => (props.cancel ? colors.primary : "#ffffff")};
  font-size: 16px;
`;

export default PostWriteContainer;
