import styles from "components/Flow/Flow.module.css";
import { Node } from "reactflow";
import { BlockchainBlock } from "types";

export const initialBlocks: Node<BlockchainBlock>[] = [
  {
    id: "5",
    data: {
      header: {
        parent:
          "0000000000000000000000000000000000000000000000000000000000000000",
        number: 0,
        nonce: 2206145260,
        time: 1675097133,
        miner: "0x1ca702511977ea6f0ac69488755e1e5a518d2627",
      },
      payload: [
        {
          from: "0x0eba9c7ad60e5c0e45a709f93af2a7a4bbfcd9c1",
          to: "0x74e481c83e0f1831629085610d87699b4240330f",
          value: 100,
          nonce: 1,
          data: "abc",
          time: 1675097130,
          signature:
            "pgjxr3nsbCWzYyu+2Aqu4dKs6a9dOBxb9r0WKe/dLGoqG7MkxURpaUOG2nK363IJqv+BEx7j1RPvHYQGgNECtAE=",
        },
      ],
    },
    position: { x: 150, y: 5 },
    type: "custom",
    className: styles.customNode,
  },
  {
    id: "6",
    data: {
      header: {
        parent:
          "00001a43226c3254357135081f7bb8749adcf95ed5277329ce4b113e6946bc14",
        number: 1,
        nonce: 4292689820,
        time: 1675097160,
        miner: "0x0eba9c7ad60e5c0e45a709f93af2a7a4bbfcd9c1",
      },
      payload: [
        {
          from: "0x0eba9c7ad60e5c0e45a709f93af2a7a4bbfcd9c1",
          to: "0x74e481c83e0f1831629085610d87699b4240330f",
          value: 100,
          nonce: 2,
          data: "abc",
          time: 1675097159,
          signature:
            "rBdrlRXLNeJZ5Aoqoqd2ttEjxi4bKaDqHNuwYpDd2qsQUNellk2a/PqWzHjhEnUJTGtYB+9R3ES6NcakF6LwHQA=",
        },
      ],
    },
    position: { x: 100, y: 330 },
    type: "custom",
    className: styles.customNode,
  },
  {
    id: "7",
    data: {
      header: {
        parent:
          "00002f17ce06b874c4e99f0a323e1902f8ca086f162f4cf72082eedeb157fed4",
        number: 2,
        nonce: 3080515574,
        time: 1675097173,
        miner: "0x0eba9c7ad60e5c0e45a709f93af2a7a4bbfcd9c1",
      },
      payload: [
        {
          from: "0x0eba9c7ad60e5c0e45a709f93af2a7a4bbfcd9c1",
          to: "0x74e481c83e0f1831629085610d87699b4240330f",
          value: 100,
          nonce: 3,
          data: "abc",
          time: 1675097172,
          signature:
            "vZTwgU4d3v6bVqkhse5Gk2rN4poSeZuKofmu3ietKfRy9TXUzEzAoOiX4bjR5h+6YIfQiEYArv1kdrv44J6y6wA=",
        },
      ],
    },
    position: { x: 600, y: 100 },
    type: "custom",
    className: styles.customNode,
  },
  {
    id: "8",
    data: {
      header: {
        parent:
          "000037320b7468f0da9410b95bac9a8bdf46f80817bf75327a73cc876a07b4c2",
        number: 3,
        nonce: 45155428,
        time: 1675097293,
        miner: "0x0eba9c7ad60e5c0e45a709f93af2a7a4bbfcd9c1",
      },
      payload: [
        {
          from: "0x0eba9c7ad60e5c0e45a709f93af2a7a4bbfcd9c1",
          to: "0x74e481c83e0f1831629085610d87699b4240330f",
          value: 100,
          nonce: 4,
          data: "abc",
          time: 1675097292,
          signature:
            "BFi1egR642+aKamTToLrlnKMKlTB9R97Zw8VVv3RuL1ywJqYZkVkx4UY0eN+0gE5eLcPMYRWkL2zEV2UQqSwTAE=",
        },
      ],
    },
    position: { x: 600, y: 330 },
    type: "custom",
    className: styles.customNode,
  },
];
