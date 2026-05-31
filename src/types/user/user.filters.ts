export interface IUserFilters {
  search?: string | undefined;
  active?: boolean | undefined;
  page?: number | undefined;
  size?: number | undefined;
  sortBy?: string | undefined;
  direction?: 'asc' | 'desc' | undefined;
}
