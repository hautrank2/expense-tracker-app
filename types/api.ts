export type TableResponse<T> = {
  items: T[];
  pageSize: number;
  page: number;
  total: number;
  totalPage: number;
};
export interface ApiResponse<T> {
  data: T;
  statusCode: number;
  message: ApiErrorMessage;
}

export const TableResponseBase = {
  items: [],
  pageSize: 0,
  page: 0,
  total: 0,
  totalPage: 0,
};

export type ApiErrorDetail = string & {
  en: string;
  vi: string;
};

export type ApiErrorMessage = {
  en: string;
  vi: string;
  [key: string]: string;
};

export type ApiError = {
  message: ApiErrorMessage;
  data: unknown;
  status_code: number;
};
