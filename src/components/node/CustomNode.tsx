import { Button, Group, HoverCard, Text } from "@mantine/core";
import useNodeStore from "lib/hooks/store/node";
import { useRouter } from "next/router";
import React, { FC, memo } from "react";
import { Handle, NodeProps, Position } from "reactflow";
import { BlockchainNode, NodeState } from "types";
import { shallow } from "zustand/shallow";

import styles from "./Flow.module.css";

const CustomNode: FC<NodeProps<BlockchainNode>> = (props) => {
  const { data, xPos, yPos, id, type, sourcePosition } = props;
  const { onNodeSelect } = useNodeStore(
    (state: NodeState) => ({
      onNodeSelect: state.onNodeSelect,
    }),
    shallow
  );
  const router = useRouter();

  return (
    <div
      className={
        data?.is_bootstrap ? styles.nodeBootstrap : styles.nodeContainer
      }
      onClick={() => {
        router.push(`/nodes/${data.ip}:${data.port}`);
      }}
    >
      <Handle type="target" position={Position.Top} />
      <Group position={"center"}>
        <HoverCard width={400} shadow={"md"} position={"bottom-start"}>
          <HoverCard.Target>
            <Button
              variant={"white"}
              fullWidth
              style={{
                background: "transparent",
              }}

              // onClick={() =>
              //   onNodeSelect({
              //     data,
              //     id,
              //     type,
              //     position: { x: xPos, y: yPos },
              //     className: styles.customNode,
              //   })
              // }
            >
              <div>{`${data.ip}:${data.port}`}</div>
            </Button>
          </HoverCard.Target>
          <HoverCard.Dropdown>
            <Text size="sm">
              IP: <b>{data.ip}</b>
            </Text>
            <Text size="sm">
              Port: <b>{data.port}</b>
            </Text>
            <Text size="sm">
              Miner Address: <b>{data.account}</b>
            </Text>
          </HoverCard.Dropdown>
        </HoverCard>
      </Group>

      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default memo(CustomNode);
