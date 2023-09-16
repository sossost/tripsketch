import React, { ReactElement } from "react";

// 에러 처리 컴포넌트에 전달되는 오류 정보를 정의하는 타입
export type ErrorFallbackProps<ErrorType extends Error = Error> = {
  error: ErrorType;
  reset: (...args: unknown[]) => void;
};

// 에러 처리 컴포넌트의 타입 정의
export type ErrorFallbackType = <ErrorType extends Error>(
  props: ErrorFallbackProps<ErrorType>
) => JSX.Element;

// 에러 경계 컴포넌트의 속성 타입 정의
type Props = {
  errorFallback: ErrorFallbackType;
  children: ReactElement;
  resetQuery?: () => void;
  keys?: unknown[];
};

// 에러 경계 컴포넌트의 상태 타입 정의
type State = {
  hasError: boolean; // 오류가 발생했는지 여부
  error: Error | null; // 발생한 오류 객체
};

// 초기 상태 값
const initialState = { hasError: false, error: null };

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = initialState; // 초기 상태 설정
  }

  // 자식 컴포넌트에서 발생한 오류를 처리하는 메서드
  static getDerivedStateFromError(error: Error) {
    console.log("1 : " + error);
    return { hasError: true, error }; // 오류 상태를 설정
  }

  // 에러 바운더리 컴포넌트의 상태를 초기화하는 메서드
  resetErrorBoundary = () => {
    const { resetQuery } = this.props;
    resetQuery?.();
    this.setState(initialState);
  };

  changedArray = (
    prevArray: Array<unknown> = [],
    nextArray: Array<unknown> = []
  ) => {
    return (
      prevArray.length !== nextArray.length ||
      prevArray.some((item, index) => {
        return !Object.is(item, nextArray[index]);
      })
    );
  };

  componentDidUpdate(prevProps: Props, prevState: State) {
    const { error } = this.state;
    const { keys } = this.props;

    if (
      error !== null &&
      prevState.error !== null &&
      this.changedArray(prevProps.keys, keys)
    ) {
      this.resetErrorBoundary();
    }
  }

  render() {
    const { hasError, error } = this.state; // 상태 변수 추출
    const isErrExist = hasError && error !== null; // 오류 발생 여부 확인

    if (isErrExist)
      return this.props.errorFallback({
        error: error,
        reset: this.resetErrorBoundary,
      });
    return this.props.children;
  }
}

export default ErrorBoundary;
