import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router";
import { PlayersPage } from "./pages/Players";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PlayersPage />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
