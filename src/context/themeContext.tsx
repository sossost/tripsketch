import { ReactNode } from "react";
import { ThemeProvider } from "styled-components";

const theme = {
  mainBlue: "#73BBFB",
  subBlue: "#167DD8",
  mainFont: "#414141",
  subFont: "#6F6F6F",
  lightGrey: "#D9D9D9",

  // 여기에 추가적으로 사용할 색상들을 정의
};

type Props = {
  children: ReactNode;
};

function StyledTheme({ children }: Props) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export default StyledTheme;
