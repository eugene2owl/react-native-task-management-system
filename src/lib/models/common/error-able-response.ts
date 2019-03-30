export interface ErrorAbleResponse {
  error: HttpResponseError;
}

interface HttpResponseError {
  status: number;
  message: string;
}
