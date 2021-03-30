import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "contexts/AuthContext";

const MyApp = ({ Component, pageProps }) => {
  return (
    <AuthProvider>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </AuthProvider>
  );
};

export default MyApp;
