import {
  Button,
  Flex,
  NumberInput,
  PasswordInput,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { FC, HTMLAttributes, useState } from "react";
import { sendTransaction } from "services/transactions";
import { TransactionRequest } from "types";

/* ---------------------------------------------------------------------------------------------------------------------
 * Component: TransactionForm
 * ------------------------------------------------------------------------------------------------------------------ */

export interface TransactionFormProps extends HTMLAttributes<HTMLDivElement> {
  ip: string;
  port: number;
  onSuccess?: () => void;
}

export const TransactionForm: FC<TransactionFormProps> = (props) => {
  const [loading, setLoading] = useState(false);
  const { children, className, ip, port, onSuccess, ...transactionFormProps } =
    props;

  const form = useForm<TransactionRequest>({
    initialValues: { from: "", from_pwd: "", to: "", value: 0, data: "" },

    validate: {
      from: (value) =>
        /^0x[a-fA-F0-9]{40}$/.test(value) ? null : "Invalid address",
      to: (value) =>
        /^0x[a-fA-F0-9]{40}$/.test(value) ? null : "Invalid address",
      from_pwd: (value) => (value.length > 0 ? null : "Password is required"),
      value: (value) => (value > 0 ? null : "Value must be greater than 0"),
    },
  });

  const handleSubmit = async (values: TransactionRequest) => {
    setLoading(true);
    const result = await sendTransaction(values, { ip, port });
    if (result && result?.success === true) {
      // wait for 3 seconds to show the notification
      showNotification({
        title: "Transaction sent",
        message: "Transaction sent successfully",
        color: "green",
      });
      onSuccess?.();
    } else {
      showNotification({
        title: "Transaction failed",
        message: result?.error,
        color: "red",
      });
    }
    setLoading(false);
  };

  return (
    <div className={className} {...transactionFormProps}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Flex direction={"column"} justify={"center"}>
          <TextInput
            label="From"
            placeholder="From address"
            {...form.getInputProps("from")}
          />

          <TextInput
            mt="sm"
            label="To"
            placeholder="To address"
            {...form.getInputProps("to")}
          />
          <PasswordInput
            mt="sm"
            label="Your password"
            placeholder="Password"
            {...form.getInputProps("from_pwd")}
          />
          <NumberInput
            mt="sm"
            label="Value"
            placeholder="Value"
            {...form.getInputProps("value")}
          />
          <TextInput
            mt="sm"
            label="Data"
            placeholder="Data"
            {...form.getInputProps("data")}
          />
          <Button type="submit" mt="sm" loading={loading}>
            Submit
          </Button>
        </Flex>
      </form>
    </div>
  );
};
