export interface ErrorAbleResponse {
  error: LoginResponseError;
}

interface LoginResponseError {
  status: number;
  message: string;
}
