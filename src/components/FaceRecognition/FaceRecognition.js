import React from "react";
import "./FaceRecognition.css";

function FaceRecognition({ box, imageURL }) {
    return (
        <div className="center ma">
            <div className="absolute mt2">
                {imageURL !== "" && <img id="inputimage" alt="test" src={imageURL} width="500px" height="auto" />}
                <div className="bounding-box" style={{ top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol }}></div>
            </div>
        </div>
    );
}

export default FaceRecognition;
