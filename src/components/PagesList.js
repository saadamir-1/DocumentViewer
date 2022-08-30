import React from "react";
import Link from "./Link";

const PagesList = props =>{

    console.log(props);

    const Pages = props.pages.map((page,index) => {
        return (
            <div key = {index} className = "side-header" onClick = { () => {props.onClicked(index)}} >
                <Link href = {`/${page.title}`} className = "item" >{page.title}</Link>
            </div>
        )
    });

    return Pages    
}

export default PagesList;