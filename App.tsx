import RootStack from "./src/navigation/RootStack";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App() {
  <QueryClientProvider client={queryClient}>
    return <RootStack />;
  </QueryClientProvider>;
}
