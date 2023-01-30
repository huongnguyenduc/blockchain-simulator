import styles from "components/Flow/Flow.module.css";
import { Node } from "reactflow";
import { BlockchainNode } from "types/node";

export const initialNodes: Node<BlockchainNode>[] = [
  {
    id: "1",
    data: {
      account: "Node 1",
      ip: "192.168.1.1",
      is_bootstrap: true,
      port: 3000,
    },
    position: { x: 150, y: 5 },
    type: "custom",
    className: styles.customNode,
  },
  {
    id: "2",
    data: {
      account: "Node 2",
      ip: "192.168.1.1",
      is_bootstrap: false,
      port: 3001,
    },
    position: { x: 100, y: 330 },
    type: "custom",
    className: styles.customNode,
  },
  {
    id: "3",
    data: {
      account: "Node 3",
      ip: "192.168.1.1",
      is_bootstrap: false,
      port: 3002,
    },
    position: { x: 600, y: 100 },
    type: "custom",
    className: styles.customNode,
  },
  {
    id: "4",
    data: {
      account: "Node 4",
      ip: "192.168.1.1",
      is_bootstrap: false,
      port: 3003,
    },
    position: { x: 800, y: 200 },
    type: "custom",
    className: styles.customNode,
  },
];
