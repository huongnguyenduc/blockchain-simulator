import {
  Button,
  CopyButton,
  Flex,
  PasswordInput,
  Tooltip,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import styles from "components/blockchain/Flow.module.css";
import { FC, HTMLAttributes, useState } from "react";
import { createWallet } from "services/wallet";
import { WalletFormData } from "types";

/* ---------------------------------------------------------------------------------------------------------------------
 * Component: WalletForm
 * ------------------------------------------------------------------------------------------------------------------ */

export interface WalletFormProps extends HTMLAttributes<HTMLDivElement> {
  ip: string;
  port: number;
  onSuccess?: () => void;
}

export const WalletForm: FC<WalletFormProps> = (props) => {
  const [loading, setLoading] = useState(false);
  const form = useForm<WalletFormData>({
    initialValues: { password: "", confirm_password: "" },

    validate: {
      password: (value) => (value.length > 0 ? null : "Password is required"),
      confirm_password: (value, values) =>
        value !== values.password ? "Passwords did not match" : null,
    },
  });
  const { children, className, ip, port, onSuccess, ...walletFormProps } =
    props;

  const handleSubmit = async (values: WalletFormData) => {
    setLoading(true);
    const result = await createWallet(
      { password: values.password },
      { ip, port }
    );
    if (result && result?.account) {
      showNotification({
        title: "Wallet created",
        autoClose: false,
        message: (
          <div>
            <p>Wallet created successfully</p>
            <p>Please save your account and password in safe area</p>
            <CopyButton value={result?.account} timeout={2000}>
              {({ copied, copy }) => (
                <Tooltip
                  label={copied ? "Copied" : result?.account}
                  withArrow
                  position="right"
                >
                  <div onClick={copy} className={styles.copyButton}>
                    Account: {result?.account}
                  </div>
                </Tooltip>
              )}
            </CopyButton>
          </div>
        ),
        color: "green",
      });
      onSuccess?.();
    } else {
      showNotification({
        title: "Wallet creation failed",
        message: result?.message,
        color: "red",
      });
    }
    setLoading(false);
  };

  return (
    <div className={className} {...walletFormProps}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Flex direction={"column"} justify={"center"}>
          <PasswordInput
            mt="sm"
            label="Your password"
            placeholder="Password"
            {...form.getInputProps("password")}
          />
          <PasswordInput
            mt="sm"
            label="Confirm password"
            placeholder="Confirm Password"
            {...form.getInputProps("confirm_password")}
          />
          <Button type="submit" mt="sm" loading={loading}>
            Submit
          </Button>
        </Flex>
      </form>
    </div>
  );
};
