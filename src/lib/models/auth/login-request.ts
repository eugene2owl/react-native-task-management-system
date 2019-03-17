export interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponseError { // TODO generalize
  status: number;
  message: string;
}

export interface LoginResponse {
  token: string;
  error: LoginResponseError;
}
