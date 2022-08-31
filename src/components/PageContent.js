import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "./style.css";
function PageContent({ page }) {
  return (
    <div className="body-text">
      <div className="content">
        <h1 className="h1">{page.title}</h1>
      </div>
      <div className="content">
        <ReactMarkdown children={page.bodyText} remarkPlugins={[remarkGfm]} />
      </div>
    </div>
  );
}

export default PageContent;
