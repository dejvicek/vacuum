const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

type Params = { path: string; options?: RequestInit };

export const fetchApi = async <T>({ path, options = {} }: Params): Promise<T> => {
  const token = localStorage.getItem('accessToken');

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`API error: ${text}`);
  }

  return response.json();
};
