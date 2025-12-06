export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface AuthRequest {
  email?: string;
  password?: string;
}

export interface AuthResponse {
  token: string;
  role: string;
}
