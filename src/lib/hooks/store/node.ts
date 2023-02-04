import styles from "components/node/Flow.module.css";
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Connection,
  EdgeChange,
  MarkerType,
  Node,
  NodeChange,
} from "reactflow";
import { getNodes } from "services/nodes";
import { BlockchainNode, NodeResponse, NodeState } from "types";
import { create } from "zustand";

const useNodeStore = create<NodeState>((set, get, store) => ({
  nodes: [],
  edges: [],
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
  loadNodes: async () => {
    const nodeResponse: NodeResponse = await getNodes();
    if (!nodeResponse || !nodeResponse.nodes) {
      set({
        nodes: [],
        edges: [],
      });
      return;
    }

    const nodes = nodeResponse.nodes;

    if (nodes.length !== get().nodes.length) {
      set({
        nodes: [],
        edges: [],
      });
    } else {
      const isSameNodes = nodes.every((node) => {
        const existingNode = get().nodes.find((n) => n.id === node.account);
        return (
          existingNode &&
          existingNode.data.ip === node.ip &&
          existingNode.data.port === node.port &&
          existingNode.data.is_bootstrap === node.is_bootstrap
        );
      });

      if (isSameNodes) {
        return;
      }
    }

    // Retrieve bootstrap node
    const bootstrapNode = nodes.find((node) => node.is_bootstrap);

    if (!bootstrapNode) {
      return;
    }

    // Map nodes to nodes
    const nodesToAdd = nodes.map((node, index) => ({
      id: node.account,
      data: node,
      position: {
        y: Math.random() * 800,
        x: (Math.random() + (index % 2) === 0 ? -index : index) * 400,
      },
      type: "customNode",
      className: styles.customNode,
    }));

    // Map nodes to edges
    const edgesToAdd = nodesToAdd
      .filter((n) => !n.data.is_bootstrap)
      .map((node) => ({
        id: `${bootstrapNode.account}-${node.data.account}`,
        source: bootstrapNode.account,
        target: node.data.account,
        // type: "smoothstep",
        arrowHeadType: "arrowclosed",
        animated: true,
        markerEnd: {
          type: MarkerType.ArrowClosed,
        },
      }));

    set({
      nodes: nodesToAdd,
      edges: edgesToAdd,
    });

    // Get peer nodes for each node
    const peers = await Promise.all(
      nodes
        .filter((node) => !node.is_bootstrap)
        .map(async (node) => {
          const peersResponse = await getNodes({
            ip: node.ip,
            port: node.port,
          });
          return peersResponse.nodes;
        })
    );

    // Map peer nodes to edges
    peers.forEach((peerNodes: BlockchainNode[], index) => {
      const connectNode = nodes.filter((node) => !node.is_bootstrap)[index];
      if (!connectNode) {
        return;
      }
      const edgesToAdd = peerNodes
        .filter((node) => node.account !== connectNode.account)
        .map((node) => ({
          id: `${connectNode.account}-${node.account}`,
          source: connectNode.account,
          target: node.account,
          // type: "smoothstep",
          arrowHeadType: "arrowclosed",
          animated: true,
          markerEnd: {
            type: MarkerType.ArrowClosed,
          },
        }));
      set({
        edges: get().edges.concat(edgesToAdd),
      });
    });
  },
}));

export default useNodeStore;
