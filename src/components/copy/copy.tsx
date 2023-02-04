import { CopyButton, Tooltip } from "@mantine/core";
import styles from "components/blockchain/Flow.module.css";
import React, { FC, HTMLAttributes } from "react";

/* ---------------------------------------------------------------------------------------------------------------------
 * Component: Copy
 * ------------------------------------------------------------------------------------------------------------------ */

export interface CopyProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
  title: string;
  timeout?: number;
}

export const Copy: FC<CopyProps> = (props) => {
  const {
    children,
    className,
    value,
    title,
    timeout = 2000,
    ...copyProps
  } = props;

  return (
    <div className={className} {...copyProps}>
      <CopyButton value={value} timeout={timeout}>
        {({ copied, copy }) => (
          <Tooltip label={copied ? "Copied" : value} withArrow position="right">
            <div onClick={copy} className={styles.copyButton}>
              {title}
            </div>
          </Tooltip>
        )}
      </CopyButton>
    </div>
  );
};
