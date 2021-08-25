"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Client = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _url = require("url");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Client = /*#__PURE__*/function () {
  function Client(key, options) {
    _classCallCheck(this, Client);

    _defineProperty(this, "axios", void 0);

    _defineProperty(this, "senderName", 'semaphore');

    _defineProperty(this, "key", void 0);

    this.axios = _axios["default"].create({
      baseURL: (options === null || options === void 0 ? void 0 : options.baseUrl) || 'https://api.semaphore.com/api/v4'
    });

    if (options !== null && options !== void 0 && options.senderName) {
      this.senderName = options.senderName;
    }

    this.key = key;
  }

  _createClass(Client, [{
    key: "balance",
    value: function () {
      var _balance = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _yield$this$axios$get, data;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.axios.get("/account?apikey=".concat(this.key));

              case 2:
                _yield$this$axios$get = _context.sent;
                data = _yield$this$axios$get.data;
                return _context.abrupt("return", data);

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function balance() {
        return _balance.apply(this, arguments);
      }

      return balance;
    }()
  }, {
    key: "send",
    value: function () {
      var _send = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(recipients, message) {
        var sendables, _yield$this$axios$pos, data;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                sendables = typeof recipients === 'string' ? [recipients] : recipients;

                if (!(sendables.length > 1000)) {
                  _context2.next = 3;
                  break;
                }

                throw new Error('API is limited to sending to 1000 recipients at a time');

              case 3:
                _context2.next = 5;
                return this.axios.post("/messages?apikey=".concat(this.key), {
                  message: message,
                  number: sendables.join(','),
                  sendername: this.senderName
                });

              case 5:
                _yield$this$axios$pos = _context2.sent;
                data = _yield$this$axios$pos.data;
                return _context2.abrupt("return", data);

              case 8:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function send(_x, _x2) {
        return _send.apply(this, arguments);
      }

      return send;
    }()
  }, {
    key: "message",
    value: function () {
      var _message = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(messageId) {
        var _yield$this$axios$get2, data;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.axios.get("/messages/".concat(messageId, "?apikey=").concat(this.key));

              case 2:
                _yield$this$axios$get2 = _context3.sent;
                data = _yield$this$axios$get2.data;
                return _context3.abrupt("return", data);

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function message(_x3) {
        return _message.apply(this, arguments);
      }

      return message;
    }()
  }, {
    key: "messages",
    value: function () {
      var _messages = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(options) {
        var params, _i, _Object$entries, _Object$entries$_i, key, value, _yield$this$axios$get3, data;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                params = new _url.URLSearchParams();

                if (options) {
                  options.page = options.page || 1;
                  options.limit = options.limit || 100;

                  for (_i = 0, _Object$entries = Object.entries(options); _i < _Object$entries.length; _i++) {
                    _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2), key = _Object$entries$_i[0], value = _Object$entries$_i[1];
                    params.set(key, typeof value === 'string' ? value : String(value));
                  }
                }

                params.set('apikey', this.key);
                _context4.next = 5;
                return this.axios.get("/messages?".concat(params.toString()));

              case 5:
                _yield$this$axios$get3 = _context4.sent;
                data = _yield$this$axios$get3.data;
                return _context4.abrupt("return", data);

              case 8:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function messages(_x4) {
        return _messages.apply(this, arguments);
      }

      return messages;
    }()
  }, {
    key: "account",
    value: function () {
      var _account = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        var _yield$this$axios$get4, data;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this.axios.get("/account?apikey=".concat(this.key));

              case 2:
                _yield$this$axios$get4 = _context5.sent;
                data = _yield$this$axios$get4.data;
                return _context5.abrupt("return", data);

              case 5:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function account() {
        return _account.apply(this, arguments);
      }

      return account;
    }()
  }, {
    key: "users",
    value: function () {
      var _users = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        var _yield$this$axios$get5, data;

        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return this.axios.get("/users?apikey=".concat(this.key));

              case 2:
                _yield$this$axios$get5 = _context6.sent;
                data = _yield$this$axios$get5.data;
                return _context6.abrupt("return", data);

              case 5:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function users() {
        return _users.apply(this, arguments);
      }

      return users;
    }()
  }, {
    key: "senderNames",
    value: function () {
      var _senderNames = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
        var _yield$this$axios$get6, data;

        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return this.axios.get("/account/sendernames?apikey=".concat(this.key));

              case 2:
                _yield$this$axios$get6 = _context7.sent;
                data = _yield$this$axios$get6.data;
                return _context7.abrupt("return", data);

              case 5:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function senderNames() {
        return _senderNames.apply(this, arguments);
      }

      return senderNames;
    }()
  }, {
    key: "transactions",
    value: function () {
      var _transactions = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
        var _yield$this$axios$get7, data;

        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return this.axios.get("/account/transactions?apikey=".concat(this.key));

              case 2:
                _yield$this$axios$get7 = _context8.sent;
                data = _yield$this$axios$get7.data;
                return _context8.abrupt("return", data);

              case 5:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function transactions() {
        return _transactions.apply(this, arguments);
      }

      return transactions;
    }()
  }]);

  return Client;
}();

exports.Client = Client;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9DbGllbnQudHMiXSwibmFtZXMiOlsiQ2xpZW50Iiwia2V5Iiwib3B0aW9ucyIsImF4aW9zIiwiY3JlYXRlIiwiYmFzZVVSTCIsImJhc2VVcmwiLCJzZW5kZXJOYW1lIiwiZ2V0IiwiZGF0YSIsInJlY2lwaWVudHMiLCJtZXNzYWdlIiwic2VuZGFibGVzIiwibGVuZ3RoIiwiRXJyb3IiLCJwb3N0IiwibnVtYmVyIiwiam9pbiIsInNlbmRlcm5hbWUiLCJtZXNzYWdlSWQiLCJwYXJhbXMiLCJVUkxTZWFyY2hQYXJhbXMiLCJwYWdlIiwibGltaXQiLCJPYmplY3QiLCJlbnRyaWVzIiwidmFsdWUiLCJzZXQiLCJTdHJpbmciLCJ0b1N0cmluZyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBc0RhQSxNO0FBS1osa0JBQVlDLEdBQVosRUFBeUJDLE9BQXpCLEVBQWtEO0FBQUE7O0FBQUE7O0FBQUEsd0NBSDNCLFdBRzJCOztBQUFBOztBQUNqRCxTQUFLQyxLQUFMLEdBQWFBLGtCQUFNQyxNQUFOLENBQWE7QUFDekJDLE1BQUFBLE9BQU8sRUFBRSxDQUFBSCxPQUFPLFNBQVAsSUFBQUEsT0FBTyxXQUFQLFlBQUFBLE9BQU8sQ0FBRUksT0FBVCxLQUFvQjtBQURKLEtBQWIsQ0FBYjs7QUFJQSxRQUFJSixPQUFKLGFBQUlBLE9BQUosZUFBSUEsT0FBTyxDQUFFSyxVQUFiLEVBQXlCO0FBQ3hCLFdBQUtBLFVBQUwsR0FBa0JMLE9BQU8sQ0FBQ0ssVUFBMUI7QUFDQTs7QUFFRCxTQUFLTixHQUFMLEdBQVdBLEdBQVg7QUFDQTs7Ozs7NkVBRUQ7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBQ3dCLEtBQUtFLEtBQUwsQ0FBV0ssR0FBWCwyQkFBMkMsS0FBS1AsR0FBaEQsRUFEeEI7O0FBQUE7QUFBQTtBQUNTUSxnQkFBQUEsSUFEVCx5QkFDU0EsSUFEVDtBQUFBLGlEQUVR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QVdLLEdBQVgseUJBQXdDLEtBQUtQLEdBQTdDLEVBRHhCOztBQUFBO0FBQUE7QUFDU1EsZ0JBQUFBLElBRFQsMEJBQ1NBLElBRFQ7QUFBQSxrREFFUUEsSUFGUjs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxPOzs7Ozs7Ozs7OztpRkFLQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx1QkFDd0IsS0FBS04sS0FBTCxDQUFXSyxHQUFYLHVDQUE0RCxLQUFLUCxHQUFqRSxFQUR4Qjs7QUFBQTtBQUFBO0FBQ1NRLGdCQUFBQSxJQURULDBCQUNTQSxJQURUO0FBQUEsa0RBRVFBLElBRlI7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsTzs7Ozs7Ozs7Ozs7a0ZBS0E7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBQ3dCLEtBQUtOLEtBQUwsQ0FBV0ssR0FBWCx3Q0FBMEQsS0FBS1AsR0FBL0QsRUFEeEI7O0FBQUE7QUFBQTtBQUNTUSxnQkFBQUEsSUFEVCwwQkFDU0EsSUFEVDtBQUFBLGtEQUVRQSxJQUZSOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXhpb3MsIHsgQXhpb3NJbnN0YW5jZSB9IGZyb20gJ2F4aW9zJztcclxuaW1wb3J0IHsgVVJMU2VhcmNoUGFyYW1zIH0gZnJvbSAndXJsJztcclxuXHJcbmV4cG9ydCB0eXBlIENsaWVudE9wdGlvbnMgPSB7XHJcblx0c2VuZGVyTmFtZT86IHN0cmluZztcclxuXHRiYXNlVXJsPzogc3RyaW5nO1xyXG59O1xyXG5cclxuZXhwb3J0IHR5cGUgTWVzc2FnZVJlc3BvbnNlID0ge1xyXG5cdG1lc3NhZ2VfaWQ6IG51bWJlcjtcclxuXHR1c2VyX2lkOiBudW1iZXI7XHJcblx0dXNlcjogc3RyaW5nO1xyXG5cdGFjY291bnRfaWQ6IG51bWJlcjtcclxuXHRhY2NvdW50OiBzdHJpbmc7XHJcblx0cmVjaXBpZW50OiBzdHJpbmc7XHJcblx0bWVzc2FnZTogc3RyaW5nO1xyXG5cdHNlbmRlcl9uYW1lOiBzdHJpbmc7XHJcblx0bmV0d29yazogc3RyaW5nO1xyXG5cdHN0YXR1czogJ1F1ZXVlZCcgfCAnUGVuZGluZycgfCAnU2VudCcgfCAnRmFpbGVkJyB8ICdSZWZ1bmRlZCc7XHJcblx0dHlwZTogc3RyaW5nO1xyXG5cdHNvdXJjZTogc3RyaW5nO1xyXG5cdGNyZWF0ZWRfYXQ6IHN0cmluZztcclxuXHR1cGRhdGVkX2F0OiBzdHJpbmc7XHJcbn07XHJcblxyXG5leHBvcnQgdHlwZSBBY2NvdW50ID0ge1xyXG5cdGFjY291bnRfaWQ6IG51bWJlcjtcclxuXHRhY2NvdW50X25hbWU6IHN0cmluZztcclxuXHRzdGF0dXM6IHN0cmluZztcclxuXHRjcmVkaXRfYmFsYW5jZTogbnVtYmVyO1xyXG59O1xyXG5cclxuZXhwb3J0IHR5cGUgU2VuZGVyTmFtZSA9IHtcclxuXHRuYW1lOiBzdHJpbmc7XHJcblx0c3RhdHVzOiBzdHJpbmc7XHJcblx0Y3JlYXRlZF9hdDogc3RyaW5nO1xyXG59O1xyXG5cclxuZXhwb3J0IHR5cGUgRmV0Y2hNZXNzYWdlc09wdGlvbnMgPSB7XHJcblx0bGltaXQ/OiBudW1iZXI7XHJcblx0cGFnZT86IG51bWJlcjtcclxuXHRzdGFydERhdGU/OiBzdHJpbmc7XHJcblx0ZW5kRGF0ZT86IHN0cmluZztcclxuXHRzdGF0dXM/OiBzdHJpbmc7XHJcblx0bmV0d29yaz86IHN0cmluZztcclxuXHRzZW5kZXJuYW1lPzogc3RyaW5nO1xyXG59O1xyXG5cclxuZXhwb3J0IHR5cGUgVXNlciA9IHtcclxuXHR1c2VyX2lkOiBudW1iZXI7XHJcblx0ZW1haWw6IHN0cmluZztcclxuXHRyb2xlOiBzdHJpbmc7XHJcblx0c3RhdHVzPzogc3RyaW5nO1xyXG59O1xyXG5cclxuZXhwb3J0IGNsYXNzIENsaWVudCB7XHJcblx0cHJvdGVjdGVkIGF4aW9zOiBBeGlvc0luc3RhbmNlO1xyXG5cdHByb3RlY3RlZCBzZW5kZXJOYW1lID0gJ3NlbWFwaG9yZSc7XHJcblx0cHJvdGVjdGVkIGtleTogc3RyaW5nO1xyXG5cclxuXHRjb25zdHJ1Y3RvcihrZXk6IHN0cmluZywgb3B0aW9ucz86IENsaWVudE9wdGlvbnMpIHtcclxuXHRcdHRoaXMuYXhpb3MgPSBheGlvcy5jcmVhdGUoe1xyXG5cdFx0XHRiYXNlVVJMOiBvcHRpb25zPy5iYXNlVXJsIHx8ICdodHRwczovL2FwaS5zZW1hcGhvcmUuY29tL2FwaS92NCcsXHJcblx0XHR9KTtcclxuXHJcblx0XHRpZiAob3B0aW9ucz8uc2VuZGVyTmFtZSkge1xyXG5cdFx0XHR0aGlzLnNlbmRlck5hbWUgPSBvcHRpb25zLnNlbmRlck5hbWU7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5rZXkgPSBrZXk7XHJcblx0fVxyXG5cclxuXHRhc3luYyBiYWxhbmNlKCkge1xyXG5cdFx0Y29uc3QgeyBkYXRhIH0gPSBhd2FpdCB0aGlzLmF4aW9zLmdldDxBY2NvdW50PihgL2FjY291bnQ/YXBpa2V5PSR7dGhpcy5rZXl9YCk7XHJcblx0XHRyZXR1cm4gZGF0YTtcclxuXHR9XHJcblxyXG5cdGFzeW5jIHNlbmQocmVjaXBpZW50czogc3RyaW5nIHwgc3RyaW5nW10sIG1lc3NhZ2U6IHN0cmluZykge1xyXG5cdFx0Y29uc3Qgc2VuZGFibGVzID0gdHlwZW9mIHJlY2lwaWVudHMgPT09ICdzdHJpbmcnID8gW3JlY2lwaWVudHNdIDogcmVjaXBpZW50cztcclxuXHJcblx0XHRpZiAoc2VuZGFibGVzLmxlbmd0aCA+IDEwMDApIHtcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdBUEkgaXMgbGltaXRlZCB0byBzZW5kaW5nIHRvIDEwMDAgcmVjaXBpZW50cyBhdCBhIHRpbWUnKTtcclxuXHRcdH1cclxuXHJcblx0XHRjb25zdCB7IGRhdGEgfSA9IGF3YWl0IHRoaXMuYXhpb3MucG9zdDxNZXNzYWdlUmVzcG9uc2VbXT4oYC9tZXNzYWdlcz9hcGlrZXk9JHt0aGlzLmtleX1gLCB7XHJcblx0XHRcdG1lc3NhZ2UsXHJcblx0XHRcdG51bWJlcjogc2VuZGFibGVzLmpvaW4oJywnKSxcclxuXHRcdFx0c2VuZGVybmFtZTogdGhpcy5zZW5kZXJOYW1lLFxyXG5cdFx0fSk7XHJcblxyXG5cdFx0cmV0dXJuIGRhdGE7XHJcblx0fVxyXG5cclxuXHRhc3luYyBtZXNzYWdlKG1lc3NhZ2VJZDogc3RyaW5nKSB7XHJcblx0XHRjb25zdCB7IGRhdGEgfSA9IGF3YWl0IHRoaXMuYXhpb3MuZ2V0PE1lc3NhZ2VSZXNwb25zZT4oYC9tZXNzYWdlcy8ke21lc3NhZ2VJZH0/YXBpa2V5PSR7dGhpcy5rZXl9YCk7XHJcblx0XHRyZXR1cm4gZGF0YTtcclxuXHR9XHJcblxyXG5cdGFzeW5jIG1lc3NhZ2VzKG9wdGlvbnM/OiBGZXRjaE1lc3NhZ2VzT3B0aW9ucykge1xyXG5cdFx0Y29uc3QgcGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcygpO1xyXG5cclxuXHRcdGlmIChvcHRpb25zKSB7XHJcblx0XHRcdG9wdGlvbnMucGFnZSA9IG9wdGlvbnMucGFnZSB8fCAxO1xyXG5cdFx0XHRvcHRpb25zLmxpbWl0ID0gb3B0aW9ucy5saW1pdCB8fCAxMDA7XHJcblxyXG5cdFx0XHRmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyhvcHRpb25zKSkge1xyXG5cdFx0XHRcdHBhcmFtcy5zZXQoa2V5LCB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnID8gdmFsdWUgOiBTdHJpbmcodmFsdWUpKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHBhcmFtcy5zZXQoJ2FwaWtleScsIHRoaXMua2V5KTtcclxuXHJcblx0XHRjb25zdCB7IGRhdGEgfSA9IGF3YWl0IHRoaXMuYXhpb3MuZ2V0PE1lc3NhZ2VSZXNwb25zZVtdPihgL21lc3NhZ2VzPyR7cGFyYW1zLnRvU3RyaW5nKCl9YCk7XHJcblxyXG5cdFx0cmV0dXJuIGRhdGE7XHJcblx0fVxyXG5cclxuXHRhc3luYyBhY2NvdW50KCkge1xyXG5cdFx0Y29uc3QgeyBkYXRhIH0gPSBhd2FpdCB0aGlzLmF4aW9zLmdldDxBY2NvdW50PihgL2FjY291bnQ/YXBpa2V5PSR7dGhpcy5rZXl9YCk7XHJcblx0XHRyZXR1cm4gZGF0YTtcclxuXHR9XHJcblxyXG5cdGFzeW5jIHVzZXJzKCkge1xyXG5cdFx0Y29uc3QgeyBkYXRhIH0gPSBhd2FpdCB0aGlzLmF4aW9zLmdldDxVc2VyW10+KGAvdXNlcnM/YXBpa2V5PSR7dGhpcy5rZXl9YCk7XHJcblx0XHRyZXR1cm4gZGF0YTtcclxuXHR9XHJcblxyXG5cdGFzeW5jIHNlbmRlck5hbWVzKCkge1xyXG5cdFx0Y29uc3QgeyBkYXRhIH0gPSBhd2FpdCB0aGlzLmF4aW9zLmdldDxTZW5kZXJOYW1lW10+KGAvYWNjb3VudC9zZW5kZXJuYW1lcz9hcGlrZXk9JHt0aGlzLmtleX1gKTtcclxuXHRcdHJldHVybiBkYXRhO1xyXG5cdH1cclxuXHJcblx0YXN5bmMgdHJhbnNhY3Rpb25zKCkge1xyXG5cdFx0Y29uc3QgeyBkYXRhIH0gPSBhd2FpdCB0aGlzLmF4aW9zLmdldDxBY2NvdW50W10+KGAvYWNjb3VudC90cmFuc2FjdGlvbnM/YXBpa2V5PSR7dGhpcy5rZXl9YCk7XHJcblx0XHRyZXR1cm4gZGF0YTtcclxuXHR9XHJcbn1cclxuIl19