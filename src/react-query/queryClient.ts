import { QueryClient } from "@tanstack/react-query";

function queryErrorHandler(error: unknown): void {
  const title =
    error instanceof Error ? error.message : "서버 연결에 실패하였습니다.";
}

// to satisfy typescript until this file has uncommented contents
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      onError: queryErrorHandler,
    },
  },
});
