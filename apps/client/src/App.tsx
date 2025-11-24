import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router';
import { PlayersPage } from './pages/players';
import { Layout } from './components/layout';
import { ThemeProvider } from '@/components/theme-provider';
import { RankingPage } from './pages/ranking';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<div>Home</div>} />
            <Route path="/players" element={<PlayersPage />} />
            <Route path="/ranking" element={<RankingPage />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
