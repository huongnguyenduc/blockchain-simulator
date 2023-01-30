import { initialBlockEdges } from "lib/dummy";
import { initialBlocks } from "lib/dummy/blocks";
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Connection,
  EdgeChange,
  NodeChange,
} from "reactflow";
import { BlockState } from "types";
import { create } from "zustand";

const useBlockStore = create<BlockState>((set, get) => ({
  edges: initialBlockEdges,
  blocks: initialBlocks,
  onNodesChange: (changes: NodeChange[]) => {
    set({
      blocks: applyNodeChanges(changes, get().blocks),
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

export default useBlockStore;
