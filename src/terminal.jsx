import React from "react";

import TerminalStyle from "./terminal-style.jsx";
import Line from "./line.jsx";
import LineStyle from "./line-style.jsx";
import TerminalInputStyle from "./terminal-input-style.jsx";
import TerminalInput from "./terminal-input.jsx";

const style = {
    parent: {
        height: "100%",
        width: "100%",
        display: "inline-block"
    }
};

var Terminal = React.createClass({
    getInitialState: function() {
        return {
            textLines: ['test', '123']
        }
    },
    render: function() {
        var that = this;

        return (
            <div style={style.parent}>
                <TerminalStyle style={this.props.style}>
                    {
                        this.state.textLines.map(function(text, idx) {
                            return (
                                <span key={"line"+idx}>
                                    <LineStyle style={that.props.style}>
                                        <Line text={text} /><br/>
                                    </LineStyle>
                                </span>
                            );
                        })
                    }
                </TerminalStyle>
                <TerminalInputStyle style={this.props.style}>
                    <TerminalInput style={this.props.style} ps1={this.props.ps1} />
                </TerminalInputStyle>
            </div>
        );
    }
});

export default Terminal;
