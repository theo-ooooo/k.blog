export interface AppError {
  result: boolean;
  error?: {
    message: string;
  };
  message?: { value: string; msg: string; param: string; location: string }[];
}
