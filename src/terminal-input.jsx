import React from "react";

var TerminalInput = React.createClass({
    render: function() {
        var style = {
            parent: {
                fontFamily: "Courier New, Courier, Lucida Console, Consolas, Monaco",
                border: "none",
                backgroundColor: "#071404",
                color: "#ffa500",
                outline: "none",
                width: "100%",
                borderWidth: "0px",
                fontSize: "14px",
                paddingLeft: "10px",
                boxSizing: "border-box"
            }
        };

        return (
            <input style={style.parent} />
        );
    }
});

export default TerminalInput;
