import React from "react";
import { useAddPostMutation } from "../../services/postsApi";
import PostForm from "./PostForm";

const AddPostForm = () => {
  const [addPost] = useAddPostMutation();

  const handleAdd = async ({
    title,
    body,
  }: {
    title: string;
    body: string;
  }) => {
    await addPost({ title, body, userId: 1 });
  };

  return <PostForm onSubmit={handleAdd} submitLabel="Add Post" />;
};

export default AddPostForm;
