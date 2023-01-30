import { Edge, Node, OnConnect, OnEdgesChange, OnNodesChange } from "reactflow";
import { BlockchainBlock } from "types/block";
import { BlockchainNode } from "types/node";

export interface NodeState extends BaseState {
  nodes: Node<BlockchainNode>[];
  selectedNode: Node<BlockchainNode> | null;
  onNodeSelect: (node: Node<BlockchainNode> | null) => void;
}

export interface BlockState extends BaseState {
  blocks: Node<BlockchainBlock>[];
}

export type BaseState = {
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  edges: Edge[];
};
