import React, { useState } from "react";
import { styled } from "styled-components/native";
import MapView, { Marker } from "react-native-maps";

type Region = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

type PostMapProps = {
  latitude: number;
  longitude: number;
};

const PostViewMap = ({ latitude, longitude }: PostMapProps) => {
  const [region, setRegion] = useState<Region>({
    latitude: latitude,
    longitude: longitude,
    latitudeDelta: 0.03,
    longitudeDelta: 0.03,
  });

  return (
    <MapViewContainer>
      <MapView style={{ width: "100%", height: 140 }} region={region}>
        <Marker
          coordinate={{
            latitude: latitude,
            longitude: longitude,
          }}
        />
      </MapView>
    </MapViewContainer>
  );
};

const MapViewContainer = styled.View`
  flex: 1;
`;

export default PostViewMap;
