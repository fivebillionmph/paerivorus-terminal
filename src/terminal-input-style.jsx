import React from "react";

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

        return (
            <div style={style.parent}>
                {this.props.children}
            </div>
        );
    }
});

export default TerminalInputStyle;
