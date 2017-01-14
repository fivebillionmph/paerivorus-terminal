import React from "react";

import TerminalStyle from "./terminal-style.jsx";
import Line from "./line.jsx";
import LineStyle from "./line-style.jsx";
import TerminalInputStyle from "./terminal-input-style.jsx";
import TerminalInput from "./terminal-input.jsx";

import { maxArrayLengthFront, sharedStart } from "./helper.js";

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
            previousCommandOffset: null,
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
    addLine: function(line) {
        var textLines = this.state.textLines;
        textLines.push(line);
        this.setState({textLines: textLines});
    },
    _handleKeyEnter: function(e) {
        var newState = {};

        /* get the values */
        var value = this._input.getValue();
        var originalValue = value;

        /* check if needs to clear */
        if(originalValue === this.props.clearString) {
            newState.textLines = [];
        } else {
            /* add the ps1 */
            if(this.props.ps1) {
                value = this.props.ps1 + " " + value;
            }

            /* clear the input box */
            this._input.clearValue();

            /* add value to text lines */
            newState.textLines = this.state.textLines;
            newState.textLines.push(value);
            maxArrayLengthFront(newState.textLines, this.props.maxLines);
        }

        /* add value to commands array */
        var commands = this.state.commandLines;
        if((commands.length === 0 || commands[commands.length - 1] != originalValue) && originalValue != "") {
            newState.commandLines = commands;
            newState.commandLines.push(originalValue);
            maxArrayLengthFront(newState.commandLines, this.props.maxSavedCommands);
        }

        /* reset the history */
        newState.previousCommandOffset = null;

        this.setState(newState);

        /* send notification to prop function */
        if(typeof this.props.onCommand === "function") {
            this.props.onCommand(originalValue);
        }
    },
    _handleKeyArrow: function(e) {
        e.preventDefault();
        var newState = {};

        var change = -1;
        if(e.key === "ArrowDown") change = 1;

        var previousCommandOffset = this.state.previousCommandOffset;
        var previousCommands = this.state.commandLines;

        /* handle cases where no change should occur */
        if(previousCommandOffset === 0 && change === -1) return;
        if((previousCommandOffset >= previousCommands.length || previousCommandOffset === null) && change === 1) return;
        if(previousCommands.length === 0) return;

        if(previousCommandOffset === null) {
            /* if going up from current command, save the current command */
            newState.currentCommand = this._input.getValue();

            /* newIdx is the last element */
            newState.previousCommandOffset = previousCommands.length - 1;

            /* update the input */
            this._input.setValue(previousCommands[newState.previousCommandOffset]);
        } else if(previousCommands.length - 1 === previousCommandOffset && change === 1){
            /* when at the last previous command and user pushed down arrow to go back to current command */
            newState.previousCommandOffset = null;

            /* update the input */
            this._input.setValue(this.state.currentCommand);
        } else {
            /* change the position */
            newState.previousCommandOffset = previousCommandOffset + change;

            /* update the input */
            this._input.setValue(previousCommands[newState.previousCommandOffset]);
        }

        /* update the cursor */
        this._input.setCursorEnd();

        this.setState(newState);
    },
    _handleKeyTab: function(e) {
        e.preventDefault();
        var currentValue = this._input.getValue();
        if(currentValue == "") return;
        if(typeof this.props.tabComplete !== "object") return;
        var matches = [];
        for(var i = 0; i < this.props.tabComplete.length; i++) {
            var thisTabComplete = this.props.tabComplete[i];
            if(thisTabComplete.startsWith(currentValue)) {
                matches.push(thisTabComplete);
            }
        }
        if(matches.length == 0) {
            return;
        } else if(matches.length == 1) {
            this._input.setValue(matches[0] + " ");
        } else {
            var match = sharedStart(matches);
            for(var i = 0; i < matches.length; i++) this.addLine(matches[i]);
            this._input.setValue(match);
        }
    },
    _onClick: function() {
        this._input.focus();
    },
    _onKeyDown: function(e) {
        if(e.key === "Enter") {
            this._handleKeyEnter(e);
        } else if(e.key === "ArrowUp" || e.key === "ArrowDown") {
            this._handleKeyArrow(e);
        } else if (e.key === "Tab") {
            this._handleKeyTab(e);
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
