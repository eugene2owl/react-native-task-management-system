export interface HttpError {
  code: number;
  message: string;
  name: string;
  previous: object;
  status: number;
}
