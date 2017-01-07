import React from "react";

import TerminalStyle from "./terminal-style.jsx";
import Line from "./line.jsx";

var Terminal = React.createClass({
    getInitialState: function() {
        return {
            textLines: ['test', '123']
        }
    },
    render: function() {
        var that = this;

        return (
            <TerminalStyle style={this.props.style}>
                {
                    this.state.textLines.map(function(text, idx) {
                        return (
                            <span key={"line"+idx}>
                                <Line text={text} style={that.props.style} /><br/>
                            </span>
                        );
                    })
                }
            </TerminalStyle>
        );
    }
});

export default Terminal;
