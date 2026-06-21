import type { UUID } from 'crypto';

export interface IUser {
  id?: UUID;
  name: string;
  lastName: string;
  email: string;
  phone: string;
  active?: boolean;
}

export interface IUserCreate extends IUser {
  password: string;
}

export interface IUserResponse {
  message: string;
  user: IUser;
}

export interface IUserWithCompany extends IUser {
  companyName: string;
}

export interface IClients {
  id?: UUID;
  name: string;
  email: string;
}

export interface IUserPerfil {
  id?: UUID;
  name: string;
  lastName: string;
  phone: string;
}
