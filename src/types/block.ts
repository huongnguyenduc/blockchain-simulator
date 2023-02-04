import { Transaction } from "types/transaction";

export interface BlockHeader {
  parent: string;
  number: number;
  nonce: number;
  time: number;
  miner: string;
}

export interface BlockchainBlock {
  header: BlockHeader;
  payload: Transaction[];
}

export interface PendingBlock {
  parent: string;
  number: number;
  time: number;
  miner: string;
  txs: Transaction[] | null;
}
