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
            textLines: []
        };
    },
    getDefaultProps: function() {
        return {
            maxLines: 50
        };
    },
    componentDidUpdate: function() {
        this._scrollToBottom();
    },
    _onClick: function() {
        this._input.focus();
    },
    _onKeyDown: function(e) {
        if(e.key === "Enter") {
            var value = this._input.getValue();
            var originalValue = value;
            if(this.props.ps1) {
                value = this.props.ps1 + " " + value;
            }
            this._input.clearValue();
            var lines = this.state.textLines;
            lines.push(value);
            var infiniteCounter = 0;    // prevent infinite loop
            while(lines.length > this.props.maxLines) {
                infiniteCounter++;
                lines.shift();
                if(infiniteCounter > 100) break;
            }
            this.setState({textLines: lines});
        }
        this._scrollToBottom();
    },
    _scrollToBottom: function() {
        this._bottomLine.scrollIntoView();
    },
    render: function() {
        var that = this;

        return (
            <div style={style.parent} onClick={this._onClick} onKeyDown={this._onKeyDown}>
                <TerminalStyle style={this.props.style} ref={function(el) { that._terminalWrapper = el; }} >
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
                    <span ref={function(el) { that._bottomLine = el; }}></span>
                </TerminalStyle>
                <TerminalInputStyle style={this.props.style}>
                    <TerminalInput style={this.props.style} ps1={this.props.ps1} ref={function(el) { that._input = el; }} />
                </TerminalInputStyle>
            </div>
        );
    }
});

export default Terminal;
