import React, { useState } from "react";

const SearchBar = (props) => {
  const [term, setTerm] = useState("");

  const onFormSubmit = (event) => {
    event.preventDefault();
    props.onSubmit(term);
  };

  return (
    <div className="ui segment">
      <form onSubmit={onFormSubmit} className="ui form">
        <div className="field">
          <label>Enter URL for the document</label>
          <div className="search">
            <input
              type="text"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
            />
            <button>Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
