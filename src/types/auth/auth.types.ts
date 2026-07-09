import type { UUID } from 'crypto';

export interface IAuth {
  token: UUID;
  password: string;
  confirmPassword: string;
}
