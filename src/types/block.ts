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
