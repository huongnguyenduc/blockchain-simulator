import { endpoints } from "lib/constants/endpoints";
import { fetcher, getEndpoint } from "lib/services/fetcher";
import { NodeRequest } from "types";

export const getNodes = async (nodeRequest?: NodeRequest) => {
  return await fetcher(getEndpoint(endpoints.node.nodes, { ...nodeRequest }));
};
