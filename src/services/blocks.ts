import { endpoints } from "lib/constants/endpoints";
import { fetcher, getEndpoint } from "lib/services/fetcher";
import { NodeRequest } from "types";

export const getBlocks = async (blockRequest: NodeRequest) => {
  return await fetcher(
    getEndpoint(endpoints.blocks.blocks, { ...blockRequest })
  );
};
