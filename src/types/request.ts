export interface NodeRequest {
  ip: string;
  port: number;
}

export interface TransactionRequest {
  from: string;
  to: string;
  from_pwd: string;
  value: number;
  data: string;
}

export interface WalletRequest {
  password: string;
}
