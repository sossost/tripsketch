import React from "react";
import { styled } from "styled-components/native";
import { WebView } from "react-native-webview";
import { getOSMWithMarkerHTML } from "@utils/getOSMWithMarkerHTML";
import { WebViewSource } from "react-native-webview/lib/WebViewTypes";

type PostMapProps = {
  latitude: number;
  longitude: number;
};

const PostViewMap = ({ latitude, longitude }: PostMapProps) => {
  return (
    <MapViewContainer>
      <WebView
        source={
          {
            html: getOSMWithMarkerHTML({ latitude, longitude }),
          } as WebViewSource
        }
        style={{ flex: 1, height: 200 }}
      />
    </MapViewContainer>
  );
};

const MapViewContainer = styled.View`
  flex: 1;
`;

export default PostViewMap;
