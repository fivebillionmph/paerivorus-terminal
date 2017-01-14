/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Terminal = undefined;

	var _terminal = __webpack_require__(1);

	var _terminal2 = _interopRequireDefault(_terminal);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _terminal2.default;
	exports.Terminal = _terminal2.default;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _terminalStyle = __webpack_require__(3);

	var _terminalStyle2 = _interopRequireDefault(_terminalStyle);

	var _line = __webpack_require__(5);

	var _line2 = _interopRequireDefault(_line);

	var _lineStyle = __webpack_require__(6);

	var _lineStyle2 = _interopRequireDefault(_lineStyle);

	var _terminalInputStyle = __webpack_require__(7);

	var _terminalInputStyle2 = _interopRequireDefault(_terminalInputStyle);

	var _terminalInput = __webpack_require__(8);

	var _terminalInput2 = _interopRequireDefault(_terminalInput);

	var _helper = __webpack_require__(4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var style = {
	    parent: {
	        height: "100%",
	        width: "100%",
	        display: "inline-block"
	    }
	};

	var Terminal = _react2.default.createClass({
	    displayName: "Terminal",

	    getInitialState: function getInitialState() {
	        return {
	            textLines: [],
	            commandLines: [],
	            previousCommandOffset: null,
	            currentCommand: ""
	        };
	    },
	    getDefaultProps: function getDefaultProps() {
	        return {
	            maxLines: 50,
	            maxSavedCommands: 50
	        };
	    },
	    componentDidUpdate: function componentDidUpdate() {
	        this._scrollToBottom();
	    },
	    addLine: function addLine(line) {
	        var textLines = this.state.textLines;
	        textLines.push(line);
	        this.setState({ textLines: textLines });
	    },
	    _handleKeyEnter: function _handleKeyEnter(e) {
	        var newState = {};

	        /* get the values */
	        var value = this._input.getValue();
	        var originalValue = value;

	        /* check if needs to clear */
	        if (originalValue === this.props.clearString) {
	            newState.textLines = [];
	        } else {
	            /* add the ps1 */
	            if (this.props.ps1) {
	                value = this.props.ps1 + " " + value;
	            }

	            /* clear the input box */
	            this._input.clearValue();

	            /* add value to text lines */
	            newState.textLines = this.state.textLines;
	            newState.textLines.push(value);
	            (0, _helper.maxArrayLengthFront)(newState.textLines, this.props.maxLines);
	        }

	        /* add value to commands array */
	        var commands = this.state.commandLines;
	        if ((commands.length === 0 || commands[commands.length - 1] != originalValue) && originalValue != "") {
	            newState.commandLines = commands;
	            newState.commandLines.push(originalValue);
	            (0, _helper.maxArrayLengthFront)(newState.commandLines, this.props.maxSavedCommands);
	        }

	        /* reset the history */
	        newState.previousCommandOffset = null;

	        this.setState(newState);

	        /* send notification to prop function */
	        if (typeof this.props.onCommand === "function") {
	            this.props.onCommand(originalValue);
	        }
	    },
	    _handleKeyArrow: function _handleKeyArrow(e) {
	        e.preventDefault();
	        var newState = {};

	        var change = -1;
	        if (e.key === "ArrowDown") change = 1;

	        var previousCommandOffset = this.state.previousCommandOffset;
	        var previousCommands = this.state.commandLines;

	        /* handle cases where no change should occur */
	        if (previousCommandOffset === 0 && change === -1) return;
	        if ((previousCommandOffset >= previousCommands.length || previousCommandOffset === null) && change === 1) return;
	        if (previousCommands.length === 0) return;

	        if (previousCommandOffset === null) {
	            /* if going up from current command, save the current command */
	            newState.currentCommand = this._input.getValue();

	            /* newIdx is the last element */
	            newState.previousCommandOffset = previousCommands.length - 1;

	            /* update the input */
	            this._input.setValue(previousCommands[newState.previousCommandOffset]);
	        } else if (previousCommands.length - 1 === previousCommandOffset && change === 1) {
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
	    _handleKeyTab: function _handleKeyTab(e) {
	        e.preventDefault();
	        var currentValue = this._input.getValue();
	        if (currentValue == "") return;
	        if (_typeof(this.props.tabComplete) !== "object") return;
	        var matches = [];
	        for (var i = 0; i < this.props.tabComplete.length; i++) {
	            var thisTabComplete = this.props.tabComplete[i];
	            if (thisTabComplete.startsWith(currentValue)) {
	                matches.push(thisTabComplete);
	            }
	        }
	        if (matches.length == 0) {
	            return;
	        } else if (matches.length == 1) {
	            this._input.setValue(matches[0] + " ");
	        } else {
	            var match = (0, _helper.sharedStart)(matches);
	            for (var i = 0; i < matches.length; i++) {
	                this.addLine(matches[i]);
	            }this._input.setValue(match);
	        }
	    },
	    _onClick: function _onClick() {
	        this._input.focus();
	    },
	    _onKeyDown: function _onKeyDown(e) {
	        if (e.key === "Enter") {
	            this._handleKeyEnter(e);
	        } else if (e.key === "ArrowUp" || e.key === "ArrowDown") {
	            this._handleKeyArrow(e);
	        } else if (e.key === "Tab") {
	            this._handleKeyTab(e);
	        }
	        this._scrollToBottom();
	    },
	    _scrollToBottom: function _scrollToBottom() {
	        this._bottomLine.scrollIntoView();
	    },
	    render: function render() {
	        var that = this;

	        return _react2.default.createElement(
	            "div",
	            { style: style.parent, onClick: this._onClick, onKeyDown: this._onKeyDown },
	            _react2.default.createElement(
	                _terminalStyle2.default,
	                { style: this.props.style, ref: function ref(el) {
	                        that._terminalWrapper = el;
	                    } },
	                this.state.textLines.map(function (text, idx) {
	                    return _react2.default.createElement(
	                        "span",
	                        { key: "line" + idx },
	                        _react2.default.createElement(
	                            _lineStyle2.default,
	                            { style: that.props.style },
	                            _react2.default.createElement(_line2.default, { text: text }),
	                            _react2.default.createElement("br", null)
	                        )
	                    );
	                }),
	                _react2.default.createElement("span", { ref: function ref(el) {
	                        that._bottomLine = el;
	                    } })
	            ),
	            _react2.default.createElement(
	                _terminalInputStyle2.default,
	                { style: this.props.style },
	                _react2.default.createElement(_terminalInput2.default, { style: this.props.style, ps1: this.props.ps1, ref: function ref(el) {
	                        that._input = el;
	                    } })
	            )
	        );
	    }
	});

	exports.default = Terminal;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = React;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _helper = __webpack_require__(4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var TerminalStyle = _react2.default.createClass({
	    displayName: "TerminalStyle",

	    render: function render() {
	        var that = this;

	        var style = {
	            parent: {
	                width: "100%",
	                overflow: "scroll",
	                backgroundColor: "#071404",
	                margin: "0px",
	                boxSizing: "border-box",
	                display: "block",
	                height: "90%"
	            }
	        };
	        style.parent = (0, _helper.userStyle)(style.parent, this.props.style);

	        return _react2.default.createElement(
	            "div",
	            { style: style.parent, ref: function ref(el) {
	                    that._parent = el;
	                } },
	            this.props.children
	        );
	    }
	});

	exports.default = TerminalStyle;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	function userStyle(style, userStyle) {
	    if (!userStyle) return style;
	    for (var prop in style) {
	        if (userStyle.hasOwnProperty(prop)) {
	            style[prop] = userStyle[prop];
	        }
	    }
	    return style;
	}

	function maxArrayLengthFront(array, max) {
	    var infiniteCounter = 0; // prevent infinite loop
	    while (array.length > max) {
	        array.shift();
	        infiniteCounter++;
	        if (infiniteCounter > 100) break;
	    }
	    return array;
	}

	function sharedStart(array) {
	    // from: http://stackoverflow.com/a/1917041
	    var A = array.concat().sort(),
	        a1 = A[0],
	        a2 = A[A.length - 1],
	        L = a1.length,
	        i = 0;
	    while (i < L && a1.charAt(i) === a2.charAt(i)) {
	        i++;
	    }return a1.substring(0, i);
	}

	exports.userStyle = userStyle;
	exports.maxArrayLengthFront = maxArrayLengthFront;
	exports.sharedStart = sharedStart;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Line = _react2.default.createClass({
	    displayName: "Line",

	    render: function render() {
	        return _react2.default.createElement(
	            "span",
	            null,
	            this.props.text
	        );
	    }
	});

	exports.default = Line;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _helper = __webpack_require__(4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var LineStyle = _react2.default.createClass({
	    displayName: "LineStyle",

	    render: function render() {
	        var style = {
	            parent: {
	                fontFamily: "Courier New, Courier, Lucida Console, Consolas, Monaco",
	                color: "#ffa500",
	                marginLeft: "10px",
	                marginTop: "5px",
	                marginBottom: "5px"
	            }
	        };
	        style.parent = (0, _helper.userStyle)(style.parent, this.props.style);

	        return _react2.default.createElement(
	            "span",
	            { style: style.parent },
	            this.props.children
	        );
	    }
	});

	exports.default = LineStyle;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _helper = __webpack_require__(4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var TerminalInputStyle = _react2.default.createClass({
	    displayName: "TerminalInputStyle",

	    render: function render() {
	        var style = {
	            parent: {
	                display: "block",
	                width: "100%",
	                backgroundColor: "#071404",
	                boxSizing: "border-box"
	            }
	        };
	        style.parent = (0, _helper.userStyle)(style.parent, this.props.style);

	        return _react2.default.createElement(
	            "div",
	            { style: style.parent },
	            this.props.children
	        );
	    }
	});

	exports.default = TerminalInputStyle;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _helper = __webpack_require__(4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var TerminalInput = _react2.default.createClass({
	    displayName: "TerminalInput",

	    getInitialState: function getInitialState() {
	        var value = "";
	        if (this.props.ps1) {
	            value = this.props.ps1 + " ";
	        }
	        return { value: value };
	    },
	    componentWillReceiveProps: function componentWillReceiveProps(nextprops) {
	        if (nextprops.ps1 != this.props.ps1) {
	            var value = this.state.value;
	            if (this.props.ps1) {
	                value = value.replace(this.props.ps1 + " ", "");
	            }
	            if (nextprops.ps1) {
	                value = nextprops.ps1 + " " + value;
	            }
	            this.setState({ value: value });
	        }
	    },

	    _onChange: function _onChange(e) {
	        var newValue = e.target.value;
	        if (this.props.ps1) {
	            if (newValue == "") {
	                newValue = this.props.ps1 + " ";
	            } else if (newValue == this.props.ps1) {
	                newValue += " ";
	            } else if (!newValue.startsWith(this.props.ps1 + " ")) {
	                newValue = this.props.ps1 + " " + newValue;
	            }
	        }
	        this.setState({ value: newValue });
	    },
	    _onSelect: function _onSelect() {
	        if (this.props.ps1) {
	            var selectionStart = this._input.selectionStart;
	            if (selectionStart <= this.props.ps1.length) {
	                this._input.selectionStart = this.props.ps1.length + 1;
	            }
	        }
	    },
	    getValue: function getValue() {
	        var value = this.state.value;
	        value = value.replace(this.props.ps1 + " ", "");
	        return value;
	    },
	    setValue: function setValue(val) {
	        var newValue = val;
	        if (this.props.ps1) {
	            newValue = this.props.ps1 + " " + newValue;
	        }
	        this.setState({ value: newValue });
	    },
	    clearValue: function clearValue() {
	        var value = "";
	        if (this.props.ps1) {
	            value = this.props.ps1 + " " + value;
	        }
	        this.setState({ value: value });
	    },
	    focus: function focus() {
	        this._input.focus();
	    },
	    setCursorEnd: function setCursorEnd() {
	        var value = this._input.value;
	        this._input.selectionStart = value.length;
	    },
	    render: function render() {
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
	        style.input = (0, _helper.userStyle)(style.input, this.props.style);

	        return _react2.default.createElement(
	            "span",
	            null,
	            _react2.default.createElement("input", { onSelect: this._onSelect, value: this.state.value, onChange: this._onChange, style: style.input, ref: function ref(el) {
	                    that._input = el;
	                } })
	        );
	    }
	});

	exports.default = TerminalInput;

/***/ }
/******/ ]);