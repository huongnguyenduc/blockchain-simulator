import styles from "components/blockchain/Flow.module.css";
import { sha256 } from "js-sha256";
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
import { getBalances } from "services/balances";
import { getNodes } from "services/nodes";
import {
  Balance,
  BlockchainBlock,
  BlockState,
  NodeRequest,
  NodeResponse,
} from "types";
import { create } from "zustand";

const useBlockStore = create<BlockState>((set, get) => ({
  edges: [],
  blocks: [],
  pendingTransactions: [],
  balances: [],
  selectedBlock: null,
  onBlockSelect: (block: Node<BlockchainBlock> | null) => {
    set({ selectedBlock: block });
  },
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
  loadBlocks: async (blockRequest: NodeRequest) => {
    const balancesResponse = await getBalances(blockRequest);
    if (balancesResponse && balancesResponse.balances) {
      // Convert object to array of objects with key and value
      const balances = Object.keys(balancesResponse.balances).map((key) => {
        return { address: key, balance: balancesResponse.balances[key] };
      });
      if (balances.length > 0) {
        set({
          balances: balances as Balance[],
        });
      } else {
        set({
          balances: [],
        });
      }
    } else {
      set({
        balances: [],
      });
    }
    const blockResponse: NodeResponse = await getNodes(blockRequest);
    const blocks = blockResponse?.blocks;
    const pendingTransactions = blockResponse?.pending_txs;
    if (pendingTransactions) {
      set({
        pendingTransactions: pendingTransactions,
      });
    } else {
      set({
        pendingTransactions: [],
      });
    }
    if (blocks) {
      set({
        blocks: [],
        edges: [],
      });
      // Map blocks to nodes
      set({
        blocks: blocks.map((block, index) => {
          const blockHash = sha256(JSON.stringify(block));
          return {
            id: blockHash,
            data: block,
            position: { x: index * 250, y: 0 },
            type: "customBlock",
            className: styles.customNode,
          };
        }),
      });

      // Map blocks to edges
      const edgesToAdd = blocks.slice(1).map((block) => {
        const blockHash = sha256(JSON.stringify(block));
        return {
          id: `${blockHash}-edge`,
          source: blockHash,
          target: block.header.parent,
          markerEnd: {
            type: MarkerType.ArrowClosed,
          },
        };
      });

      set({
        edges: edgesToAdd,
      });
    }

    // Add pending block
    const pendingBlock = blockResponse?.pending_block;
    if (pendingBlock && pendingBlock.time !== 0) {
      const pendingBlockHash = sha256(JSON.stringify(pendingBlock));
      set({
        blocks: [
          ...get().blocks,
          {
            id: pendingBlockHash,
            data: {
              header: {
                parent: pendingBlock.parent,
                number: pendingBlock.number,
                nonce: -1,
                time: pendingBlock.time,
                miner: pendingBlock.miner,
              },
              payload: pendingBlock.txs ?? [],
            },
            position: {
              x: blocks && blocks?.length ? blocks.length * 250 : 0,
              y: 0,
            },
            type: "customBlock",
            className: styles.customPendingNode,
          },
        ],
      });
    }
  },
}));

export default useBlockStore;
