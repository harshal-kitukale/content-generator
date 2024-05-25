import React from "react";
import { Route, Routes } from 'react-router-dom';
import ContentForm from "./ContentForm";
import ContentDisplay from "./ContentDisplay";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" exact element={<ContentForm />} />
      <Route path="/display" element={<ContentDisplay />} />
    </Routes>
  );
};

export default AllRoutes;
