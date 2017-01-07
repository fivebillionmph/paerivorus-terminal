import React from "react";

var Line = React.createClass({
    render: function() {
        return (
            <span>{this.props.text}</span>
        );
    }
});

export default Line;
