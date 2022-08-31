import React from "react";
import "./style.css";

const PagesList = (props) => {
  const onClick = (event, index) => {
    event.preventDefault();
    props.onClicked(index);
  };

  return (
    <>
      {props.pages.map((page, index) => (
        <div key={page.title} className="side-header">
          <a
            href={`/${page.title}`}
            onClick={(event) => {
              onClick(event, index);
            }}
            className={props.pageClicked === index ? "selected-link" : "link"}
          >
            {page.title}
          </a>
        </div>
      ))}
    </>
  );
};

export default PagesList;
