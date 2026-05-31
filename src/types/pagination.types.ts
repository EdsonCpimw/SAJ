export const PAGINATION_DEFAULT_PAGE = 0;
export const PAGINATION_DEFAULT_SIZE = 10;

export interface IPageResponse<T> {
  data: T[];
  totalElements: number;
  totalPages: number;
  page: number;
  size: number;
}
