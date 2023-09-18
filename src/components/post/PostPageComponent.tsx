import {
  View,
  Modal,
  Text,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
  Alert,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Calendar, LocaleConfig } from "react-native-calendars";
import styled from "styled-components/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { colors } from "../../constants/color";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigation } from "../../types/RootStack";
import * as ImagePicker from "expo-image-picker";
import MapView, { Marker, UrlTile } from "react-native-maps";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";

import DeleteXbutton from "../../components/common/DeleteXbutton";
import usePostTrip from "./hooks/usePostTrip";
import useUpdatePost from "./hooks/useUpdatePost";
import Loading from "../UI/Loading";
import { resetStateStorage } from "./utils/resetStateStorage";

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

type ImagePickerResult = {
  cancelled: boolean;
  uri?: string;
  width?: number;
  height?: number;
  type?: string;
  exif?: { [key: string]: any };
  base64?: string;
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
const PostPageComponent: React.FC<PostPageProps> = ({
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
  // address 입력 여부를 관리하는 상태 추가
  const [isAddressTouched, setIsAddressTouched] = useState(false);
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
        alert(`중복된 태그입니다.`);
        setHashtag("");
      } else {
        setHashtagList([...hashtagList, hashtag]);
        setHashtag(""); // 입력 필드를 초기화
      }
    } else if (hashtagList.length === maxTagCount) {
      alert(`최대 태그 개수는 ${maxTagCount}개입니다.`);
      setHashtag("");
    } else {
      alert("태그를 입력해주세요.");
    }
  };

  // 해시태그 삭제 핸들러
  const deleteHashtagHandler = (deleteTag: string) => {
    const updatedList = hashtagList.filter((item) => item !== deleteTag);
    setHashtagList(updatedList);
  };

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
          countryCode: data.address.country_code,
          address: data.address.country,
          municipality: data.address.province,
          name: data.name,
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
  }, [address, region]);

  // 선택 클릭 시 MAP 열기 -> 선택 클릭 시 위치 초기화
  const selectAdressMap = () => {
    setMapViewOn(!mapViewOn);
    setAddress({
      countryCode: "",
      address: "",
      municipality: "",
      name: "",
      country: "",
      city: "",
      town: "",
      road: "",
      display_name: "",
      latitude: 0,
      longitude: 0,
    });
    setRegion({
      latitude: 37.5665,
      longitude: 126.978,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    });
    setIsSearchLoading(false);
    setSuggestions([]);
  };

  /** 입력에 따라 도시를 찾는 핸들러 */
  const handleInputChange = async (value: string) => {
    setQuery(value);
    await searchCity(value);
  };

  // 도시 검색 로딩 상태 저장
  const [isSearchLoading, setIsSearchLoading] = useState(false);

  /** 도시 검색 */
  const searchCity = async (cityName: string) => {
    if (cityName.length > 1) {
      setIsSearchLoading(true);
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?city=${cityName}&format=json`
        );
        const data = await response.json();
        setSuggestions(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsSearchLoading(false);
      }
    } else {
      setSuggestions([]);
      setIsSearchLoading(false);
    }
  };

  /** 선택한 도시 받아오는 핸들러 */
  const handleSuggestionClick = async (suggestion: Suggestion) => {
    setTimeout(() => {
      fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${suggestion.lat}&lon=${suggestion.lon}&zoom=18&addressdetails=1`
      )
        .then((response) => response.json())
        .then((data) =>
          setAddress({
            countryCode: data.address.country_code,
            address: data.address.country,
            municipality: data.address.province,
            name: data.name,
            country: data.address.country,
            city: data.address.city,
            town: data.address.town,
            road: data.address.road,
            display_name: data.display_name,
            latitude: Number(suggestion.lat),
            longitude: Number(suggestion.lon),
          })
        );

      setSuggestions([]);
      setRegion({
        latitude: Number(suggestion.lat),
        longitude: Number(suggestion.lon),
        latitudeDelta: 0.5,
        longitudeDelta: 0.5,
      });
    }, 1000); // 1초 후에 실행
  };

  const selectLocationHandler = (query: string) => {
    setIsAddressTouched(true);
    validateAddress(addressCountry);
    setLocationName(query);
    setMapViewOn(false);
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
          if (asset.width > 960) {
            const compressedUri = await manipulateAsync(
              asset.uri,
              [{ resize: { width: 1080 } }],
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

  const cancelPost = () => {
    Alert.alert("알림", "작성을 취소하고 이전 페이지로 돌아가시겠습니까?", [
      {
        text: "계속 작성할래요",
        style: "cancel",
      },
      {
        text: "네!",
        onPress: () => {
          resetState();
          navigation.goBack();
        },
      },
    ]),
      { cancelable: false };
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
            <ContentText onPress={selectAdressMap}>
              {query === "" ? "선택" : locationName}
            </ContentText>
          </InfoBox>
          <View style={{ marginBottom: 10, paddingLeft: 28 }}>
            {errors.address !== "" && isAddressTouched ? (
              <ValidationText>{errors.address}</ValidationText>
            ) : null}
          </View>
        </HeaderInfo>
        {mapViewOn && (
          <MapOverlay height={windowHeight}>
            <SelectLocation>
              <SelectLocationUpper>
                <View></View>
                <TouchableOpacity
                  onPress={() => {
                    setMapViewOn(false);
                    setQuery(""); // query 초기화
                  }}
                >
                  <Text>╳</Text>
                </TouchableOpacity>
              </SelectLocationUpper>
              <SelectLocationUpperBottom>
                <LocationInput
                  value={query}
                  onChangeText={handleInputChange}
                  placeholder="도시 이름을 입력해주세요."
                />
                <FontAwesome
                  name="check"
                  size={24}
                  color="#73bbfb"
                  onPress={() => selectLocationHandler(query)}
                />
                {query && query.length === 0 ? (
                  <></>
                ) : suggestions.length > 0 ? (
                  isSearchLoading ? (
                    <Loading /> // 로딩 중 메시지 표시
                  ) : (
                    <LocationSuggestions>
                      <ScrollView>
                        {suggestions.map((e) => {
                          return (
                            <TouchableWithoutFeedback
                              style={{
                                width: "100%",
                                height: 50,
                                backgroundColor: "white",
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: 10,
                                marginTop: 10,
                              }}
                              onPress={(event) => {
                                event.stopPropagation(); // 이벤트 전파 중단
                                handleSuggestionClick(e);
                              }}
                            >
                              <LocationSuggestionsFields>
                                <LocationSuggestionsTexts>
                                  {e.display_name}
                                </LocationSuggestionsTexts>
                              </LocationSuggestionsFields>
                            </TouchableWithoutFeedback>
                          );
                        })}
                      </ScrollView>
                    </LocationSuggestions>
                  )
                ) : (
                  <></>
                )}
              </SelectLocationUpperBottom>

              <SelectLocationMiddle>
                {suggestions.length > 0 ? (
                  <MapViewOverlay></MapViewOverlay>
                ) : null}
                <MapView
                  style={{
                    width: "100%",
                    zIndex: 5,
                    position: "absolute",
                    height: 500,
                  }}
                  region={region}
                  onRegionChangeComplete={(region) => setRegion(region)}
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
          </MapOverlay>
        )}

        <ScrollView>
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
                <ImageInnerContainer>
                  <Image
                    key={index}
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

const ModalContainer = styled.View`
  flex: 1;
  align-items: center;
  background-color: #d4eff6;
  padding-top: 45%;
`;

const MapViewOverlay = styled.View`
  position: absolute;
  top: 0;
  width: 100%;
  height: 500px;
  background-color: rgba(20, 20, 20, 0.3);
  z-index: 6;
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

/** 달력 아이콘 */
const CalendarIcon = styled(Feather)`
  font-size: 25px;
  color: #73bbfb;
  margin-right: 5px;
`;

const CloseButton = styled.TouchableOpacity`
  position: absolute;
  top: 10px;
  right: 10px;
`;

const CloseIcon = styled(Feather)`
  font-size: 28px;
  color: #73bbfb;
  margin-right: 5px;
`;

/** 여행지 아이콘 */
const MapIcon = styled(FontAwesome5)`
  font-size: 25px;
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
  width: 70%;
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
  padding: 15px 12px;
  font-size: 16px;
  border: 1.2px solid #e8e8e8;
  border-radius: 5px;
  margin-top: 12px;
  margin-bottom: 12px;
  color: #6f6f6f;
`;

const LocationInput = styled.TextInput`
  padding: 10px 10px;
  height: 45px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  width: 70%;
  z-index: 20;

  color: #6f6f6f;
`;

/** 여행 내용 TextInput */
const ContentInput = styled.TextInput<ContentInputProps>`
  height: 300px;
  padding: 15px 12px;
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
  background-color: ${colors.primary};
  border-radius: 5px;
  text-align: center;
  padding: 5px 7px;
`;

const PickImageButtonText = styled.Text`
  color: ${colors.white};
  text-align: center;
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

const MapOverlay = styled.View<ViewProps>`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: ${(props) => props.height}px;
  top: 0;
  z-index: 1;
`;

const SelectLocation = styled.View`
  background-color: white;
  top: 10%;
  left: 0;
  position: absolute;
  width: 90%;
  height: 350px;
  color: white;
  border-radius: 10px;
  margin: 20px;
  font-size: 15px;
  z-index: 3;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
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
  background-color: white;
  z-index: 10;
`;

const LocationSuggestions = styled.View`
  margin: 13px;
  margin-top: 20px;
  background-color: white;
  width: 100%;
  height: 160px;
  position: absolute;
  z-index: 20;
  top: 150%;
  border-radius: 20px;
  overflow: hidden;
  padding: 10px;
`;

const LocationSuggestionsFields = styled.View`
  background-color: transparent;
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
  height: 250px;
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

export default PostPageComponent;
