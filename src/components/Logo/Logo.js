import React from "react";
import Tilt from "react-parallax-tilt";
import brain from "./brain.png";
import "./Logo.css";

function Logo(props) {
    return (
        <div className="ml5 center">
            <Tilt className="Tilt br2 shadow-2" options={{ max: 55 }}>
                <div className="Tilt-inner pa3">
                    <img style={{ paddingTop: "5px" }} alt="logo" src={brain} />
                </div>
            </Tilt>
        </div>
    );
}

export default Logo;
