import RootStack from "./src/navigation/RootStack";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SplashScreen from "./src/components/common/SplashScreen";
import StyledTheme from "./src/context/themeContext";
import { StatusBar } from "expo-status-bar";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <StyledTheme>
         <SafeAreaProvider>
           <StatusBar style="auto" />
           <RootStack />
         </SafeAreaProvider>
      </StyledTheme>
    </QueryClientProvider>
  );
}
