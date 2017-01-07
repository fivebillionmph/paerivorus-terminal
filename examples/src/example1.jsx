import React from "react";
import ReactDOM from "react-dom";

import Terminal from "../../index.js";

var Content = React.createClass({
    render: function() {
        return (
            <Terminal />
        );
    }
});

ReactDOM.render(
    <Content />,
    document.getElementById("main")
);
