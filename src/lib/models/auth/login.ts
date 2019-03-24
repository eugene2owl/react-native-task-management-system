import { ErrorAbleResponse } from "../common/error-able-response";

export interface Login {
  username: string;
  password: string;
}

export interface LoginResponse extends ErrorAbleResponse {
  token: string;
}
