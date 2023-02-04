import Blockchain from "components/blockchain";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import styles from "../../../styles/Home.module.css";

const Home: NextPage = () => {
  const router = useRouter();

  const { address } = router.query;
  if (!address) {
    return <div>Loading...</div>;
  }

  if (Array.isArray(address)) {
    return <div>Invalid address</div>;
  }

  // split address into ip and port
  const ip = address.split(":")[0];
  const port = address.split(":")[1];

  return (
    <div className={styles.container}>
      <Head>
        <title>Node - Blockchain Simulator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Blockchain ip={ip} port={parseInt(port)} />
    </div>
  );
};

export default Home;
