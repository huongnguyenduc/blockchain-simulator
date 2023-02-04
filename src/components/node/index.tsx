import CustomNode from "components/node/CustomNode";
import useNodeStore from "lib/hooks/store/node";
import { useEffect } from "react";
import ReactFlow, { ConnectionLineType } from "reactflow";
import { NodeState } from "types";
import { shallow } from "zustand/shallow";

import styles from "./Flow.module.css";

const nodeTypes = {
  customNode: CustomNode,
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
  findNodes: state.loadNodes,
});

function Node() {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, findNodes } =
    useNodeStore(nodeSelector, shallow);

  useEffect(() => {
    async function loadNodes() {
      await findNodes();
      // wait for 1 second
      await new Promise((resolve) => setTimeout(resolve, 3000));
      // load nodes again
      await loadNodes();
    }

    loadNodes();
  }, []);

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
    </>
  );
}

export default Node;
