import React from "react";
import './style.css';

const PagesList = props =>{

    const onClick = (event, index) => {
        if (event.metaKey || event.ctrlKey) {
          return;
        }
        event.preventDefault();
        props.onClicked(index);
      };

    const Pages = props.pages.map((page,index) => {
        return (
            <div key = {index} className = "side-header">
                <a href = {`/${page.title}`} className = "link" onClick={(event) => {onClick(event, index)}}>{page.title}</a>
            </div>
        )
    });

    return Pages    
}

export default PagesList;