import { BlockchainBlock, PendingBlock } from "types/block";
import { BlockchainNode } from "types/node";
import { Transaction } from "types/transaction";

export interface NodeResponse {
  nodes: BlockchainNode[];
  blocks: BlockchainBlock[];
  pending_txs: Transaction[];
  pending_block: PendingBlock;
}

export type BlockResponse = BlockchainBlock[];

export interface WalletResponse {
  account: string;
}

export interface BalancesResponse {
  block_hash: string;
  balances: any;
}
