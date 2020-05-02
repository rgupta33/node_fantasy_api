"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _http = _interopRequireDefault(require("http"));

var _client = _interopRequireDefault(require("./client"));

var _axios = _interopRequireDefault(require("axios"));

require("@babel/polyfill");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var express = require('express');

var bodyParser = require('body-parser');

var app = express(); // Parse URL-encoded bodies (as sent by HTML forms)

app.use(bodyParser.urlencoded({
  extended: true
}));
var url_api_key = "https://registerdisney.go.com/jgc/v5/client/ESPN-FANTASYLM-PROD/api-key?langPref=en-US";
var url_login = "https://ha.registerdisney.go.com/jgc/v5/client/ESPN-FANTASYLM-PROD/guest/login?langPref=en-US";
app.post('/espn_login', /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var username, password, leagueID, ret, apiKey, config, data, received, d, espn_s2, swid, myClient, toSend;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return req.body.username;

          case 2:
            username = _context.sent;
            console.log(username);
            _context.next = 6;
            return req.body.password;

          case 6:
            password = _context.sent;
            console.log(password);
            leagueID = req.body.leagueID;
            console.log(leagueID);
            leagueID = parseInt(leagueID);
            console.log(leagueID); //  req.params.user;

            _context.next = 14;
            return _axios["default"].post(url_api_key);

          case 14:
            ret = _context.sent;
            apiKey = ret['headers']['api-key'];
            config = {
              headers: {
                'authorization': 'APIKEY ' + apiKey,
                'content-type': 'application/json'
              }
            };
            data = {
              'loginValue': username,
              'password': password
            };
            _context.next = 20;
            return _axios["default"].post(url_login, data, config);

          case 20:
            received = _context.sent;
            d = received['data']['data'];
            espn_s2 = received['data']['data']['s2']; // console.log(ret2['data']['s2']);
            // console.log(ret2['data'].profile);

            swid = received['data']['data']['profile']['swid'];
            myClient = new _client["default"]({
              leagueId: leagueID
            });
            myClient.setCookies({
              espnS2: espn_s2,
              SWID: swid
            });
            _context.next = 28;
            return getTeams({
              myClient: myClient
            });

          case 28:
            toSend = _context.sent;
            res.send(toSend); // res.send('<html><body><h1>Hello World</h1></body></html>');

          case 30:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());

var getTeams = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_ref2) {
    var myClient, json, teams, allTeams, i, teamInfo, team, logo, name, roster, allPlayers, j, player;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            myClient = _ref2.myClient;
            _context2.next = 3;
            return getLeagueInfo({
              myClient: myClient
            });

          case 3:
            json = _context2.sent;
            teams = {};
            _context2.next = 7;
            return myClient.getTeamsAtWeek({
              seasonId: 2018,
              scoringPeriodId: 17
            });

          case 7:
            allTeams = _context2.sent;

            for (i = 0; i < allTeams.length; i++) {
              teamInfo = {};
              team = allTeams[i];
              logo = team.logoURL;
              name = team.name;
              roster = team.roster;
              allPlayers = [];

              for (j = 0; j < roster.length; j++) {
                player = roster[i];
                allPlayers.push(player);
              }

              teamInfo["logo"] = logo;
              teamInfo["name"] = name;
              teamInfo["roster"] = allPlayers;
              teams[i.toString()] = teamInfo;
            }

            json["teams"] = teams;
            return _context2.abrupt("return", json);

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getTeams(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

var getLeagueInfo = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_ref4) {
    var myClient, league, json, posLimits, starters;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            myClient = _ref4.myClient;
            _context3.next = 3;
            return myClient.getLeagueInfo({
              seasonId: 2018
            });

          case 3:
            league = _context3.sent;
            json = {};
            posLimits = league.rosterSettings.positionLimits;
            json["positionLimits"] = posLimits;
            starters = league.rosterSettings.lineupPositionCount;
            json["starters"] = starters;
            return _context3.abrupt("return", json);

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function getLeagueInfo(_x4) {
    return _ref5.apply(this, arguments);
  };
}();

var server = app.listen(4999, function () {
  console.log('Node server is running..');
});
var base_url = 'https://fantasy.espn.com/apis/v3/games/ffl/seasons/'; // const espn_s2 =	"AEAj9gPU8gCnp2dvfUrEqlC0JQQyKwir79533tbD8w5RIlQJ%2F6INviixyzgCV1M6U0q0Cn3egDdiqyG2W6otQ%2BUeMgyMg7pEMdSfcQ7Vu8U66EkKQ4Io2vJv7guIOvGC71dGdS8aCxw87dTk3BJLXXI91IkWJbtC7woGvWsjkfJalsD0HMBlUVHWOFAbi88ajRl0mJXlttJoIKU6wBvWmBkfkO7F3Ao1nDx%2Bi2LBp5veAXo7GYQgUcsmF276aKCXvFbofji0pP22o9PzLtTDee5v";
// const swid =	"{EC5F527D-0DD6-4E18-BFF5-58C47E4F1027}";

var _default = server;
exports["default"] = _default;