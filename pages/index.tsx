import Head from "next/head";
import styles from "styles/Home.module.css";
import { Input, Box, Stack } from "@chakra-ui/react"
import DynamicText from "components/DynamicText";

const Home = () => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  return (
    <Box className={styles.container}>
      <Head>
        <title>Coding Test</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Stack className={styles.main}>
        <DynamicText />
        <Input onChange={onChange} />
      </Stack>
    </Box>
  );
};

export default Home;
