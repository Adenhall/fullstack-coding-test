import { useRef } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import styles from "styles/Home.module.css";
import { Input, Box, Container, Button } from "@chakra-ui/react";
import DynamicText from "components/DynamicText";

const Home = () => {
  const dynamicHeadingRef = useRef(null);
  const router = useRouter();
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dynamicHeadingRef.current.changeValue(e.target.value);
  };

  return (
    <Box className={styles.container}>
      <Head>
        <title>Coding Test</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container maxW="md" className={styles.main}>
        <DynamicText ref={dynamicHeadingRef} />
        <Input onChange={onChange} />
        <Button onClick={() => router.push("/blogs")}>To the blogs!</Button>
      </Container>
    </Box>
  );
};

export default Home;
