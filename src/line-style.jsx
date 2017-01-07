import React from "react";

import { userStyle } from "./helper.js";

var LineStyle = React.createClass({
    render: function() {
        var style = {
            parent: {
                fontFamily: "Courier New, Courier, Lucida Console, Consolas, Monaco",
                color: "#ffa500",
                marginLeft: "10px",
                marginTop: "5px",
                marginBottom: "5px"
            }
        };
        style.parent = userStyle(style.parent, this.props.style);

        return (
            <span style={style.parent}>
                {this.props.children}
            </span>
        );
    }
});

export default LineStyle;
