import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, Routes, Route } from 'react-router';
import { ProtectedRoute } from './ProtectedRoute';
import { AuthProvider } from '../contexts/AuthContext';
import { tokenStorage } from '../api/auth/token-storage';
import { authApi } from '../api/auth';

jest.mock('../api/auth');
jest.mock('../api/auth/token-storage');

const renderProtectedRoute = () => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<div>Login Page</div>} />
          <Route
            path="/protected"
            element={
              <ProtectedRoute>
                <div>Protected Content</div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

describe('ProtectedRoute', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    window.history.pushState({}, '', '/protected');
  });

  it('redirects to login when user is not authenticated', async () => {
    (tokenStorage.getToken as jest.Mock).mockReturnValue(null);
    (tokenStorage.getUser as jest.Mock).mockReturnValue(null);

    renderProtectedRoute();

    await screen.findByText('Login Page');
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
  });

  it('renders protected content when user is authenticated', async () => {
    const mockUser = { id: 1, username: 'testuser' };
    (tokenStorage.getToken as jest.Mock).mockReturnValue('mock-token');
    (tokenStorage.getUser as jest.Mock).mockReturnValue(mockUser);
    (authApi.getProfile as jest.Mock).mockResolvedValue({ user: mockUser });

    renderProtectedRoute();

    await screen.findByText('Protected Content');
    expect(screen.queryByText('Login Page')).not.toBeInTheDocument();
  });

  it('redirects to login when token is invalid', async () => {
    (tokenStorage.getToken as jest.Mock).mockReturnValue('invalid-token');
    (tokenStorage.getUser as jest.Mock).mockReturnValue({ id: 1, username: 'test' });
    (authApi.getProfile as jest.Mock).mockRejectedValue(new Error('Invalid token'));

    renderProtectedRoute();

    await screen.findByText('Login Page');
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
    expect(tokenStorage.clear).toHaveBeenCalled();
  });
});
