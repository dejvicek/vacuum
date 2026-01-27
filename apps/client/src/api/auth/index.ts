import type { AuthRequestDto, SignupRequestDto, AuthResponseDto, User } from './types';
import { tokenStorage } from './token-storage';

const API_BASE_URL = 'http://localhost:3000/api';

class AuthApiError extends Error {
  constructor(
    message: string,
    public readonly statusCode?: number
  ) {
    super(message);
    this.name = 'AuthApiError';
  }
}

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({
      message: response.statusText,
    }));
    throw new AuthApiError(errorData.message || 'An error occurred', response.status);
  }
  return response.json();
};

export const authApi = {
  signin: async (payload: AuthRequestDto): Promise<AuthResponseDto> => {
    const response = await fetch(`${API_BASE_URL}/v1/public/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await handleResponse<AuthResponseDto>(response);
    tokenStorage.setToken(data.accessToken);
    tokenStorage.setUser(data.user);
    return data;
  },

  signup: async (payload: SignupRequestDto): Promise<AuthResponseDto> => {
    const response = await fetch(`${API_BASE_URL}/v1/public/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await handleResponse<AuthResponseDto>(response);
    tokenStorage.setToken(data.accessToken);
    tokenStorage.setUser(data.user);
    return data;
  },

  getProfile: async (): Promise<{ user: User }> => {
    const token = tokenStorage.getToken();
    if (!token) {
      throw new AuthApiError('No authentication token found', 401);
    }

    const response = await fetch(`${API_BASE_URL}/v1/public/auth/profile`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    return handleResponse<{ user: User }>(response);
  },

  logout: (): void => {
    tokenStorage.clear();
  },
};

export { AuthApiError };
