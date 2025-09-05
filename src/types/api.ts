export type ErrorType = {
  data: {
    code: number;
    message: string;
    detail: string;
  };
  status: number | string;
  message: string;
};
