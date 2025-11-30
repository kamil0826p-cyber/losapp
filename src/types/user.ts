export interface UserData {
  credits: number
  accountType: AccountType
  createdAt?: Date
  updatedAt?: Date
}

export enum AccountType {
  FREE = 'free',
  PRO = 'pro',
}

export const ACCOUNT_TYPE_LABELS: Record<AccountType, string> = {
  [AccountType.FREE]: 'Free',
  [AccountType.PRO]: 'Pro',
}

export const ACCOUNT_TYPE_COLORS: Record<AccountType, string> = {
  [AccountType.FREE]: '#6b7280',
  [AccountType.PRO]: '#f59e0b',
}


