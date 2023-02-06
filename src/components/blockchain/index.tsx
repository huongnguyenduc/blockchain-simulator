import { Button, Drawer, Flex } from "@mantine/core";
import CustomBlock from "components/blockchain/CustomBlock";
import {
  CreateWalletModal,
  MempoolModal,
  TransactionModal,
} from "components/modal";
import { BalanceModal } from "components/modal/balance/balance-modal";
import { TransactionTable } from "components/table/transaction/transaction-table";
import useBlockStore from "lib/hooks/store/block";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import ReactFlow, { ConnectionLineType } from "reactflow";
import { BlockState, NodeRequest } from "types";
import { shallow } from "zustand/shallow";

import styles from "./Flow.module.css";

const nodeTypes = {
  customBlock: CustomBlock,
};

const defaultEdgeOptions = {
  animated: true,
  type: "smoothstep",
};

const blockSelector = (state: BlockState) => ({
  blocks: state.blocks,
  edges: state.edges,
  balances: state.balances,
  pendingTransactions: state.pendingTransactions,
  selectedBlock: state.selectedBlock,
  onBlockSelect: state.onBlockSelect,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  loadBlocks: state.loadBlocks,
});

function Blockchain({ ip, port }: any) {
  const router = useRouter();
  const [opened, setOpened] = useState(false);

  const {
    blocks,
    edges: blockEdges,
    balances,
    pendingTransactions,
    selectedBlock,
    onBlockSelect,
    onNodesChange: onBlockNodesChange,
    onEdgesChange: onBlockEdgesChange,
    onConnect: onBlockConnect,
    loadBlocks,
  } = useBlockStore(blockSelector, shallow);

  const loadBlockDataRef = useRef(false);

  useEffect(() => {
    loadBlockDataRef.current = true;

    async function loadBlockData() {
      if (!loadBlockDataRef.current) {
        return;
      }
      await loadBlocks({ ip, port } as NodeRequest);
      // wait for 1 second
      await new Promise((resolve) => setTimeout(resolve, 2000));
      // load nodes again
      await loadBlockData();
    }

    loadBlockData();

    return () => {
      loadBlockDataRef.current = false;
    };
  }, [ip, port, loadBlocks]);

  const [openedMemPool, setOpenedMemPool] = useState(false);
  const [openedCreateWallet, setOpenedCreateWallet] = useState(false);
  const [openedBalance, setOpenedBalance] = useState(false);

  return (
    <>
      <header className={styles.header}>
        <Button onClick={() => router.back()}>Back</Button>
        <div>
          <span>
            Node{" "}
            <b>
              {ip}:{port}
            </b>
          </span>
        </div>
        <Flex gap={8}>
          <Button onClick={() => setOpenedMemPool(true)}>Mempool</Button>
          <Button onClick={() => setOpenedBalance(true)}>Balance</Button>
          <Button onClick={() => setOpenedCreateWallet(true)}>
            Create Wallet
          </Button>
          <Button onClick={() => setOpened(true)}>Send transaction</Button>
        </Flex>
      </header>
      <div className={styles.flow}>
        <ReactFlow
          nodes={blocks}
          onNodesChange={onBlockNodesChange}
          edges={blockEdges}
          onEdgesChange={onBlockEdgesChange}
          onConnect={onBlockConnect}
          nodeTypes={nodeTypes}
          defaultEdgeOptions={defaultEdgeOptions}
          connectionLineType={ConnectionLineType.SmoothStep}
          fitView
        />
      </div>
      <Drawer
        opened={selectedBlock !== null}
        onClose={() => onBlockSelect(null)}
        title={`Block ${selectedBlock?.data.header.number}`}
        padding="xl"
        size="50%"
        position={"right"}
      >
        <div>Transactions</div>
        <TransactionTable transactions={selectedBlock?.data.payload ?? []} />
      </Drawer>
      <MempoolModal
        opened={openedMemPool}
        onClose={() => setOpenedMemPool(false)}
        transactions={pendingTransactions ?? []}
      />
      <TransactionModal
        ip={ip}
        port={parseInt(port)}
        opened={opened}
        onSuccess={() => {
          setOpened(false);
          setOpenedMemPool(true);
        }}
        onClose={() => setOpened(false)}
      />
      <CreateWalletModal
        opened={openedCreateWallet}
        onClose={() => setOpenedCreateWallet(false)}
        ip={ip}
        port={port}
      />
      <BalanceModal
        opened={openedBalance}
        onClose={() => setOpenedBalance(false)}
        balances={balances}
      />
    </>
  );
}

export default Blockchain;
