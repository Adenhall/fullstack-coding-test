import React, { useRef, useState } from "react";
import { useRouter } from "next/router";
import { Stack, FormControl, FormLabel, Input, Heading, Container, Button, Link, Text } from "@chakra-ui/react";
import styles from "styles/Signup.module.css";
import { useAuth } from "contexts/AuthContext";

const SignUp = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { signUp } = useAuth();
  const router = useRouter();

  const onSubmit = async () => {
    setIsLoading(true);
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;
    try {
      if (email === "") {
        setErrors({
          email: "Email cannot be left empty",
        });
        setIsLoading(false);
        return;
      }
      if (!password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)) {
        setErrors({
          password:
            "Password must contain at least 8 characters, at least 1 digit, at least one uppercase letter, at least one lowercase letter",
        });
        setIsLoading(false);
        return;
      }
      if (password === confirmPassword) {
        const res = await signUp(email, password);
        res && router.push("/");
      } else {
        setErrors({
          confirmPassword: "Passwords must match",
        });
      }
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
          Sign up
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
          <FormLabel>Confirm password</FormLabel>
          <Input id="confirm-password" type="password" ref={confirmPasswordRef} />
          {renderErrors("confirmPassword")}
        </FormControl>
      </Container>
      <Button isLoading={isLoading} onClick={onSubmit} width="2xs" variant="solid" colorScheme="red">
        Get signed up!
      </Button>
      <Text>
        Already have an account?{" "}
        <Link color="red.400" href="/login">
          Log in!
        </Link>
      </Text>
    </Stack>
  );
};

export default SignUp;
