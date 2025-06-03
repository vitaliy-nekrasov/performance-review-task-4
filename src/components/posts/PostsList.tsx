import React from "react";
import { useGetPostsQuery } from "../../services/postsApi";
import AddPostForm from "./AddPostForm";
import { Link } from "react-router-dom";

const PostsList = () => {
  const { data: posts, error, isLoading } = useGetPostsQuery(1);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading posts</div>;

    return (
      <div>
        <ul>
          {posts?.map((post) => (
            <li key={post.id}>
              <h3>
                <Link to={`/posts/${post.id}`}>{post.title}</Link>
              </h3>
              <p>{post.body}</p>
            </li>
          ))}
            </ul>
            <AddPostForm/>
      </div>
    );
};

export default PostsList;
