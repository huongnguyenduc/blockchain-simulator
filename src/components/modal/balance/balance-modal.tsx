import { Modal } from "@mantine/core";
import { BalanceTable } from "components/table";
import { FC, HTMLAttributes } from "react";
import { Balance } from "types";

/* ---------------------------------------------------------------------------------------------------------------------
 * Component: BalanceModal
 * ------------------------------------------------------------------------------------------------------------------ */

export interface BalanceModalProps extends HTMLAttributes<HTMLDivElement> {
  opened: boolean;
  onClose: () => void;
  balances: Balance[];
}

export const BalanceModal: FC<BalanceModalProps> = (props) => {
  const {
    children,
    className,
    opened,
    onClose,
    balances,
    ...balanceModalProps
  } = props;

  return (
    <div className={className} {...balanceModalProps}>
      <Modal opened={opened} onClose={onClose} centered title="Balances List">
        <BalanceTable balances={balances} />
      </Modal>
    </div>
  );
};
