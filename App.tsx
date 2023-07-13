import RootStack from "./src/navigation/RootStack";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SplashScreen from "./src/components/common/SplashScreen";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <SplashScreen></SplashScreen>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
