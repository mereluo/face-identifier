import React from "react";
import "./ImageLinkForm.css";

function ImageLinkForm({ onInputChange, onButtonSubmit }) {
    return (
        <div>
            <p className="f4">
                {"We can detect faces in your pictures."}
                <br></br> {"Give it a try by entering the picture url here!"}
            </p>
            <div className="center">
                <div className="form center pa2 shadow-5 br2">
                    <input className="f5 pa2 w-70 center br2" type="tex" onChange={onInputChange} />
                    <button className="w-30 grow f5 link ph3 pv2 dib br2 white bg-light-purple" onClick={onButtonSubmit}>
                        Detect
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;
