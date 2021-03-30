import React, { useRef, useState } from "react";
import { useRouter } from "next/router";
import { Stack, FormControl, FormLabel, Input, Heading, Container, Button, Link, Text } from "@chakra-ui/react";
import styles from "styles/Signup.module.css";
import { useAuth } from "contexts/AuthContext";

const Login = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const onSubmit = async () => {
    setIsLoading(true);
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    try {
      if (email === "") {
        setErrors({
          email: "Email cannot be left empty",
        });
        setIsLoading(false);
        return;
      }
      if (password === "") {
        setErrors({
          password: "Please provide a password",
        });
        setIsLoading(false);
        return;
      }
      const res = await login(email, password);
      res && router.push("/");
    } catch (error) {
      setErrors({
        result: error.message,
      });
    }
    setIsLoading(false);
  };

  const renderErrors = (field: string) => {
    return <Text color="red.700">{errors[field]}</Text>;
  };

  return (
    <Stack alignItems="center">
      <Container maxW="md" className={styles.container}>
        <Heading className={styles.heading} textAlign="center">
          Log in
        </Heading>
        <Heading fontSize="lg" marginTop="4" textAlign="center">
          {renderErrors("result")}
        </Heading>
        <FormControl>
          <FormLabel>Email address</FormLabel>
          <Input id="email" type="email" ref={emailRef} />
          {renderErrors("email")}
          <FormLabel>Password</FormLabel>
          <Input id="password" type="password" ref={passwordRef} />
          {renderErrors("password")}
        </FormControl>
      </Container>
      <Button isLoading={isLoading} onClick={onSubmit} width="2xs" variant="solid" colorScheme="red">
        Login
      </Button>
      <Text>
        Don't have an account yet?{" "}
        <Link color="red.400" href="/signup">
          Sign up
        </Link>
      </Text>
    </Stack>
  );
};

export default Login;
