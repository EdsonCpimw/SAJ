import type { IUserCreate } from 'src/types/user/user.types';
import type { UUID } from 'crypto';

export interface ICompany {
  id?: UUID;
  name: string;
  document: string;
}

export interface ICompanyCreate {
  company: ICompany;
  user: IUserCreate;
}
