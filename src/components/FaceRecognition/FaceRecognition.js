import React from "react";
import "./FaceRecognition.css";

function FaceRecognition({ box, imageURL }) {
    // console.log(box);
    return (
        <div className="center ma">
            <div className="absolute mt2">
                {imageURL !== "" && <img id="inputimage" alt="test" src={imageURL} width="550px" height="auto" />}
                {box.map((b, index) => (
                    <div
                        key={index}
                        className="bounding-box"
                        style={{
                            top: b.topRow,
                            right: b.rightCol,
                            bottom: b.bottomRow,
                            left: b.leftCol,
                        }}
                    ></div>
                ))}
            </div>
        </div>
    );
}

export default FaceRecognition;
