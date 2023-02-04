import {
  Button,
  CopyButton,
  Group,
  HoverCard,
  Loader,
  Text,
  Tooltip,
} from "@mantine/core";
import { Copy } from "components/copy/copy";
import useBlockStore from "lib/hooks/store/block";
import { minimizeAddress } from "lib/utils/address";
import { getRelativeTime } from "lib/utils/time";
import React, { FC, memo } from "react";
import { Handle, NodeProps, Position } from "reactflow";
import { BlockchainBlock, BlockState } from "types";
import { shallow } from "zustand/shallow";

import styles from "./Flow.module.css";

const CustomBlock: FC<NodeProps<BlockchainBlock>> = (props) => {
  const { data, xPos, yPos, id, type, sourcePosition } = props;

  const { onBlockSelect } = useBlockStore(
    (state: BlockState) => ({
      onBlockSelect: state.onBlockSelect,
    }),
    shallow
  );

  return (
    <div>
      <Handle type="target" position={Position.Top} />
      <Group position={"center"}>
        <HoverCard width={280} shadow={"md"}>
          <HoverCard.Target>
            <Button
              variant={"white"}
              fullWidth
              style={{ height: 100 }}
              onClick={() =>
                onBlockSelect({
                  data,
                  id,
                  type,
                  position: { x: xPos, y: yPos },
                  className: styles.customNode,
                })
              }
            >
              {data.header.nonce === -1 ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <div>Block Pending...</div>
                  <Loader mt={"md"} />
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <div>Block {data.header.number}</div>
                  <div>Hash: {minimizeAddress(id)}</div>
                </div>
              )}
            </Button>
          </HoverCard.Target>
          <HoverCard.Dropdown>
            {data?.header?.nonce && data.header.nonce !== -1 && (
              <CopyButton value={id} timeout={2000}>
                {({ copied, copy }) => (
                  <Tooltip
                    label={copied ? "Copied" : id}
                    withArrow
                    position="right"
                  >
                    <div onClick={copy} className={styles.copyButton}>
                      Block Hash: {minimizeAddress(id)}
                    </div>
                  </Tooltip>
                )}
              </CopyButton>
            )}
            <CopyButton value={data.header.parent} timeout={2000}>
              {({ copied, copy }) => (
                <Tooltip
                  label={copied ? "Copied" : data.header.parent}
                  withArrow
                  position="right"
                >
                  <div onClick={copy} className={styles.copyButton}>
                    Parent Hash: {minimizeAddress(data.header.parent)}
                  </div>
                </Tooltip>
              )}
            </CopyButton>
            {data?.header?.nonce && data.header.nonce !== -1 && (
              <Text>Nonce: {data.header.nonce}</Text>
            )}
            <Text>
              Unix Time: {data.header.time} ({getRelativeTime(data.header.time)}
              )
            </Text>
            <Copy
              value={data.header.miner}
              title={`Miner: ${minimizeAddress(data.header.miner)}`}
            />
          </HoverCard.Dropdown>
        </HoverCard>
      </Group>

      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default memo(CustomBlock);
