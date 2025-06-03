import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  useGetPostQuery,
  useUpdatePostMutation,
} from "../../services/postsApi";
import PostForm from "./PostForm";

const PostPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: post, error, isLoading } = useGetPostQuery(Number(id));
  const [updatePost] = useUpdatePostMutation();
  const [editMode, setEditMode] = useState(false);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading post</div>;
  if (!post) return <div>Post not found</div>;

  const handleUpdate = async ({
    title,
    body,
  }: {
    title: string;
    body: string;
  }) => {
    await updatePost({ id: post.id, title, body, userId: post.userId });
    setEditMode(false);
  };

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <button onClick={() => setEditMode((v) => !v)}>
        {editMode ? "Cancel" : "Edit"}
      </button>
      {editMode && (
        <PostForm
          initialTitle={post.title}
          initialBody={post.body}
          onSubmit={handleUpdate}
          submitLabel="Update Post"
        />
      )}
    </div>
  );
};

export default PostPage;
