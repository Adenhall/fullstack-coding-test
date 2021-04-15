import React, { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Editor as TinyMCEEditor } from "tinymce";
import { Button, Container, Input, FormLabel } from "@chakra-ui/react";
import axios from "axios";
import { useAuth } from "contexts/AuthContext";
import { useRouter } from "next/router";
import env from ".env";

const Dashboard = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const { currentUser } = useAuth();
  const { blog } = router.query;

  useEffect(() => {
    if (!currentUser) {
      router.push("/login");
    }
    const fetchData = async () => {
      try {
        const res = await axios.get(`${env.backendUrl}/blogs/${blog}`, {
          headers: {
            Authorization: `Bearer ${currentUser}`,
          },
        });
        if (res) {
          setContent(res?.data?.content);
          setImage(res?.data?.image);
          setTitle(res?.data?.title);
        }
      } catch (error) {
        throw error;
      }
    };
    fetchData();
  }, [blog]);

  const handleEditorChange = (value: string, ed: TinyMCEEditor) => {
    setContent(value);
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.put(
        `${env.backendUrl}/blogs/${blog}`,
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
      if (res) {
        setContent(res?.data?.content);
        setImage(res?.data?.image);
        setTitle(res?.data?.title);
      }
    } catch (error) {
      throw error;
    }
  };
  return (
    <Container>
      <FormLabel>Title goes here</FormLabel>
      <Input marginBottom="4rem" id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      <FormLabel>Image here (String only be cause I haven't had the time to make a dropzone)</FormLabel>
      <Input marginBottom="4rem" id="title" type="text" value={image} onChange={(e) => setImage(e.target.value)} />
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
      <Button onClick={() => handleSubmit()}>Update</Button>
    </Container>
  );
};
export default Dashboard;
