import { Modal } from "@mantine/core";
import { TransactionTable } from "components/table/transaction/transaction-table";
import { FC, HTMLAttributes } from "react";
import { Transaction } from "types";

/* ---------------------------------------------------------------------------------------------------------------------
 * Component: MempoolModal
 * ------------------------------------------------------------------------------------------------------------------ */

export interface MempoolModalProps extends HTMLAttributes<HTMLDivElement> {
  opened: boolean;
  onClose: () => void;
  transactions: Transaction[];
}

export const MempoolModal: FC<MempoolModalProps> = (props) => {
  const {
    children,
    className,
    transactions,
    opened,
    onClose,
    ...transactionModalProps
  } = props;

  return (
    <div className={className} {...transactionModalProps}>
      <Modal
        opened={opened}
        onClose={onClose}
        size={"xl"}
        centered
        title="Mempool"
      >
        <TransactionTable transactions={transactions} />
      </Modal>
    </div>
  );
};
