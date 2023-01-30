import { Button, Group, HoverCard, Text } from "@mantine/core";
import styles from "components/Flow/Flow.module.css";
import useNodeStore from "lib/hooks/store/node";
import React, { CSSProperties, FC, memo } from "react";
import { Handle, NodeProps, Position } from "reactflow";
import { BlockchainNode, NodeState } from "types";
import { shallow } from "zustand/shallow";

const sourceHandleStyleA: CSSProperties = { left: 50 };
const sourceHandleStyleB: CSSProperties = {
  right: 50,
  left: "auto",
};

const CustomNode: FC<NodeProps<BlockchainNode>> = (props) => {
  const { data, xPos, yPos, id, type, sourcePosition } = props;
  const { onNodeSelect } = useNodeStore(
    (state: NodeState) => ({
      onNodeSelect: state.onNodeSelect,
    }),
    shallow
  );

  return (
    <>
      <Handle type="target" position={Position.Top} />
      <Group position={"center"}>
        <HoverCard width={280} shadow={"md"}>
          <HoverCard.Target>
            <Button
              variant={"white"}
              fullWidth
              onClick={() =>
                onNodeSelect({
                  data,
                  id,
                  type,
                  position: { x: xPos, y: yPos },
                  className: styles.customNode,
                })
              }
            >
              <div>{data.account}</div>
            </Button>
          </HoverCard.Target>
          <HoverCard.Dropdown>
            <Text size="sm">
              IP: <b>{data.ip}</b>
            </Text>
          </HoverCard.Dropdown>
        </HoverCard>
      </Group>

      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        style={sourceHandleStyleA}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        style={sourceHandleStyleB}
      />
    </>
  );
};

export default memo(CustomNode);
