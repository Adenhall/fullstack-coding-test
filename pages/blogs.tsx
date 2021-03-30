import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  SimpleGrid,
  Box,
  Container,
  Heading,
  Image,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Text,
} from "@chakra-ui/react";
import { useAuth } from "contexts/AuthContext";

const Blog = () => {
  const [showModal, setShowModal] = useState(false);
  const { blogs, currentUser } = useAuth();
  const router = useRouter();
  const [itemDetails, setItemDetails] = useState({
    src: "",
    alt: "",
    heading: "",
    content: "",
  });
  const renderCards = (item: IBlogCard) => {
    return (
      <Box
        key={Math.random()
          .toString(36)
          .replace(/[^a-z]+/g, "")
          .substr(0, 5)}
        onClick={() => {
          setItemDetails(item);
          setShowModal(true);
        }}
        bg="tomato"
        padding="2">
        <Image src={item.src} alt={item.alt} />
        <Heading fontSize="20px">{item.heading}</Heading>
      </Box>
    );
  };

  useEffect(() => {
    if (!currentUser) {
      router.push("/login");
    }
  }, [blogs]);

  const renderCardModal = (item: IBlogCard) => {
    return (
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{item.heading}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Image src={item.src} alt={item.alt} />
            <Text>{item.content}</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={() => setShowModal(false)}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };
  return (
    <Container maxW="50rem" marginTop="8rem">
      <Heading textAlign="center" marginBottom="5rem">
        New stories
      </Heading>
      <SimpleGrid columns={3} spacing={10}>
        {blogs.map((item) => renderCards(item))}
      </SimpleGrid>
      {renderCardModal(itemDetails)}
    </Container>
  );
};

export default Blog;
