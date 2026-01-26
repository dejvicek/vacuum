import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router';
import { SignupPage } from './SignupPage';
import { AuthProvider } from '../../contexts/AuthContext';
import { authApi } from '../../api/auth';
import { tokenStorage } from '../../api/auth/token-storage';

jest.mock('@/api/auth');
jest.mock('@/api/auth/token-storage');

const mockNavigate = jest.fn();
jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: () => mockNavigate,
}));

const renderSignupPage = () => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        <SignupPage />
      </AuthProvider>
    </BrowserRouter>
  );
};

describe('SignupPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (tokenStorage.getToken as jest.Mock).mockReturnValue(null);
    (tokenStorage.getUser as jest.Mock).mockReturnValue(null);
  });

  it('renders signup form', () => {
    renderSignupPage();

    expect(screen.getByText('auth.signup.title')).toBeInTheDocument();
    expect(screen.getByLabelText('auth.fields.username')).toBeInTheDocument();
    expect(screen.getByLabelText('auth.fields.password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /auth.signup.submit/i })).toBeInTheDocument();
  });

  it('validates username minimum length', async () => {
    const user = userEvent.setup();
    renderSignupPage();

    const usernameInput = screen.getByLabelText('auth.fields.username');
    const passwordInput = screen.getByLabelText('auth.fields.password');
    const submitButton = screen.getByRole('button', { name: /auth.signup.submit/i });

    await user.type(usernameInput, 'ab');
    await user.type(passwordInput, 'password123');
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('auth.validation.usernameMin')).toBeInTheDocument();
    });

    expect(authApi.signup).not.toHaveBeenCalled();
  });

  it('validates username format', async () => {
    const user = userEvent.setup();
    renderSignupPage();

    const usernameInput = screen.getByLabelText('auth.fields.username');
    const passwordInput = screen.getByLabelText('auth.fields.password');
    const submitButton = screen.getByRole('button', { name: /auth.signup.submit/i });

    await user.type(usernameInput, 'User123');
    await user.type(passwordInput, 'password123');
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('auth.validation.usernameFormat')).toBeInTheDocument();
    });

    expect(authApi.signup).not.toHaveBeenCalled();
  });

  it('validates password minimum length', async () => {
    const user = userEvent.setup();
    renderSignupPage();

    const usernameInput = screen.getByLabelText('auth.fields.username');
    const passwordInput = screen.getByLabelText('auth.fields.password');
    const submitButton = screen.getByRole('button', { name: /auth.signup.submit/i });

    await user.type(usernameInput, 'testuser');
    await user.type(passwordInput, 'short');
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('auth.validation.passwordMin')).toBeInTheDocument();
    });

    expect(authApi.signup).not.toHaveBeenCalled();
  });

  it('submits form with valid credentials', async () => {
    const user = userEvent.setup();
    const mockResponse = {
      accessToken: 'mock-token',
      user: { id: 1, username: 'newuser' },
    };
    (authApi.signup as jest.Mock).mockResolvedValue(mockResponse);

    renderSignupPage();

    const usernameInput = screen.getByLabelText('auth.fields.username');
    const passwordInput = screen.getByLabelText('auth.fields.password');
    const submitButton = screen.getByRole('button', { name: /auth.signup.submit/i });

    await user.type(usernameInput, 'newuser');
    await user.type(passwordInput, 'password123');
    await user.click(submitButton);

    await waitFor(() => {
      expect(authApi.signup).toHaveBeenCalledWith({
        username: 'newuser',
        password: 'password123',
      });
    });
  });

  it('displays error message on failed signup', async () => {
    const user = userEvent.setup();
    const errorMessage = 'Username already taken';
    (authApi.signup as jest.Mock).mockRejectedValue(new Error(errorMessage));

    renderSignupPage();

    const usernameInput = screen.getByLabelText('auth.fields.username');
    const passwordInput = screen.getByLabelText('auth.fields.password');
    const submitButton = screen.getByRole('button', { name: /auth.signup.submit/i });

    await user.type(usernameInput, 'testuser');
    await user.type(passwordInput, 'password123');
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });

  it('disables form during submission', async () => {
    const user = userEvent.setup();
    (authApi.signup as jest.Mock).mockImplementation(() => new Promise((resolve) => setTimeout(resolve, 100)));

    renderSignupPage();

    const usernameInput = screen.getByLabelText('auth.fields.username');
    const passwordInput = screen.getByLabelText('auth.fields.password');
    const submitButton = screen.getByRole('button', { name: /auth.signup.submit/i });

    await user.type(usernameInput, 'newuser');
    await user.type(passwordInput, 'password123');
    await user.click(submitButton);

    expect(submitButton).toBeDisabled();
    expect(usernameInput).toBeDisabled();
    expect(passwordInput).toBeDisabled();
  });

  it('shows login link', () => {
    renderSignupPage();

    const loginLink = screen.getByText('auth.signup.loginLink');
    expect(loginLink).toBeInTheDocument();
    expect(loginLink.closest('a')).toHaveAttribute('href', '/login');
  });
});
