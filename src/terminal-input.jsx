import React from "react";

import { userStyle } from "./helper.js";

var TerminalInput = React.createClass({
    getInitialState: function() {
        var value = "";
        if(this.props.ps1) {
            value = this.props.ps1 + " ";
        }
        return {value: value};
    },
    componentWillReceiveProps(nextprops) {
        if(nextprops.ps1 != this.props.ps1) {
            var value = this.state.value;
            if(this.props.ps1) {
                value = value.replace(this.props.ps1 + " ", "");
            }
            if(nextprops.ps1) {
                value = nextprops.ps1 + " " + value;
            }
            this.setState({value: value});
        }
    },
    _onChange: function(e) {
        var newValue = e.target.value;
        if(this.props.ps1) {
            if(newValue == "") {
                newValue = this.props.ps1 + " ";
            } else if(newValue == this.props.ps1) {
                newValue += " ";
            } else if(!newValue.startsWith(this.props.ps1 + " ")) {
                newValue = this.props.ps1 + " " + newValue;
            }
        }
        this.setState({value: newValue});
    },
    _onSelect: function() {
        if(this.props.ps1) {
            var selectionStart = this._input.selectionStart;
            if(selectionStart <= this.props.ps1.length) {
                this._input.selectionStart = this.props.ps1.length + 1;
            }
        }
    },
    getValue: function() {
        var value = this.state.value;
        value = value.replace(this.props.ps1 + " ", "");
        return value;
    },
    setValue: function(val) {
        var newValue = val;
        if(this.props.ps1) {
            newValue = this.props.ps1 + " " + newValue;
        }
        this.setState({value: newValue});
    },
    clearValue: function() {
        var value = "";
        if(this.props.ps1) {
            value = this.props.ps1 + " " + value;
        }
        this.setState({value: value});
    },
    focus: function() {
        this._input.focus();
    },
    setCursorEnd: function() {
        var value = this._input.value;
        this._input.selectionStart = value.length;
    },
    render: function() {
        var that = this;

        var style = {
            input: {
                fontFamily: "Courier New, Courier, Lucida Console, Consolas, Monaco",
                border: "none",
                backgroundColor: "#071404",
                color: "#ffa500",
                outline: "none",
                width: "100%",
                borderWidth: "0px",
                fontSize: "14px",
                paddingLeft: "10px",
                boxSizing: "border-box"
            }
        };
        style.input = userStyle(style.input, this.props.style);

        return (
            <span>
                <input onSelect={this._onSelect} value={this.state.value} onChange={this._onChange} style={style.input} ref={function(el) { that._input = el; }} autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false" />
            </span>
        );
    }
});

export default TerminalInput;
