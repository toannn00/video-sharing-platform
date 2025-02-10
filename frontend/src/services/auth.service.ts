import { AxiosError } from "axios";
import http from "../http";
import User from "../types/user.type";
import { message } from "antd";

interface AuthResponse {
  token: string;
  email: string;
}

class AuthService {
  private static readonly TOKEN_KEY = "token";
  private static readonly EMAIL_KEY = "email";

  async login(credentials: User): Promise<boolean> {
    try {
      const response = await http.post<AuthResponse>(
        "/auth/login",
        credentials
      );

      if (response.data?.token) {
        this.setAuthData(response.data.token, credentials.email);
        message.success("Login Successful");
        return true;
      }

      return false;
    } catch (error) {
      this.handleLoginError(error as AxiosError);
      return false;
    }
  }

  logout(): void {
    this.clearAuthData();
  }

  private setAuthData(token: string, email: string): void {
    localStorage.setItem(AuthService.TOKEN_KEY, token);
    localStorage.setItem(AuthService.EMAIL_KEY, email);
  }

  private clearAuthData(): void {
    localStorage.removeItem(AuthService.TOKEN_KEY);
    localStorage.setItem(AuthService.EMAIL_KEY, "");
  }

  private handleLoginError(error: AxiosError): void {
    this.clearAuthData();
    message.error("Invalid email or password");
    console.error("Login error:", error.response);
  }
}

export default new AuthService();
