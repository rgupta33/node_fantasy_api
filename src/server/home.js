import http from 'http';
import Client from './client';
import axios from 'axios';
import "@babel/polyfill";

let express = require('express');
let bodyParser = require('body-parser');

let app = express();

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(bodyParser.urlencoded({ extended: true }));

const url_api_key = "https://registerdisney.go.com/jgc/v5/client/ESPN-FANTASYLM-PROD/api-key?langPref=en-US";
const url_login = "https://ha.registerdisney.go.com/jgc/v5/client/ESPN-FANTASYLM-PROD/guest/login?langPref=en-US";


app.post('/espn_login', async (req, res) => {
  const username = await req.body.username;
  console.log(username);
  const password = await req.body.password;
  console.log(password);
  let leagueID = req.body.leagueID;
  console.log(leagueID);
  leagueID = parseInt(leagueID);
  console.log(leagueID);

  //  req.params.user;
  const ret = await axios.post(url_api_key);
  const apiKey = ret['headers']['api-key'];

  const config = {
    headers : {
      'authorization': 'APIKEY ' + apiKey,
      'content-type' : 'application/json',
    }
  }

  const data = {
    'loginValue': username,
    'password': password,
  }
  const received = await axios.post(url_login,data,config);

  const d = received['data']['data'];
  const espn_s2 = received['data']['data']['s2'];
  // console.log(ret2['data']['s2']);
  // console.log(ret2['data'].profile);
  const swid = received['data']['data']['profile']['swid'];


  const myClient = new Client({ leagueId: leagueID });
  myClient.setCookies({ espnS2: espn_s2, SWID: swid });
  const toSend = await (getTeams({myClient:myClient}))
  res.send(toSend);
  // res.send('<html><body><h1>Hello World</h1></body></html>');
});

const getTeams = async ({myClient}) => {
  let json = await getLeagueInfo({myClient:myClient});
  let teams = {};
  const allTeams = await myClient.getTeamsAtWeek({seasonId:2018,scoringPeriodId:17});
    for(let i = 0 ; i < allTeams.length; i++) {
      let teamInfo = {};
      const team = allTeams[i];
      const logo = team.logoURL;
      const name = team.name;
      const roster = team.roster;
      let allPlayers = [];
      for (let j = 0; j < roster.length; j++) {
        const player = roster[i];
        allPlayers.push(player);
        }
      teamInfo["logo"] = logo;
      teamInfo["name"] = name;
      teamInfo["roster"] = allPlayers;
      teams[i.toString()] = teamInfo;
    }

   json["teams"] = teams;
   return json;

  // do something else here after firstFunction completes
}

const getLeagueInfo = async ({ myClient }) => {
  const league = await myClient.getLeagueInfo({seasonId:2018});
    let json = {};
     const posLimits = league.rosterSettings.positionLimits;
     json["positionLimits"] = posLimits;

     const starters = league.rosterSettings.lineupPositionCount;

     json["starters"] = starters;
     return json;
}

let server = app.listen(4999, function () {
    console.log('Node server is running..');
});
const base_url = 'https://fantasy.espn.com/apis/v3/games/ffl/seasons/';
// const espn_s2 =	"AEAj9gPU8gCnp2dvfUrEqlC0JQQyKwir79533tbD8w5RIlQJ%2F6INviixyzgCV1M6U0q0Cn3egDdiqyG2W6otQ%2BUeMgyMg7pEMdSfcQ7Vu8U66EkKQ4Io2vJv7guIOvGC71dGdS8aCxw87dTk3BJLXXI91IkWJbtC7woGvWsjkfJalsD0HMBlUVHWOFAbi88ajRl0mJXlttJoIKU6wBvWmBkfkO7F3Ao1nDx%2Bi2LBp5veAXo7GYQgUcsmF276aKCXvFbofji0pP22o9PzLtTDee5v";
// const swid =	"{EC5F527D-0DD6-4E18-BFF5-58C47E4F1027}";
export default server;
