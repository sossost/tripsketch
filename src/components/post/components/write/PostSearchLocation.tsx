import styled from "styled-components/native";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useEffect } from "react";
import MapView, { Marker, UrlTile } from "react-native-maps";
import Loading from "../../../UI/Loading";
import { colors } from "@constants/color";

type Suggestion = {
  place_id: string;
  display_name: string;
  lat: string;
  lon: string;
};

type MapPressEvent = {
  nativeEvent: {
    coordinate: {
      latitude: number;
      longitude: number;
    };
  };
};

interface ViewProps {
  height?: number;
}

// 여행지 불러오기 상태 관리 Props
interface PostSearchLocationProps {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  suggestions: Suggestion[];
  setSuggestions: React.Dispatch<React.SetStateAction<Suggestion[]>>;
  mapViewOn: boolean;
  setMapViewOn: React.Dispatch<React.SetStateAction<boolean>>;
  locationName: string;
  setLocationName: React.Dispatch<React.SetStateAction<string>>;
  address: {
    countryCode: string;
    address: string;
    municipality: string;
    name: string;
    country: string;
    city: string;
    town: string;
    road: string;
    display_name: string;
    latitude: number;
    longitude: number;
  };
  setAddress: React.Dispatch<
    React.SetStateAction<{
      countryCode: string;
      address: string;
      municipality: string;
      name: string;
      country: string;
      city: string;
      town: string;
      road: string;
      display_name: string;
      latitude: number;
      longitude: number;
    }>
  >;
  region: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
  setRegion: React.Dispatch<
    React.SetStateAction<{
      latitude: number;
      longitude: number;
      latitudeDelta: number;
      longitudeDelta: number;
    }>
  >;
  isSearchLoading: boolean;
  setIsSearchLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isAddressTouched: boolean;
  setIsAddressTouched: React.Dispatch<React.SetStateAction<boolean>>;
  addressCountry: string;
  validateAddress: (addressCountry: string) => void;
  errors: {
    title: string;
    content: string;
    address: string;
  };
}

const PostSearchLocation = ({
  query,
  setQuery,
  suggestions,
  setSuggestions,
  mapViewOn,
  setMapViewOn,
  locationName,
  setLocationName,
  address,
  setAddress,
  region,
  setRegion,
  isSearchLoading,
  setIsSearchLoading,
  isAddressTouched,
  setIsAddressTouched,
  addressCountry,
  validateAddress,
  errors,
}: PostSearchLocationProps) => {
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

  // 디바운스 시간
  const debounceTimeout = 300;
  let debounceTimer: NodeJS.Timeout;

  // 디바운싱 - 입력이 변경될 때마다 검색 요청을 지연시키는 함수
  const delayedSearch = (query: string) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      searchCity(query);
    }, debounceTimeout);
  };

  /** 입력에 따라 도시를 찾는 핸들러 */
  const handleInputChange = async (value: string) => {
    setQuery(value);
    await delayedSearch(value);
  };

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

  return (
    <LocationContainer>
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
      {mapViewOn && (
        <Modal transparent={true}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          ></View>
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
                color={colors.primary}
                onPress={() => selectLocationHandler(query)}
              />
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
                  height: 550,
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
              {query && query.length === 0 ? (
                <></>
              ) : suggestions.length > 0 ? (
                isSearchLoading ? (
                  <Loading />
                ) : (
                  <LocationSuggestions>
                    <FlatList
                      data={suggestions}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={({ item, index }) => (
                        <TouchableOpacity
                          style={{
                            width: "100%",
                            height: 37,
                            backgroundColor: "white",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 10,
                            marginTop: 10,
                          }}
                          onPress={(event) => {
                            event.stopPropagation(); // 이벤트 전파 중단
                            handleSuggestionClick(item); // 항목을 전달합니다.
                          }}
                        >
                          <LocationSuggestionsFields>
                            <LocationSuggestionsTexts>
                              {item.display_name}
                            </LocationSuggestionsTexts>
                          </LocationSuggestionsFields>
                        </TouchableOpacity>
                      )}
                    />
                  </LocationSuggestions>
                )
              ) : (
                <></>
              )}
            </SelectLocationMiddle>
            <SelectLocationLower></SelectLocationLower>
          </SelectLocation>
        </Modal>
      )}
    </LocationContainer>
  );
};

const LocationContainer = styled.View`
  width: 100%;
`;

const InfoBox = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 15px;
`;

/** 여행지 아이콘 */
const MapIcon = styled(FontAwesome5)`
  font-size: 22px;
  color: ${colors.primary};
  margin-left: 3px;
  margin-right: 9px;
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

const ValidationText = styled.Text`
  font-size: 12px;
  color: #999;
`;

//지도
const MapOverlay = styled.View<ViewProps>`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: ${(props) => props.height}px;
  top: 0;
  z-index: 4;
`;

const SelectLocation = styled.View`
  background-color: white;
  top: 10%;
  left: 0;
  position: absolute;
  width: 90%;
  height: 400px;
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

const LocationSuggestions = styled.View`
  margin-top: 10px;
  background-color: white;
  width: 95%;
  height: 160px;
  position: absolute;
  z-index: 20;
  top: 0px;
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
  height: 300px;
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

const MapViewOverlay = styled.View`
  position: absolute;
  top: 0;
  width: 100%;
  height: 500px;
  background-color: rgba(20, 20, 20, 0.3);
  z-index: 6;
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

export default PostSearchLocation;
