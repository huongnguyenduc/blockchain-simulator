import { CopyButton, Table, Tooltip } from "@mantine/core";
import styles from "components/blockchain/Flow.module.css";
import { minimizeAddress } from "lib/utils/address";
import { FC, HTMLAttributes } from "react";
import { Transaction } from "types";

/* ---------------------------------------------------------------------------------------------------------------------
 * Component: TransactionTable
 * ------------------------------------------------------------------------------------------------------------------ */

export interface TransactionTableProps extends HTMLAttributes<HTMLDivElement> {
  transactions: Transaction[];
}

export const TransactionTable: FC<TransactionTableProps> = (props) => {
  const { children, className, transactions, ...mempoolTableProps } = props;

  return (
    <div className={className} {...mempoolTableProps}>
      <Table>
        <thead>
          <tr>
            <th>Nonce</th>
            <th>From</th>
            <th>To</th>
            <th>Value</th>
            <th>Data</th>
            <th>Time</th>
            <th>Signature</th>
            <th></th>
          </tr>
        </thead>
        {transactions.length !== 0 && (
          <tbody>
            {transactions.map((item) => (
              <tr key={item.nonce}>
                <td>{item.nonce}</td>
                <td>
                  <CopyButton value={item.from} timeout={2000}>
                    {({ copied, copy }) => (
                      <Tooltip
                        label={copied ? "Copied" : item.from}
                        withArrow
                        position="right"
                      >
                        <div onClick={copy} className={styles.copyButton}>
                          {minimizeAddress(item.from)}
                        </div>
                      </Tooltip>
                    )}
                  </CopyButton>
                </td>
                <td>
                  <CopyButton value={item.to} timeout={2000}>
                    {({ copied, copy }) => (
                      <Tooltip
                        label={copied ? "Copied" : item.to}
                        withArrow
                        position="right"
                      >
                        <div onClick={copy} className={styles.copyButton}>
                          {minimizeAddress(item.to)}
                        </div>
                      </Tooltip>
                    )}
                  </CopyButton>
                </td>
                <td>{item.value}</td>
                <td>{item.data}</td>
                <td>{item.time}</td>
                <td>
                  <CopyButton value={item.signature} timeout={2000}>
                    {({ copied, copy }) => (
                      <Tooltip
                        label={copied ? "Copied" : item.signature}
                        withArrow
                        position="right"
                      >
                        <div onClick={copy} className={styles.copyButton}>
                          {minimizeAddress(item.signature)}
                        </div>
                      </Tooltip>
                    )}
                  </CopyButton>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </Table>
      {transactions.length === 0 && (
        <div
          style={{
            height: 100,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          No transaction
        </div>
      )}
    </div>
  );
};
