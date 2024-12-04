import React from "react";

interface getOSMProps {
  latitude: number;
  longitude: number;
}

export const getOSMWithMarkerHTML: React.FC<getOSMProps> = ({
  latitude,
  longitude,
}) => {
  function getOSMWithMarkerHTML() {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <title>OpenStreetMap with Marker</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
          <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
          <style>
            body, html, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video {
              border: 0;
              margin: 0;
              padding: 0;
            }
          </style>
        </head>
        <body>
          <div id="map" style="height: 100vh;"></div>
          <script>
            const map = L.map('map').setView([${latitude}, ${longitude}], 15);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              maxZoom: 19,
            }).addTo(map);

            // 클릭한 위치에 새로운 마커 추가
            map.on('click', function(event) {
              if (currentMarker) {
                // 이전 마커가 있는 경우, 해당 마커를 제거
                map.removeLayer(currentMarker);
              }
              
              // 새로운 마커 추가
              const marker = L.marker(event.latlng).addTo(map);
              currentMarker = marker; // currentMarker를 업데이트
              
              const data = { lat: event.latlng.lat, lng: event.latlng.lng };
              window.ReactNativeWebView.postMessage(JSON.stringify(data));
  
            });
            
            // 초기 마커 추가
            currentMarker = L.marker([${latitude}, ${longitude}]).addTo(map);

          </script>
        </body>
      </html>
    `;
  }

  return getOSMWithMarkerHTML();
};
