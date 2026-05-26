export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export const UserStatusOptions = [
  { label: 'Ativo', value: true },
  { label: 'Inativo', value: false },
];

export const UserStatusColor: Record<UserStatus, string> = {
  [UserStatus.ACTIVE]: 'primary',
  [UserStatus.INACTIVE]: 'negative',
};

export function getUserActiveColor(status: string): string {
  return UserStatusColor[status as UserStatus] ?? 'grey';
}
