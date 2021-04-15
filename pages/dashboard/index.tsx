import React, { useState, useEffect } from "react";
import { Box, Heading, Image, Button, SimpleGrid, Container, Input, FormLabel } from "@chakra-ui/react";
import { Editor } from "@tinymce/tinymce-react";
import { Editor as TinyMCEEditor } from "tinymce";
import { useAuth } from "contexts/AuthContext";
import jwt_decode from "jwt-decode";
import { useRouter } from "next/router";
import axios from "axios";
import env from ".env";

const Dashboard = () => {
  const [isNew, setIsNew] = useState(false);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const route = useRouter();
  const { blogs, currentUser } = useAuth();

  const handleSubmit = () => {
    axios.post(
      `${env.backendUrl}/blogs`,
      {
        title,
        image,
        content,
      },
      {
        headers: {
          Authorization: `Bearer ${currentUser}`,
        },
      }
    );
  };

  useEffect(() => {
    if (!currentUser) {
      route.push("/login");
    } else {
      const user: any = jwt_decode(currentUser);
      if (user && user.role !== "admin") {
        route.push("/blogs");
      }
    }
  }, [blogs]);

  const handleEditorChange = (value: string, ed: TinyMCEEditor) => {
    setContent(value);
  };

  const onDelete = (id: string) => {
    axios.delete(`${env.backendUrl}/blogs/${id}`, {
      headers: {
        Authorization: `Bearer ${currentUser}`,
      },
    });
  };

  const renderCards = (item: IBlogCard) => {
    return (
      <Box
        key={Math.random()
          .toString(36)
          .replace(/[^a-z]+/g, "")
          .substr(0, 5)}
        bg="tomato"
        padding="2">
        <Container
          cursor="pointer"
          onClick={() => {
            route.push(`/dashboard/${item.id}`);
          }}>
          <Image src={item.image} alt={item.alt} />
          <Heading fontSize="20px">{item.title}</Heading>
        </Container>
        <Button onClick={() => onDelete(item.id)}>Delete?</Button>
      </Box>
    );
  };
  return (
    <Container margin="6rem 0" maxW="100%" display="flex" flexDirection="row" alignContent="center">
      <Container>
        <SimpleGrid columns={3} spacing={10}>
          {blogs.map((item) => renderCards(item))}
        </SimpleGrid>
        <Button margin="rem" onClick={() => setIsNew(!isNew)}>
          {isNew ? "Close the editor! I'm not uploading" : "Create new blog? Click here"}
        </Button>
      </Container>
      <Container>
        {isNew && (
          <Container>
            <FormLabel>Title goes here</FormLabel>
            <Input
              marginBottom="4rem"
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <FormLabel>Image here (String only be cause I haven't had the time to make a dropzone)</FormLabel>
            <Input
              marginBottom="4rem"
              id="title"
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
            <Editor
              value={content}
              init={{
                height: 500,
                menubar: false,
                plugins: [
                  "advlist autolink lists link image charmap print preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table paste code help wordcount",
                ],
                toolbar:
                  "undo redo | formatselect | bold italic backcolor | \
               alignleft aligncenter alignright alignjustify | \
               bullist numlist outdent indent | removeformat | help",
              }}
              onEditorChange={handleEditorChange}
              outputFormat="text"
            />
            <Button onClick={() => handleSubmit()}>Upload</Button>
          </Container>
        )}
      </Container>
    </Container>
  );
};
export default Dashboard;
