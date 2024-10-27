export type TBasicResponse<T, V> = {
  success: boolean;
  code: number;
  message: string;
  data?: T;
  meta?: V;
};

export type TMeta = {
  page: number;
  limit: number;
  totalRecords: number;
  totalPages: number;
};
