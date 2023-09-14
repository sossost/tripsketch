import { ReactNode, createContext, useState } from "react";

export const FadeOutContext = createContext<fadeOutContextType>({
  fadeOut: false,
  setFadeOut: () => {},
});

interface fadeOutContextType {
  fadeOut: boolean;
  setFadeOut: (value: boolean) => void;
}

const FadeOutContextProvider = ({ children }: { children: ReactNode }) => {
  const [fadeOut, setFadeOut] = useState(false);

  return (
    <FadeOutContext.Provider value={{ fadeOut, setFadeOut }}>
      {children}
    </FadeOutContext.Provider>
  );
};

export default FadeOutContextProvider;
