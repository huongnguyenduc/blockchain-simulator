export interface Transaction {
  from: string;
  to: string;
  value: number;
  nonce: number;
  data: string;
  time: number;
  signature: string;
}
