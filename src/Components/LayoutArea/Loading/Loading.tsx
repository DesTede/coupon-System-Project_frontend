import "./Loading.css";
import React from "react";

function Loading(): JSX.Element {
    return (
        <div className="Loading">
            <img src={"/Spinner-1s-200px.gif"} alt={"Loading"}/>
        </div>
    );
}

export default Loading;
