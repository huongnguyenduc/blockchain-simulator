import { CopyButton, Flex, Table, TextInput, Tooltip } from "@mantine/core";
import styles from "components/blockchain/Flow.module.css";
import { minimizeAddress } from "lib/utils/address";
import { FC, HTMLAttributes, useMemo, useState } from "react";
import { Balance } from "types";

/* ---------------------------------------------------------------------------------------------------------------------
 * Component: BalanceTable
 * ------------------------------------------------------------------------------------------------------------------ */

export interface BalanceTableProps extends HTMLAttributes<HTMLDivElement> {
  balances: Balance[];
}

export const BalanceTable: FC<BalanceTableProps> = (props) => {
  const { children, className, balances, ...balanceTableProps } = props;

  const [filterAddress, setFilterAddress] = useState<string>("");

  const filteredBalances = useMemo(() => {
    if (filterAddress === "") {
      return balances;
    }
    return balances.filter((item) => item.address === filterAddress);
  }, [balances, filterAddress]);

  const totalBalance = useMemo(() => {
    return filteredBalances.reduce((acc, item) => acc + item.balance, 0);
  }, [filteredBalances]);

  return (
    <div className={className} {...balanceTableProps}>
      <TextInput
        placeholder="Filter by address"
        value={filterAddress}
        onChange={(e) => setFilterAddress(e.currentTarget.value)}
        mb={"md"}
      />
      <Table>
        <thead>
          <tr>
            <th>No</th>
            <th>Address</th>
            <th style={{ textAlign: "right" }}>Balance</th>
            <th></th>
          </tr>
        </thead>
        <tbody style={{ width: "100%" }}>
          {filteredBalances.length === 0 ? (
            <div>No transaction</div>
          ) : (
            filteredBalances.map((item, index) => (
              <tr key={index} style={{ width: "100%" }}>
                <td>{index}</td>
                <td>
                  <CopyButton value={item.address} timeout={2000}>
                    {({ copied, copy }) => (
                      <Tooltip
                        label={copied ? "Copied" : item.address}
                        withArrow
                        position="right"
                      >
                        <div onClick={copy} className={styles.copyButton}>
                          {minimizeAddress(item.address)}
                        </div>
                      </Tooltip>
                    )}
                  </CopyButton>
                </td>
                <td style={{ textAlign: "right" }}>{item?.balance}</td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
      <hr />
      <Flex justify={"space-between"}>
        <div>Total Balance</div>
        <div>{totalBalance}</div>
      </Flex>
    </div>
  );
};
