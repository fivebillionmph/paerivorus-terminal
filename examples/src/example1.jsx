import React from "react";
import ReactDOM from "react-dom";

import Terminal from "../../index.js";

const style = {
    height: "800px",
    width: "500px"
};

var Content = React.createClass({
    _terminalCommand: function(value) {
        console.log(value);
    },
    render: function() {
        return (
            <div style={style}>
                <Terminal ps1={"$"} tabComplete={["run", "values", "vals", "test"]} clearString={"clear"} commandFun={this._terminalCommand}/>
            </div>
        );
    }
});

ReactDOM.render(
    <Content />,
    document.getElementById("main")
);
