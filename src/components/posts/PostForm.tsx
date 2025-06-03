import React, { useState, useEffect } from "react";

type PostFormProps = {
  initialTitle?: string;
  initialBody?: string;
  onSubmit: (data: { title: string; body: string }) => Promise<void>;
  submitLabel?: string;
};

const PostForm: React.FC<PostFormProps> = ({
  initialTitle = "",
  initialBody = "",
  onSubmit,
  submitLabel = "Submit",
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [body, setBody] = useState(initialBody);

  useEffect(() => {
    setTitle(initialTitle);
    setBody(initialBody);
  }, [initialTitle, initialBody]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({ title, body });
    setTitle("");
    setBody("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Body"
      />
      <button type="submit">{submitLabel}</button>
    </form>
  );
};

export default PostForm;