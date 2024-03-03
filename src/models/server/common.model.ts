export type ResponseErrorModel = {
  code: number;
  message: string;
};

export type SupportModel = {
  url: string;
  text: string;
};

export type PaginationModel = {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
};
