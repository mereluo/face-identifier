import React from "react";

function Rank({ name, entries }) {
    return (
        <div className="pa2">
            <div className="white f4">{`${name}, your current entry count is...`}</div>
            <div className="center white f2 bb b--purple w-60">{entries}</div>
        </div>
    );
}

export default Rank;
