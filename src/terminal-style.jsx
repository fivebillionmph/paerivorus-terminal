import React from "react";

import { userStyle } from "./helper.js";

var TerminalStyle = React.createClass({
    render: function() {
        var that = this;

        var style = {
            parent: {
                width: "100%",
                overflow: "scroll",
                backgroundColor: "#071404",
                margin: "0px",
                boxSizing: "border-box",
                display: "block",
                height: "90%"
            }
        };
        style.parent = userStyle(style.parent, this.props.style);

        return (
            <div style={style.parent} ref={function(el) { that._parent = el; }}>
                {this.props.children}
            </div>
        );
    }
});

export default TerminalStyle;
