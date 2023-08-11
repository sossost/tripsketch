import { useState, useEffect, SetStateAction } from "react";
import { debounce } from "lodash";
import { useQuery } from "@tanstack/react-query";

import SearchBar from "../components/UI/SearchBar";

export const usePostSearch = (variant: "인기순" | "최신순") => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [input, setInput] = useState<string>("");

  // 실시간 인풋 디바운싱하여 서치쿼리로 넘기는 함수
  const debounceInput = debounce(
    (value: SetStateAction<string>) => setSearchQuery(value),
    500
  );

  useEffect(() => {
    debounceInput(input);

    // 디바운스 취소 클린업 함수
    return debounceInput.cancel;
  }, [input, debounceInput]);

  // 쿼리키 정의
  const queryKey = [variant];

  // 팔로워 || 팔로잉 리스트 패치 쿼리함수
  const queryFn = () => {
    if (variant === "인기순") {
      return getPostListByPopularity(searchQuery);
    }
    if (variant === "최신순") {
      return getPostListByNewest(searchQuery);
    }
  };

  // users 기본값
  const fallback: User[] | undefined = [];

  const {
    data: users = fallback,
    isLoading,
    isError,
  } = useQuery<User[] | undefined>(queryKey, queryFn);

  const PostSearchBar = () => {
    return (
      <SearchBar
        placeholder="게시물 검색"
        searchQuery={input}
        setSearchQuery={(text) => setInput(text)}
      />
    );
  };
  return { PostSearchBar, users, isLoading, isError };
};
