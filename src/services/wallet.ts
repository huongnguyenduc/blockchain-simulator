import { endpoints } from "lib/constants/endpoints";
import { fetcher, getEndpoint } from "lib/services/fetcher";
import { NodeRequest, WalletRequest } from "types";

export const createWallet = async (
  wallet: WalletRequest,
  nodeRequest?: NodeRequest
) => {
  return await fetcher(
    getEndpoint(endpoints.wallet.createWallet, { ...nodeRequest }),
    {
      body: JSON.stringify(wallet),
      method: "POST",
    }
  );
};
