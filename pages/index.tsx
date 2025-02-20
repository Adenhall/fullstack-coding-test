import { useRef } from 'react'
import Head from "next/head";
import styles from "styles/Home.module.css";
import { Input, Box, Container } from "@chakra-ui/react"
import DynamicText from "components/DynamicText";

const Home = () => {
  const dynamicHeadingRef = useRef(null)
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value, dynamicHeadingRef);
    dynamicHeadingRef.current.changeValue(e.target.value)
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
      </Container>
    </Box>
  );
};

export default Home;
