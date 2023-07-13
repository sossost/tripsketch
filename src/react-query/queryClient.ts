import { QueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

function queryErrorHandler(error: unknown): void {
  const title =
    error instanceof Error ? error.message : "서버 연결에 실패하였습니다.";

  toast(title);
}

// to satisfy typescript until this file has uncommented contents
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      onError: queryErrorHandler,
    },
  },
});
