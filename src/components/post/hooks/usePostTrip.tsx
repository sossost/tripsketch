import { useCreatePost } from "../../../hooks/usePostQuery";
import { useNavigation } from "@react-navigation/native";
import { StackNavigation } from "../../../types/RootStack";
import Toast from "react-native-toast-message";

type PostDataProps = {
  image: string[];
  title: string;
  content: string;
  address: {
    address: string;
    city: string;
    country: string;
    countryCode: string;
    display_name: string;
    latitude: number;
    longitude: number;
    municipality: string;
    name: string;
    road: string;
    town: string;
  };
  startDate: string;
  endDate: string;
  isPublic: boolean;
  hashtagList: string[];
  resetState: () => void;
};

const usePostTrip = ({
  image,
  title,
  content,
  address,
  startDate,
  endDate,
  isPublic,
  hashtagList,
  resetState,
}: PostDataProps) => {
  const createPostMutation = useCreatePost();
  const navigation = useNavigation<StackNavigation>();

  const submitPost = async () => {
    try {
      const formData: any = new FormData();

      for (let index = 0; index < image.length; index++) {
        const item = image[index];
        formData.append("images", {
          uri: item,
          name: `image${index}.jpg`,
          type: "multipart/form-data",
        });
      }

      formData.append("title", title);
      formData.append("content", content);
      formData.append("location", address.country);
      formData.append("startedAt", startDate);
      formData.append("endAt", endDate);
      formData.append("isPublic", isPublic);
      formData.append("latitude", address.latitude);
      formData.append("longitude", address.longitude);
      formData.append("countryCode", address.countryCode);
      formData.append("country", address.country);
      formData.append("city", address.city);
      formData.append("municipality", address.municipality);
      formData.append("name", address.name);
      formData.append("displayName", address.display_name);
      formData.append("road", address.road);
      formData.append("address", address.address);
      formData.append("etc", hashtagList);
      formData.append("public", true);

      await createPostMutation.mutateAsync(formData);
      Toast.show({ type: "success", text1: "게시글 생성이 완료되었습니다." });
      resetState(); // 상태변수 초기화
      navigation.goBack();
    } catch (error) {
      console.error("게시물 생성 중 오류 발생:", error);
      Toast.show({ type: "error", text1: "게시글 생성을 실패하였습니다." });
    }
  };

  return submitPost;
};

export default usePostTrip;
