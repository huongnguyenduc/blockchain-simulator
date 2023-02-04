import { Edge, Node, OnConnect, OnEdgesChange, OnNodesChange } from "reactflow";
import { Balance } from "types/balance";
import { BlockchainBlock } from "types/block";
import { BlockchainNode } from "types/node";
import { NodeRequest } from "types/request";
import { Transaction } from "types/transaction";

export interface NodeState extends BaseState {
  nodes: Node<BlockchainNode>[];
  selectedNode: Node<BlockchainNode> | null;
  onNodeSelect: (node: Node<BlockchainNode> | null) => void;
  loadNodes: () => Promise<void>;
}

export interface BlockState extends BaseState {
  balances: Balance[];
  blocks: Node<BlockchainBlock>[];
  pendingTransactions: Transaction[];
  selectedBlock: Node<BlockchainBlock> | null;
  onBlockSelect: (block: Node<BlockchainBlock> | null) => void;
  loadBlocks: (blockRequest: NodeRequest) => Promise<void>;
}

export type BaseState = {
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  edges: Edge[];
};
