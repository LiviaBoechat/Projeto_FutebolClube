const tokenMock = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjg5NjEyODY1fQ.iXSQRTZQ_jV2cV115uR18C6Pqw1T_TydAqHfglqlg6Q';

const matchMock = {
    "id": 1,
    "homeTeamId": 16,
    "homeTeamGoals": 2,
    "awayTeamId": 8,
    "awayTeamGoals": 2,
    "inProgress": true,
  };

  const reqCreateMatch = {
    "homeTeamId": 16,
    "awayTeamId": 8, 
    "homeTeamGoals": 2,
    "awayTeamGoals": 2,
  }

  const matchesMock = [
    {
      "id": 41,
      "homeTeamId": 16,
      "homeTeamGoals": 2,
      "awayTeamId": 9,
      "awayTeamGoals": 0,
      "inProgress": true,
      "homeTeam": {
        "teamName": "São Paulo"
      },
      "awayTeam": {
        "teamName": "Internacional"
      }
    },
    {
      "id": 42,
      "homeTeamId": 6,
      "homeTeamGoals": 1,
      "awayTeamId": 1,
      "awayTeamGoals": 0,
      "inProgress": true,
      "homeTeam": {
        "teamName": "Ferroviária"
      },
      "awayTeam": {
        "teamName": "Avaí/Kindermann"
      }
    }
  ];

  const trueMatchesMock = [
    {
        "id": 41,
        "homeTeamId": 16,
        "homeTeamGoals": 2,
        "awayTeamId": 9,
        "awayTeamGoals": 0,
        "inProgress": true,
        "homeTeam": {
          "teamName": "São Paulo"
        },
        "awayTeam": {
          "teamName": "Internacional"
        }
      },
      {
        "id": 42,
        "homeTeamId": 6,
        "homeTeamGoals": 1,
        "awayTeamId": 1,
        "awayTeamGoals": 0,
        "inProgress": true,
        "homeTeam": {
          "teamName": "Ferroviária"
        },
        "awayTeam": {
          "teamName": "Avaí/Kindermann"
        }
      }
];

const updateMatchMock = {
    "homeTeamGoals": 3,
    "awayTeamGoals": 1
  }

const updateEqualMatchMock = {
"homeTeamGoals": 3,
"awayTeamGoals": 3
}

const allLeaderboardMock = [
  {
    "name": "Corinthians",
    "totalPoints": 15,
    "totalGames": 6,
    "totalVictories": 5,
    "totalDraws": 0,
    "totalLosses": 1,
    "goalsFavor": 14,
    "goalsOwn": 4,
    "goalsBalance": 10,
    "efficiency": 83.33333333333334
  },
  {
    "name": "Palmeiras",
    "totalPoints": 13,
    "totalGames": 5,
    "totalVictories": 4,
    "totalDraws": 1,
    "totalLosses": 0,
    "goalsFavor": 17,
    "goalsOwn": 5,
    "goalsBalance": 12,
    "efficiency": 86.66666666666667
  },
]
  export {
    tokenMock,
    matchMock,
    reqCreateMatch,
    matchesMock,
    trueMatchesMock,
    updateMatchMock,
    updateEqualMatchMock,
    allLeaderboardMock,
  };