import { RegisterRequest, RegisterResponse } from 'server/api/auth/register';
import { LoginRequest, LoginResponse } from 'server/api/auth/login';

import HttpClient from './HttpClient';

class AuthHttpClient extends HttpClient {
  getBaseUrl(): string {
    return `${super.getBaseUrl()}/auth`;
  }

  async register(request: RegisterRequest, signal?: AbortSignal): Promise<RegisterResponse> {
    return this.post('/register', request, signal);
  }

  async logout(signal?: AbortSignal): Promise<void> {
    return this.post('/logout', signal);
  }

  async login(request: LoginRequest, signal?: AbortSignal): Promise<LoginResponse> {
    return this.post('/login', request, signal);
  }
}

export default new AuthHttpClient();
