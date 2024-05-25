// components/ContentForm.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContent } from "../Redux/actions";
import "../CSS/ContentForm.css";

const ContentForm = () => {
  const [prompt, setPrompt] = useState("");
  const dispatch = useDispatch();
  const {error,loading} = useSelector((state) => state);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (prompt == "") {
      alert("Please enter prompt");
    } else {
      dispatch(fetchContent(prompt));
    }
  };

  return (
    <div className="content-form">
      <div className="app-heading">
        <h1>Your Content App</h1>
        <p>This Content is generated by GeminiAI.</p>
      </div>

      <form onSubmit={handleSubmit}>
        <input
          className="content-input"
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter a prompt"
        />
        <button className="content-button" type="submit">
          Generate Content
        </button>
        <p className="content-error">{loading?"":error}</p>
      </form>
    </div>
  );
};

export default ContentForm;
