import { ChakraProvider, Button } from "@chakra-ui/react";
import { AuthProvider } from "contexts/AuthContext";
import { useRouter } from "next/router";
import { auth } from "components/FirebaseAuth";
import NavBarContainer from "components/NavbarContainer";

const MyApp = ({ Component, pageProps }) => {
  const route = useRouter();
  const isAuthenticated = () => route.pathname !== "/login" && route.pathname !== "/signup";
  return (
    <AuthProvider>
      <ChakraProvider>
        {isAuthenticated() && (
          <NavBarContainer>
            <Button onClick={() => auth.signOut().then(() => route.push("/login"))}>Sign out</Button>
          </NavBarContainer>
        )}

        <Component {...pageProps} />
      </ChakraProvider>
    </AuthProvider>
  );
};

export default MyApp;
