// components/contentDisplay.js
import React from "react";
import { useSelector } from "react-redux";
import "../CSS/ContentDisplay.css";

const ContentDisplay = () => {
  const { content, loading } = useSelector((state) => state);
  const formattedContent =
    content.length > 0
      ? content
          .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")
          .replace(/^\*\s(.*?):$/gm, "<ol><li>$1:</li></ol>")
          .replace(/^\* (.*)$/gm, '<li>$1</li>')
          .replace(/\n\n/g, "<br>")
          .replace(/\n/g, "<br>")
      : [];
  return loading ? (
    <div className="content-display">
      <h2 className="content-header">Loading...</h2>
    </div>
  ) : (
    <div className="content-display">
      <h2 className="content-header"> Generated Content</h2>
      <div className="content-line">
        {/* {formattedContent.map((el, index) => (
          <p key={index}>
            {el}
          </p>
      ))} */}
        <div dangerouslySetInnerHTML={{ __html: formattedContent }} />
      </div>
    </div>
  );
};

export default ContentDisplay;
