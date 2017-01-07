import React from "react";

var TerminalStyle = React.createClass({
    render: function() {
        var style = {
            parent: {
                width: "100%",
                height: "800px",
                overflow: "scroll",
                backgroundColor: "#071404",
            }
        };
        if(this.props.style && this.props.style.width) style.parent.width = this.props.style.width;
        if(this.props.style && this.props.style.height) style.parent.height = this.props.style.height;
        if(this.props.style && this.props.style.backgroundColor) style.parent.backgroundColor = this.props.style.backgroundColor;

        return (
            <div style={style.parent}>
                {this.props.children}
            </div>
        );
    }
});

export default TerminalStyle;
