let _accessToken: string | null = null;
let _refreshToken: string | null = null;

export function setJwtToken(token: string) {
  _accessToken = token;
  localStorage.setItem('accessToken', token);
}

export function getJwtToken(): string | null {
  if (!_accessToken) {
    _accessToken = localStorage.getItem('accessToken');
  }
  return _accessToken;
}

export function setRefreshToken(token: string) {
  _refreshToken = token;
  localStorage.setItem('refreshToken', token);
}

export function getRefreshToken(): string | null {
  if (!_refreshToken) {
    _refreshToken = localStorage.getItem('refreshToken');
  }
  return _refreshToken;
}

// Clears both tokens from memory & local storage
export function clearTokens() {
  _accessToken = null;
  _refreshToken = null;
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');

}