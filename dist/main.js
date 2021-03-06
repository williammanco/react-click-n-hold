'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ClickNHold = function (_Component) {
    _inherits(ClickNHold, _Component);

    function ClickNHold(props) {
        _classCallCheck(this, ClickNHold);

        var _this = _possibleConstructorReturn(this, (ClickNHold.__proto__ || Object.getPrototypeOf(ClickNHold)).call(this, props));

        _this.state = {
            holding: false,
            start: 0,
            ended: 'begin'
        };

        _this.start = _this.start.bind(_this);
        _this.end = _this.end.bind(_this);
        _this.timeout = _this.timeout.bind(_this);
        return _this;
    }

    /*Start callback*/


    _createClass(ClickNHold, [{
        key: 'start',
        value: function start(e) {
            var ended = this.state.ended;
            var start = Date.now();
            this.setState({ start: start, holding: true, ended: false });
            var rightNumber = this.props.time && this.props.time > 0;
            var time = rightNumber ? this.props.time : 2;
            if (!rightNumber) {
                console.warn("You have specified an unvalid time prop for ClickNHold. You need to specify a number > 0. Default time is 2.");
            }
            if (ended) {
                setTimeout(function () {
                    this.timeout(start);
                }.bind(this), time * 1000 + 1);
            }
            if (this.props.onStart) {
                this.props.onStart(e);
            }
        }

        /*End callback*/

    }, {
        key: 'end',
        value: function end(e) {
            var endTime = Date.now(); //End time
            var minDiff = this.props.time * 1000; // In seconds
            var startTime = this.state.start; // Start time
            var diff = endTime - startTime; // Time difference
            var isEnough = diff >= minDiff; // It has been held for enough time
            this.setState({ holding: false, ended: true });
            if (this.props.onEnd) {
                this.props.onEnd(e, isEnough);
            }
        }

        /*Timeout callback*/

    }, {
        key: 'timeout',
        value: function timeout(start) {
            if (!this.state.ended && start === this.state.start) {
                if (this.props.onClickNHold) {
                    this.props.onClickNHold(start);
                    this.setState({ holding: false });
                    return;
                }
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var classList = this.props.className ? this.props.className + ' ' : ' ';
            classList += this.state.holding ? 'cnh_holding ' : '';
            classList += this.state.ended ? 'cnh_ended ' : '';
            return _react2.default.createElement(
                'div',
                { style: this.props.style,
                    className: classList,
                    onMouseDown: this.start,
                    onTouchStart: this.start,
                    onMouseUp: this.end,
                    onTouchCancel: this.end,
                    onTouchEnd: this.end },
                this.props.children
            );
        }
    }]);

    return ClickNHold;
}(_react.Component);

exports.default = ClickNHold;

