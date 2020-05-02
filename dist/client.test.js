"use strict";

var _axios = _interopRequireDefault(require("axios"));

var _lodash = _interopRequireDefault(require("lodash"));

var _q = _interopRequireDefault(require("q"));

var _boxscore = _interopRequireDefault(require("./boxscore"));

var _freeAgentPlayer = _interopRequireDefault(require("./free-agent-player"));

var _league = _interopRequireDefault(require("./league"));

var _nflGame = _interopRequireDefault(require("./nfl-game"));

var _player = _interopRequireDefault(require("./player"));

var _team = _interopRequireDefault(require("./team"));

var _client = _interopRequireDefault(require("./client"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

describe('Client', function () {
  describe('constructor', function () {
    describe('when options are not passed', function () {
      var testPropIsUndefined = function testPropIsUndefined(prop) {
        test("".concat(prop, " is undefined"), function () {
          var newInstance = new _client["default"]();
          expect(_lodash["default"].get(newInstance, prop)).toBeUndefined();
        });
      };

      testPropIsUndefined('leagueId');
    });
    describe('when options are passed', function () {
      var testPropIsSetFromOptions = function testPropIsSetFromOptions(prop) {
        test("".concat(prop, " is set from options"), function () {
          var value = 203123;
          var newInstance = new _client["default"](_defineProperty({}, prop, value));
          expect(_lodash["default"].get(newInstance, prop)).toBe(value);
        });
      };

      testPropIsSetFromOptions('leagueId');
    });
    describe('when all cookies are passed on options', function () {
      test('sets cookies', function () {
        var espnS2 = 'some_espn_s2';
        var SWID = 'some_swid';
        var client = new _client["default"]({
          espnS2: espnS2,
          SWID: SWID
        });
        expect(client.espnS2).toBe(espnS2);
        expect(client.SWID).toBe(SWID);
      });
    });
    describe('when only espnS2 is passed on options', function () {
      test('does not set cookies', function () {
        var espnS2 = 'some_espn_s2';
        var client = new _client["default"]({
          espnS2: espnS2
        });
        expect(client.espnS2).toBeUndefined();
        expect(client.SWID).toBeUndefined();
      });
    });
    describe('when only SWID is passed on options', function () {
      test('does not set cookies', function () {
        var SWID = 'some_swid';
        var client = new _client["default"]({
          SWID: SWID
        });
        expect(client.espnS2).toBeUndefined();
        expect(client.SWID).toBeUndefined();
      });
    });
    describe('when no cookies are passed on options', function () {
      test('does not set cookies', function () {
        var client = new _client["default"]();
        expect(client.espnS2).toBeUndefined();
        expect(client.SWID).toBeUndefined();
      });
    });
  });
  describe('instance methods', function () {
    describe('_buildAxiosConfig', function () {
      describe('when espnS2 is set on the instance', function () {
        describe('when SWID is set on the instance', function () {
          test('returns an axiosConfig with Cookie merged onto headers', function () {
            var espnS2 = 'some_espn_s2';
            var SWID = 'some_swid';
            var passedConfig = {
              headers: {
                something: 'with a value'
              },
              baseRoute: 'some/base/route'
            };
            var cookieHeaders = {
              Cookie: "espn_s2=".concat(espnS2, "; SWID=").concat(SWID, ";")
            };
            var cookieConfig = {
              headers: cookieHeaders,
              withCredentials: true
            };
            var client = new _client["default"]({
              espnS2: espnS2,
              SWID: SWID
            });

            var axiosConfig = client._buildAxiosConfig(passedConfig);

            expect(axiosConfig).toEqual(_lodash["default"].merge({}, passedConfig, cookieConfig));
          });
        });
        describe('when SWID is not set on the instance', function () {
          test('returns the passed axiosConfig', function () {
            var espnS2 = 'some_espn_s2';
            var passedConfig = {
              headers: {
                something: 'with a value'
              },
              baseRoute: 'some/base/route'
            };
            var client = new _client["default"]({
              espnS2: espnS2
            });

            var axiosConfig = client._buildAxiosConfig(passedConfig);

            expect(axiosConfig).toEqual(passedConfig);
          });
        });
      });
      describe('when espnS2 is not set on the instance', function () {
        describe('when SWID is set on the instance', function () {
          test('returns the passed axiosConfig', function () {
            var SWID = 'some_swid';
            var passedConfig = {
              headers: {
                something: 'with a value'
              },
              baseRoute: 'some/base/route'
            };
            var client = new _client["default"]({
              SWID: SWID
            });

            var axiosConfig = client._buildAxiosConfig(passedConfig);

            expect(axiosConfig).toEqual(passedConfig);
          });
        });
        describe('when SWID is not set on the instance', function () {
          test('returns the passed axiosConfig', function () {
            var passedConfig = {
              headers: {
                something: 'with a value'
              },
              baseRoute: 'some/base/route'
            };
            var client = new _client["default"]();

            var axiosConfig = client._buildAxiosConfig(passedConfig);

            expect(axiosConfig).toEqual(passedConfig);
          });
        });
      });
    });
    describe('setCookies', function () {
      describe('when espnS2 is set on the instance', function () {
        describe('when SWID is set on the instance', function () {
          test('sets cookies on the instance', function () {
            var espnS2 = 'some_espn_s2';
            var SWID = 'some_swid';
            var client = new _client["default"]();
            client.setCookies({
              espnS2: espnS2,
              SWID: SWID
            });
            expect(client.espnS2).toBe(espnS2);
            expect(client.SWID).toBe(SWID);
          });
        });
        describe('when SWID is not set on the instance', function () {
          test('does not set cookies on the instance', function () {
            var espnS2 = 'some_espn_s2';
            var client = new _client["default"]();
            client.setCookies({
              espnS2: espnS2
            });
            expect(client.espnS2).toBeUndefined();
            expect(client.SWID).toBeUndefined();
          });
        });
      });
      describe('when espnS2 is not set on the instance', function () {
        describe('when SWID is set on the instance', function () {
          test('does not set cookies on the instance', function () {
            var SWID = 'some_swid';
            var client = new _client["default"]();
            client.setCookies({
              SWID: SWID
            });
            expect(client.espnS2).toBeUndefined();
            expect(client.SWID).toBeUndefined();
          });
        });
        describe('when SWID is not set on the instance', function () {
          test('does not set cookies on the instance', function () {
            var client = new _client["default"]();
            client.setCookies({});
            expect(client.espnS2).toBeUndefined();
            expect(client.SWID).toBeUndefined();
          });
        });
      });
    });
    describe('getBoxscoreForWeek', function () {
      var client;
      var leagueId;
      var matchupPeriodId;
      var scoringPeriodId;
      var seasonId;
      beforeEach(function () {
        leagueId = 213213;
        matchupPeriodId = 2;
        scoringPeriodId = 3;
        seasonId = 2018;
        client = new _client["default"]({
          leagueId: leagueId
        });
        jest.spyOn(_axios["default"], 'get').mockImplementation();
      });
      test('calls axios.get with the correct params', function () {
        var routeBase = "".concat(seasonId, "/segments/0/leagues/").concat(leagueId);
        var routeParams = "?view=mMatchup&view=mMatchupScore&scoringPeriodId=".concat(scoringPeriodId);
        var route = "".concat(routeBase).concat(routeParams);
        var config = {};
        jest.spyOn(client, '_buildAxiosConfig').mockReturnValue(config);

        _axios["default"].get.mockReturnValue((0, _q["default"])());

        client.getBoxscoreForWeek({
          seasonId: seasonId,
          matchupPeriodId: matchupPeriodId,
          scoringPeriodId: scoringPeriodId
        });
        expect(_axios["default"].get).toBeCalledWith(route, config);
      });
      describe('before the promise resolves', function () {
        test('does not invoke callback', function () {
          jest.spyOn(_boxscore["default"], 'buildFromServer').mockImplementation();

          _axios["default"].get.mockReturnValue((0, _q["default"])());

          client.getBoxscoreForWeek({
            seasonId: seasonId,
            matchupPeriodId: matchupPeriodId,
            scoringPeriodId: scoringPeriodId
          });
          expect(_boxscore["default"].buildFromServer).not.toBeCalled();
        });
      });
      describe('after the promise resolves', function () {
        test('maps response data into Boxscores', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          var response, promise, boxscores;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  response = {
                    data: {
                      schedule: [{
                        matchupPeriodId: matchupPeriodId,
                        home: {
                          teamId: 2
                        },
                        away: {
                          teamId: 3
                        }
                      }, {
                        matchupPeriodId: matchupPeriodId,
                        home: {
                          teamId: 5
                        },
                        away: {
                          teamId: 6
                        }
                      }, {
                        matchupPeriodId: matchupPeriodId + 1,
                        home: {
                          teamId: 6
                        },
                        away: {
                          teamId: 2
                        }
                      }]
                    }
                  };
                  promise = (0, _q["default"])(response);

                  _axios["default"].get.mockReturnValue(promise);

                  _context.next = 5;
                  return client.getBoxscoreForWeek({
                    seasonId: seasonId,
                    matchupPeriodId: matchupPeriodId,
                    scoringPeriodId: scoringPeriodId
                  });

                case 5:
                  boxscores = _context.sent;
                  expect.hasAssertions();
                  expect(boxscores.length).toBe(2);

                  _lodash["default"].forEach(boxscores, function (boxscore, index) {
                    expect(boxscore).toBeInstanceOf(_boxscore["default"]);
                    expect(boxscore.homeTeamId).toBe(response.data.schedule[index].home.teamId);
                    expect(boxscore.awayTeamId).toBe(response.data.schedule[index].away.teamId);
                  });

                case 9:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        })));
      });
    });
    describe('getHistoricalScoreboardForWeek', function () {
      var client;
      var leagueId;
      var matchupPeriodId;
      var scoringPeriodId;
      var seasonId;
      beforeEach(function () {
        leagueId = 213213;
        matchupPeriodId = 2;
        scoringPeriodId = 3;
        seasonId = 2018;
        client = new _client["default"]({
          leagueId: leagueId
        });
        jest.spyOn(_axios["default"], 'get').mockImplementation();
      });
      test('calls axios.get with the correct params', function () {
        var routeBase = "".concat(leagueId);
        var routeParams = "?scoringPeriodId=".concat(scoringPeriodId, "&seasonId=").concat(seasonId) + '&view=mMatchupScore&view=mScoreboard&view=mSettings&view=mTopPerformers&view=mTeam';
        var route = "".concat(routeBase).concat(routeParams);
        var config = {};
        jest.spyOn(client, '_buildAxiosConfig').mockReturnValue(config);

        _axios["default"].get.mockReturnValue((0, _q["default"])());

        client.getHistoricalScoreboardForWeek({
          seasonId: seasonId,
          matchupPeriodId: matchupPeriodId,
          scoringPeriodId: scoringPeriodId
        });
        expect(_axios["default"].get).toBeCalledWith(route, config);
      });
      describe('before the promise resolves', function () {
        test('does not invoke callback', function () {
          jest.spyOn(_boxscore["default"], 'buildFromServer').mockImplementation();

          _axios["default"].get.mockReturnValue((0, _q["default"])());

          client.getHistoricalScoreboardForWeek({
            seasonId: seasonId,
            matchupPeriodId: matchupPeriodId,
            scoringPeriodId: scoringPeriodId
          });
          expect(_boxscore["default"].buildFromServer).not.toBeCalled();
        });
      });
      describe('after the promise resolves', function () {
        test('maps response data into Boxscores', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
          var response, promise, boxscores;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  response = {
                    data: [{
                      schedule: [{
                        matchupPeriodId: matchupPeriodId,
                        home: {
                          teamId: 2
                        },
                        away: {
                          teamId: 3
                        }
                      }, {
                        matchupPeriodId: matchupPeriodId,
                        home: {
                          teamId: 5
                        },
                        away: {
                          teamId: 6
                        }
                      }, {
                        matchupPeriodId: matchupPeriodId + 1,
                        home: {
                          teamId: 6
                        },
                        away: {
                          teamId: 2
                        }
                      }]
                    }]
                  };
                  promise = (0, _q["default"])(response);

                  _axios["default"].get.mockReturnValue(promise);

                  _context2.next = 5;
                  return client.getHistoricalScoreboardForWeek({
                    seasonId: seasonId,
                    matchupPeriodId: matchupPeriodId,
                    scoringPeriodId: scoringPeriodId
                  });

                case 5:
                  boxscores = _context2.sent;
                  expect.hasAssertions();
                  expect(boxscores.length).toBe(2);

                  _lodash["default"].forEach(boxscores, function (boxscore, index) {
                    expect(boxscore).toBeInstanceOf(_boxscore["default"]);
                    expect(boxscore.homeTeamId).toBe(response.data[0].schedule[index].home.teamId);
                    expect(boxscore.awayTeamId).toBe(response.data[0].schedule[index].away.teamId);
                  });

                case 9:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        })));
      });
    });
    describe('getFreeAgents', function () {
      var client;
      var leagueId;
      var scoringPeriodId;
      var seasonId;
      beforeEach(function () {
        leagueId = 213213;
        scoringPeriodId = 3;
        seasonId = 2018;
        client = new _client["default"]({
          leagueId: leagueId
        });
        jest.spyOn(_axios["default"], 'get').mockImplementation();
      });
      test('calls axios.get with the correct params', function () {
        var routeBase = "".concat(seasonId, "/segments/0/leagues/").concat(leagueId);
        var routeParams = "?scoringPeriodId=".concat(scoringPeriodId, "&view=kona_player_info");
        var route = "".concat(routeBase).concat(routeParams);
        var config = {};
        jest.spyOn(client, '_buildAxiosConfig').mockReturnValue(config);

        _axios["default"].get.mockReturnValue((0, _q["default"])());

        client.getFreeAgents({
          seasonId: seasonId,
          scoringPeriodId: scoringPeriodId
        });
        expect(_axios["default"].get).toBeCalledWith(route, config);
      });
      describe('before the promise resolves', function () {
        test('does not invoke callback', function () {
          jest.spyOn(_freeAgentPlayer["default"], 'buildFromServer').mockImplementation();

          _axios["default"].get.mockReturnValue((0, _q["default"])());

          client.getFreeAgents({
            seasonId: seasonId,
            scoringPeriodId: scoringPeriodId
          });
          expect(_freeAgentPlayer["default"].buildFromServer).not.toBeCalled();
        });
      });
      describe('after the promise resolves', function () {
        test('maps response data into FreeAgentPlayers', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
          var response, promise, freeAgents;
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  response = {
                    data: {
                      players: [{
                        player: {
                          firstName: 'Test',
                          lastName: 'McTestFace',
                          stats: [{
                            seasonId: seasonId,
                            statSourceId: 1,
                            statSplitTypeId: 0,
                            stats: [{
                              23: 2341,
                              24: 234,
                              25: 123
                            }]
                          }]
                        }
                      }, {
                        player: {
                          firstName: 'Stable',
                          lastName: 'Genius',
                          stats: [{
                            seasonId: seasonId,
                            statSourceId: 1,
                            statSplitTypeId: 0,
                            stats: [{
                              23: 32,
                              24: 23124,
                              25: 0
                            }]
                          }]
                        }
                      }]
                    }
                  };
                  promise = (0, _q["default"])(response);

                  _axios["default"].get.mockReturnValue(promise);

                  _context3.next = 5;
                  return client.getFreeAgents({
                    seasonId: seasonId,
                    scoringPeriodId: scoringPeriodId
                  });

                case 5:
                  freeAgents = _context3.sent;
                  expect.hasAssertions();
                  expect(freeAgents.length).toBe(2);

                  _lodash["default"].forEach(freeAgents, function (freeAgent, index) {
                    expect(freeAgent).toBeInstanceOf(_freeAgentPlayer["default"]);
                    expect(freeAgent.player.firstName).toBe(response.data.players[index].player.firstName);
                    expect(freeAgent.player.lastName).toBe(response.data.players[index].player.lastName);
                  });

                case 9:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3);
        })));
      });
    });
    describe('getTeamsAtWeek', function () {
      var client;
      var leagueId;
      var scoringPeriodId;
      var seasonId;
      beforeEach(function () {
        leagueId = 213213;
        scoringPeriodId = 3;
        seasonId = 2018;
        client = new _client["default"]({
          leagueId: leagueId
        });
        jest.spyOn(_axios["default"], 'get').mockImplementation();
      });
      test('calls axios.get with the correct params', function () {
        var routeBase = "".concat(seasonId, "/segments/0/leagues/").concat(leagueId);
        var routeParams = "?scoringPeriodId=".concat(scoringPeriodId, "&view=mRoster&view=mTeam");
        var route = "".concat(routeBase).concat(routeParams);
        var config = {};
        jest.spyOn(client, '_buildAxiosConfig').mockReturnValue(config);

        _axios["default"].get.mockReturnValue((0, _q["default"])());

        client.getTeamsAtWeek({
          seasonId: seasonId,
          scoringPeriodId: scoringPeriodId
        });
        expect(_axios["default"].get).toBeCalledWith(route, config);
      });
      describe('before the promise resolves', function () {
        test('does not invoke callback', function () {
          jest.spyOn(_team["default"], 'buildFromServer').mockImplementation();

          _axios["default"].get.mockReturnValue((0, _q["default"])());

          client.getTeamsAtWeek({
            seasonId: seasonId,
            scoringPeriodId: scoringPeriodId
          });
          expect(_team["default"].buildFromServer).not.toBeCalled();
        });
      });
      describe('after the promise resolves', function () {
        test('maps response data into Teams', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
          var response, promise, teams;
          return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  response = {
                    data: {
                      teams: [{
                        abbrev: 'SWAG',
                        location: 'First ',
                        nickname: 'Last',
                        record: {
                          overall: {
                            wins: 3,
                            losses: 11
                          }
                        },
                        roster: {
                          entries: [{
                            playerPoolEntry: {
                              firstName: 'Joe',
                              lastName: 'Montana'
                            }
                          }]
                        }
                      }, {
                        abbrev: 'JS',
                        location: 'First ',
                        nickname: 'Last',
                        record: {
                          overall: {
                            wins: 5,
                            losses: 11
                          }
                        },
                        roster: {
                          entries: [{
                            playerPoolEntry: {
                              firstName: 'Joe',
                              lastName: 'Smith'
                            }
                          }]
                        }
                      }, {
                        abbrev: 'SWAG',
                        location: 'First ',
                        nickname: 'Last',
                        record: {
                          overall: {
                            wins: 11,
                            losses: 8
                          }
                        },
                        roster: {
                          entries: [{
                            playerPoolEntry: {
                              firstName: 'Joe',
                              lastName: 'Brown'
                            }
                          }]
                        }
                      }]
                    }
                  };
                  promise = (0, _q["default"])(response);

                  _axios["default"].get.mockReturnValue(promise);

                  _context4.next = 5;
                  return client.getTeamsAtWeek({
                    seasonId: seasonId,
                    scoringPeriodId: scoringPeriodId
                  });

                case 5:
                  teams = _context4.sent;
                  expect.hasAssertions();
                  expect(teams.length).toBe(3);

                  _lodash["default"].forEach(teams, function (team, index) {
                    expect(team).toBeInstanceOf(_team["default"]);
                    expect(team.abbreviation).toBe(response.data.teams[index].abbrev);
                    expect(team.wins).toBe(response.data.teams[index].record.overall.wins);
                    expect(team.losses).toBe(response.data.teams[index].record.overall.losses);
                    expect(team.roster).toEqual(expect.any(Array));
                    expect(team.roster[0]).toBeInstanceOf(_player["default"]);
                    expect(team.roster[0].firstName).toBe(response.data.teams[index].roster.entries[0].playerPoolEntry.firstName);
                  });

                case 9:
                case "end":
                  return _context4.stop();
              }
            }
          }, _callee4);
        })));
      });
    });
    describe('getNFLGamesForPeriod', function () {
      var client;
      var endDate;
      var startDate;
      beforeEach(function () {
        startDate = '20190912';
        endDate = '20190917';
        client = new _client["default"]({
          leagueId: 213213
        });
        jest.spyOn(_axios["default"], 'get').mockImplementation();
      });
      test('calls axios.get with the correct params', function () {
        var routeBase = 'apis/fantasy/v2/games/ffl/games';
        var routeParams = "?dates=".concat(startDate, "-").concat(endDate, "&pbpOnly=true");
        var route = "".concat(routeBase).concat(routeParams);
        var config = {};
        jest.spyOn(client, '_buildAxiosConfig').mockReturnValue(config);

        _axios["default"].get.mockReturnValue((0, _q["default"])());

        client.getNFLGamesForPeriod({
          startDate: startDate,
          endDate: endDate
        });
        expect(_axios["default"].get).toBeCalledWith(route, config);
      });
      describe('before the promise resolves', function () {
        test('does not invoke callback', function () {
          jest.spyOn(_nflGame["default"], 'buildFromServer').mockImplementation();

          _axios["default"].get.mockReturnValue((0, _q["default"])());

          client.getNFLGamesForPeriod({
            startDate: startDate,
            endDate: endDate
          });
          expect(_nflGame["default"].buildFromServer).not.toBeCalled();
        });
      });
      describe('after the promise resolves', function () {
        test('maps response data into Teams', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
          var response, promise, games;
          return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  response = {
                    data: {
                      events: [{}, {}, {}]
                    }
                  };
                  promise = (0, _q["default"])(response);

                  _axios["default"].get.mockReturnValue(promise);

                  _context5.next = 5;
                  return client.getNFLGamesForPeriod({
                    startDate: startDate,
                    endDate: endDate
                  });

                case 5:
                  games = _context5.sent;
                  expect.hasAssertions();
                  expect(games.length).toBe(3);

                  _lodash["default"].forEach(games, function (game) {
                    expect(game).toBeInstanceOf(_nflGame["default"]);
                  });

                case 9:
                case "end":
                  return _context5.stop();
              }
            }
          }, _callee5);
        })));
      });
    });
    describe('getLeagueInfo', function () {
      var client;
      var seasonId;
      beforeEach(function () {
        seasonId = 2018;
        client = new _client["default"]({
          leagueId: 213213
        });
        jest.spyOn(_axios["default"], 'get').mockImplementation();
      });
      test('calls axios.get with the correct params', function () {
        var routeBase = "".concat(seasonId, "/segments/0/leagues/").concat(client.leagueId);
        var routeParams = '?view=mSettings';
        var route = "".concat(routeBase).concat(routeParams);
        var config = {};
        jest.spyOn(client, '_buildAxiosConfig').mockReturnValue(config);

        _axios["default"].get.mockReturnValue((0, _q["default"])());

        client.getLeagueInfo({
          seasonId: seasonId
        });
        expect(_axios["default"].get).toBeCalledWith(route, config);
      });
      describe('before the promise resolves', function () {
        test('does not invoke callback', function () {
          jest.spyOn(_league["default"], 'buildFromServer').mockImplementation();

          _axios["default"].get.mockReturnValue((0, _q["default"])());

          client.getLeagueInfo({
            seasonId: seasonId
          });
          expect(_league["default"].buildFromServer).not.toBeCalled();
        });
      });
      describe('after the promise resolves', function () {
        test('maps response data into Teams', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
          var response, promise, league;
          return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  response = {
                    data: {
                      settings: {
                        name: 'some league',
                        draftSettings: {},
                        rosterSettings: {},
                        scheduleSettings: {}
                      }
                    }
                  };
                  promise = (0, _q["default"])(response);

                  _axios["default"].get.mockReturnValue(promise);

                  _context6.next = 5;
                  return client.getLeagueInfo({
                    seasonId: seasonId
                  });

                case 5:
                  league = _context6.sent;
                  expect(league).toBeInstanceOf(_league["default"]);

                case 7:
                case "end":
                  return _context6.stop();
              }
            }
          }, _callee6);
        })));
      });
    });
  });
});