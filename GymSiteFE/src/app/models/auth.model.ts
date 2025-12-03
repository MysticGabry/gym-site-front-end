export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

// Response dopo Login/Register (contiene il JWT)
export interface AuthResponse {
  token: string;
}
