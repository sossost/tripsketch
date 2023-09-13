import { ComponentProps, Suspense } from "react";
import ErrorBoundary, { ErrorBoundaryProps } from "react-native-error-boundary";
import ErrorFallback from "../UI/ErrorFallback";

import Loading from "../UI/Loading";

interface AsyncBoundaryProps {
  children: React.ReactNode;
  suspenseFallback?: ComponentProps<typeof Suspense>["fallback"];
  errorFallback?: ErrorBoundaryProps["FallbackComponent"];
}

/**
 * @description : 비동기 로직 바운더리 컴포넌트
 *
 * @param suspenseFallback : 로딩시 보여줄 폴백 컴포넌트
 * @param errorFallback : 에러시 보여줄 폴백 컴포넌트
 *
 * @author : 장윤수
 * @update : 2023-09-14,
 * @version 1.0.0, 비동기 로직 바운더리 컴포넌트 생성 //
 * @see None,
 */
const AsyncBoundary = ({
  children,
  suspenseFallback = <Loading />,
  errorFallback = ErrorFallback,
}: AsyncBoundaryProps) => {
  return (
    <ErrorBoundary FallbackComponent={errorFallback}>
      <Suspense fallback={suspenseFallback}>{children}</Suspense>
    </ErrorBoundary>
  );
};

export default AsyncBoundary;
