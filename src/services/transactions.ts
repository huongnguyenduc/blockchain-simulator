import { endpoints } from "lib/constants/endpoints";
import { fetcher, getEndpoint } from "lib/services/fetcher";
import { NodeRequest, TransactionRequest } from "types";

export const sendTransaction = async (
  transaction: TransactionRequest,
  nodeRequest: NodeRequest
) => {
  return await fetcher(
    getEndpoint(endpoints.transactions.sendTransaction, { ...nodeRequest }),
    {
      body: JSON.stringify(transaction),
      method: "POST",
    }
  );
};
