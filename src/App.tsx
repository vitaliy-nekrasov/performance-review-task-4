import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UsersList from "./components/posts/UsersList";
import UserPage from "./components/posts/UserPage";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<UsersList />} />
      <Route path="/posts/:id" element={<UserPage />} />
    </Routes>
  </Router>
);

export default App;
