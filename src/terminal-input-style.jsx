import React from "react";

import { userStyle} from "./helper.js";

var TerminalInputStyle = React.createClass({
    render: function() {
        var style = {
            parent: {
                display: "block",
                width: "100%",
                backgroundColor: "#071404",
                boxSizing: "border-box"
            }
        };
        style.parent = userStyle(style.parent, this.props.style);

        return (
            <div style={style.parent}>
                {this.props.children}
            </div>
        );
    }
});

export default TerminalInputStyle;
