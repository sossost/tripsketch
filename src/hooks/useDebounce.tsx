import { useState, useEffect, SetStateAction } from "react";
import { debounce } from "lodash";

export const useDebounce = () => {
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

  return { searchQuery, setInput, input };
};
