import { initialEdges, initialNodes } from "lib/dummy";
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Connection,
  EdgeChange,
  Node,
  NodeChange,
} from "reactflow";
import { BlockchainNode, NodeState } from "types";
import { create } from "zustand";

const useNodeStore = create<NodeState>((set, get) => ({
  nodes: initialNodes,
  edges: initialEdges,
  selectedNode: null,
  onNodeSelect: (node: Node<BlockchainNode> | null) => {
    set({ selectedNode: node });
  },
  onNodesChange: (changes: NodeChange[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onConnect: (connection: Connection) => {
    set({
      edges: addEdge(connection, get().edges),
    });
  },
}));

export default useNodeStore;
