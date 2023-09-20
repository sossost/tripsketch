type resetStateProps = {
  setQuery: (value: string) => void;
  setMapViewOn: (value: boolean) => void;
  setLocationName: (value: string) => void;
  setShowModal: (value: boolean) => void;
  setMarkedDates: (value: Record<string, any>) => void;
  setSelectedDates: (value: string[]) => void;
  setStartDate: (value: string | null) => void;
  setEndDate: (value: string | null) => void;
  setImage: (value: string[]) => void;
  setTitle: (value: string) => void;
  setContent: (value: string) => void;
  setHashtag: (value: string) => void;
  setHashtagList: (value: string[]) => void;
  setIsPublic: (value: boolean) => void;
  setAddress: (value: {
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
  }) => void;
  setRegion: (value: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  }) => void;
  setIsAddressTouched: (value: boolean) => void;
  setSuggestions: (value: any) => void;
};

export const resetStateStorage = ({
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
}: resetStateProps) => {
  setQuery("");
  setMapViewOn(false);
  setLocationName("");
  setShowModal(false);
  setSuggestions([]);
  setMarkedDates({});
  setSelectedDates([]);
  setStartDate(null);
  setEndDate(null);
  setImage([]);
  setTitle("");
  setContent("");
  setHashtag("");
  setHashtagList([]);
  setIsPublic(true);
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
  setIsAddressTouched(false);
  setSuggestions([]);
};
