import React from "react";

import TerminalStyle from "./terminal-style.jsx";
import Line from "./line.jsx";
import LineStyle from "./line-style.jsx";
import TerminalInputStyle from "./terminal-input-style.jsx";
import TerminalInput from "./terminal-input.jsx";

import { maxArrayLengthFront } from "./helper.js";

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
            textLines: [],
            commandLines: [],
            previousCommandOffset: 1,
            currentCommand: ""
        };
    },
    getDefaultProps: function() {
        return {
            maxLines: 50,
            maxSavedCommands: 50
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
            /* get the values */
            var value = this._input.getValue();
            var originalValue = value;

            /* add the ps1 */
            if(this.props.ps1) {
                value = this.props.ps1 + " " + value;
            }

            /* clear the input box */
            this._input.clearValue();

            /* add value to text lines */
            var lines = this.state.textLines;
            lines.push(value);
            maxArrayLengthFront(lines, this.props.maxLines);

            /* add value to commands array */
            var commands = this.state.commandLines;
            commands.push(originalValue);
            maxArrayLengthFront(commands, this.props.maxSavedCommands);

            this.setState({textLines: lines, commandLines: commands});
        }// else if(e.key === "ArrowUp" || e.key === "ArrowDown") {
         //   var change = -1;
         //   if(e.key === "ArrowDown") change = 1;

         //   var previousCommandOffset = this.state.previousCommandOffset;
         //   if(previousCommandOffset === -1 && change === -1) return;
         //   if(previousCommandOffset === >=
        //}
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
