import RootStack from "./src/navigation/RootStack";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SafeAreaProvider } from "react-native-safe-area-context";
import StyledTheme from "./src/context/themeContext";
import { StatusBar } from "expo-status-bar";
import { RecoilRoot } from "recoil";

import NotificationProvider from "./src/context/notificationProvider";
import FadeOutContextProvider from "./src/context/fadeOutContext";

// LogBox.ignoreAllLogs(true);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      suspense: true,
      useErrorBoundary: true,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <StyledTheme>
          <SafeAreaProvider>
            <NotificationProvider>
              <FadeOutContextProvider>
                <StatusBar style="auto" />
                <RootStack />
              </FadeOutContextProvider>
            </NotificationProvider>
          </SafeAreaProvider>
        </StyledTheme>
      </RecoilRoot>
    </QueryClientProvider>
  );
}
