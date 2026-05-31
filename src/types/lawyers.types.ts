import type { IUser } from 'src/types/user/user.types';

export interface ILawyer {
  id?: number;
  userId: number;
  oab: string;
  specialty: string;
}

export interface ILawyerFull extends IUser {
  lawyer: ILawyer;
}
