import { Modal } from "@mantine/core";
import { WalletForm } from "components/form";
import { FC, HTMLAttributes } from "react";

/* ---------------------------------------------------------------------------------------------------------------------
 * Component: CreateWalletModal
 * ------------------------------------------------------------------------------------------------------------------ */

export interface CreateWalletModalProps extends HTMLAttributes<HTMLDivElement> {
  opened: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  ip: string;
  port: number;
}

export const CreateWalletModal: FC<CreateWalletModalProps> = (props) => {
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
      <Modal opened={opened} onClose={onClose} centered title="Create Wallet">
        <WalletForm onSuccess={onSuccess} ip={ip} port={port} />
      </Modal>
    </div>
  );
};
