import { Modal } from "@mantine/core";
import { TransactionForm } from "components/form/transaction/transaction-form";
import { FC, HTMLAttributes } from "react";

/* ---------------------------------------------------------------------------------------------------------------------
 * Component: TransactionModal
 * ------------------------------------------------------------------------------------------------------------------ */

export interface TransactionModalProps extends HTMLAttributes<HTMLDivElement> {
  opened: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  ip: string;
  port: number;
}

export const TransactionModal: FC<TransactionModalProps> = (props) => {
  const {
    children,
    className,
    opened,
    onClose,
    ip,
    port,
    onSuccess,
    ...transactionModalProps
  } = props;

  return (
    <div className={className} {...transactionModalProps}>
      <Modal
        opened={opened}
        onClose={onClose}
        centered
        title="Send transaction"
      >
        <TransactionForm onSuccess={onSuccess} ip={ip} port={port} />
      </Modal>
    </div>
  );
};
