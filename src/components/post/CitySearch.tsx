import React, { useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";

type Suggestion = {
  place_id: string;
  display_name: string;
  lat: string;
  lon: string;
};

const CitySearch = () => {
  const [query, setQuery] = useState<string>("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

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
        });
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: Suggestion) => {
    console.log("Selected city:", suggestion);
    // Handle the selected city, e.g., navigation or fetching more details
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          paddingHorizontal: 8,
        }}
        value={query}
        onChangeText={handleInputChange}
        placeholder="Enter city name..."
      />
      <FlatList
        data={suggestions}
        keyExtractor={(item) => item.place_id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleSuggestionClick(item)}>
            <Text style={{ padding: 8 }}>{item.display_name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default CitySearch;
