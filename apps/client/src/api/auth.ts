const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const signIn = async (username: string, password: string) => {
  const response = await fetch(`${API_BASE_URL}/v1/public/auth/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Sign in failed: ${text}`);
  }

  const data = await response.json();

  localStorage.setItem('accessToken', data.accessToken);

  return data;
};
