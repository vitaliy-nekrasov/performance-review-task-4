import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PostsList from "./components/posts/PostsList";
import PostPage from "./components/posts/PostPage";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<PostsList />} />
      <Route path="/posts/:id" element={<PostPage />} />
    </Routes>
  </Router>
);

export default App;
