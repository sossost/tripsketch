import { usePostUpdate } from "../../../hooks/usePostQuery";
import { useNavigation } from "@react-navigation/native";
import { StackNavigation } from "../../../types/RootStack";
import { useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { QUERY_KEY } from "@react-query/queryKey";

type PostDataProps = {
  id: string;
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
  deletedImageUrls: string[];
};

const useUpdatePost = ({
  id,
  image,
  title,
  content,
  address,
  startDate,
  endDate,
  isPublic,
  hashtagList,
  resetState,
  deletedImageUrls,
}: PostDataProps) => {
  const createPostUpdateMutation = usePostUpdate();
  const navigation = useNavigation<StackNavigation>();
  const queryClient = useQueryClient();
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);

  useEffect(() => {
    if (createPostUpdateMutation.isLoading) {
      // 데이터 전송 중일 때 isLoading 상태를 true로 설정
      setIsUpdateLoading(true);
      Toast.show({ type: "info", text1: "데이터 전송 중입니다." });
    } else {
      setIsUpdateLoading(false);
    }
  }, [createPostUpdateMutation.isLoading]);

  const submitUpdatePost = async () => {
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

      formData.append("id", id);
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
      formData.append("deletedImageUrls", deletedImageUrls);

      await createPostUpdateMutation.mutateAsync(formData);
      Toast.show({ type: "success", text1: "게시글 수정이 완료되었습니다." });
      queryClient.invalidateQueries(["postId"]);
      queryClient.invalidateQueries(["updatePost"]);
      queryClient.invalidateQueries(["postAndComment"]);
      queryClient.invalidateQueries([QUERY_KEY.CURRENT_USER]);
      queryClient.invalidateQueries([QUERY_KEY.POSTS]);
      resetState(); // 상태변수 초기화
      navigation.goBack();
    } catch (error) {
      console.error("게시물 수정 중 오류 발생:", error);
      Toast.show({ type: "error", text1: "게시글 수정을 실패하였습니다." });
    }
  };

  return { submitUpdatePost, isUpdateLoading };
};

export default useUpdatePost;
