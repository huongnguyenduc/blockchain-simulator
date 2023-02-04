export const endpoints = {
  node: {
    // GET: Get nodes
    nodes: "/node/info",
  },
  blocks: {
    // GET: Get blocks
    blocks: "/node/blocks",
  },
  transactions: {
    // POST: Send transaction
    sendTransaction: "/tx/add",
  },
  wallet: {
    // POST: Create wallet
    createWallet: "/account",
  },
  balances: {
    // GET: Get balances
    balances: "/balances/list",
  },
};
