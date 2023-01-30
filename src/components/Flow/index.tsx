import { Drawer } from "@mantine/core";
import useBlockStore from "lib/hooks/store/block";
import useNodeStore from "lib/hooks/store/node";
import ReactFlow, { ConnectionLineType } from "reactflow";
import { BlockState, NodeState } from "types";
import { shallow } from "zustand/shallow";
import CustomNode from "./CustomNode";

import styles from "./Flow.module.css";

const nodeTypes = {
  custom: CustomNode,
};

const defaultEdgeOptions = {
  animated: true,
  // type: "smoothstep",
};

const nodeSelector = (state: NodeState) => ({
  nodes: state.nodes,
  edges: state.edges,
  selectedNode: state.selectedNode,
  onNodeSelect: state.onNodeSelect,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

const blockSelector = (state: BlockState) => ({
  blocks: state.blocks,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

function Flow() {
  const {
    nodes,
    edges,
    selectedNode,
    onNodeSelect,
    onNodesChange,
    onEdgesChange,
    onConnect,
  } = useNodeStore(nodeSelector, shallow);

  const {
    blocks,
    edges: blockEdges,
    onNodesChange: onBlockNodesChange,
    onEdgesChange: onBlockEdgesChange,
    onConnect: onBlockConnect,
  } = useBlockStore(blockSelector, shallow);

  return (
    <>
      <div className={styles.flow}>
        <ReactFlow
          nodes={nodes}
          onNodesChange={onNodesChange}
          edges={edges}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          defaultEdgeOptions={defaultEdgeOptions}
          connectionLineType={ConnectionLineType.SmoothStep}
          fitView
        />
      </div>
      <Drawer
        opened={selectedNode !== null}
        onClose={() => onNodeSelect(null)}
        title={selectedNode?.data.account}
        padding="xl"
        size="70%"
        position={"right"}
        overlayOpacity={0.55}
        overlayBlur={3}
      >
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
      </Drawer>
    </>
  );
}

export default Flow;
