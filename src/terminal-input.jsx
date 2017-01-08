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
    getValue: function() {
        var value = this.state.value;
        value = value.replace(this.props.ps1 + " ", "");
        return value;
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
    render: function() {
        var that = this;

        var style = {
            parent: {
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
        style.parent = userStyle(style.parent, this.props.style);

        return (
            <input value={this.state.value} onChange={this._onChange} style={style.parent} ref={function(el) { that._input = el; }} />
        );
    }
});

export default TerminalInput;
