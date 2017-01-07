import React from "react";
import ReactDOM from "react-dom";

import Terminal from "../../index.js";

const style = {
    height: "800px",
    width: "500px"
};

var Content = React.createClass({
    render: function() {
        return (
            <div style={style}>
                <Terminal />
            </div>
        );
    }
});

ReactDOM.render(
    <Content />,
    document.getElementById("main")
);
