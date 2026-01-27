import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router';
import { LoginPage } from './LoginPage';
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

const renderLoginPage = () => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        <LoginPage />
      </AuthProvider>
    </BrowserRouter>
  );
};

describe('LoginPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (tokenStorage.getToken as jest.Mock).mockReturnValue(null);
    (tokenStorage.getUser as jest.Mock).mockReturnValue(null);
  });

  it('renders login form', () => {
    renderLoginPage();

    expect(screen.getByText('auth.login.title')).toBeInTheDocument();
    expect(screen.getByLabelText('auth.fields.username')).toBeInTheDocument();
    expect(screen.getByLabelText('auth.fields.password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /auth.login.submit/i })).toBeInTheDocument();
  });

  it('validates username minimum length', async () => {
    const user = userEvent.setup();
    renderLoginPage();

    const usernameInput = screen.getByLabelText('auth.fields.username');
    const passwordInput = screen.getByLabelText('auth.fields.password');
    const submitButton = screen.getByRole('button', { name: /auth.login.submit/i });

    await user.type(usernameInput, 'ab');
    await user.type(passwordInput, 'password123');
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('auth.validation.usernameMin')).toBeInTheDocument();
    });

    expect(authApi.signin).not.toHaveBeenCalled();
  });

  it('validates username maximum length', async () => {
    const user = userEvent.setup();
    renderLoginPage();

    const usernameInput = screen.getByLabelText('auth.fields.username');
    const passwordInput = screen.getByLabelText('auth.fields.password');
    const submitButton = screen.getByRole('button', { name: /auth.login.submit/i });

    await user.type(usernameInput, 'verylongusername');
    await user.type(passwordInput, 'password123');
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('auth.validation.usernameMax')).toBeInTheDocument();
    });

    expect(authApi.signin).not.toHaveBeenCalled();
  });

  it('validates password minimum length', async () => {
    const user = userEvent.setup();
    renderLoginPage();

    const usernameInput = screen.getByLabelText('auth.fields.username');
    const passwordInput = screen.getByLabelText('auth.fields.password');
    const submitButton = screen.getByRole('button', { name: /auth.login.submit/i });

    await user.type(usernameInput, 'testuser');
    await user.type(passwordInput, 'short');
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('auth.validation.passwordMin')).toBeInTheDocument();
    });

    expect(authApi.signin).not.toHaveBeenCalled();
  });

  it('submits form with valid credentials', async () => {
    const user = userEvent.setup();
    const mockResponse = {
      accessToken: 'mock-token',
      user: { id: 1, username: 'testuser' },
    };
    (authApi.signin as jest.Mock).mockResolvedValue(mockResponse);

    renderLoginPage();

    const usernameInput = screen.getByLabelText('auth.fields.username');
    const passwordInput = screen.getByLabelText('auth.fields.password');
    const submitButton = screen.getByRole('button', { name: /auth.login.submit/i });

    await user.type(usernameInput, 'testuser');
    await user.type(passwordInput, 'password123');
    await user.click(submitButton);

    await waitFor(() => {
      expect(authApi.signin).toHaveBeenCalledWith({
        username: 'testuser',
        password: 'password123',
      });
    });
  });

  it('displays error message on failed login', async () => {
    const user = userEvent.setup();
    const errorMessage = 'Invalid credentials';
    (authApi.signin as jest.Mock).mockRejectedValue(new Error(errorMessage));

    renderLoginPage();

    const usernameInput = screen.getByLabelText('auth.fields.username');
    const passwordInput = screen.getByLabelText('auth.fields.password');
    const submitButton = screen.getByRole('button', { name: /auth.login.submit/i });

    await user.type(usernameInput, 'testuser');
    await user.type(passwordInput, 'wrongpassword');
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });

  it('disables form during submission', async () => {
    const user = userEvent.setup();
    (authApi.signin as jest.Mock).mockImplementation(() => new Promise((resolve) => setTimeout(resolve, 100)));

    renderLoginPage();

    const usernameInput = screen.getByLabelText('auth.fields.username');
    const passwordInput = screen.getByLabelText('auth.fields.password');
    const submitButton = screen.getByRole('button', { name: /auth.login.submit/i });

    await user.type(usernameInput, 'testuser');
    await user.type(passwordInput, 'password123');
    await user.click(submitButton);

    expect(submitButton).toBeDisabled();
    expect(usernameInput).toBeDisabled();
    expect(passwordInput).toBeDisabled();
  });

  it('shows signup link', () => {
    renderLoginPage();

    const signupLink = screen.getByText('auth.login.signupLink');
    expect(signupLink).toBeInTheDocument();
    expect(signupLink.closest('a')).toHaveAttribute('href', '/signup');
  });
});
