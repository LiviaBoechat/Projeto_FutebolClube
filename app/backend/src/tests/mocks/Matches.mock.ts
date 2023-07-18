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
  
  export {
    tokenMock,
    matchMock,
    reqCreateMatch,
    matchesMock,
    trueMatchesMock,
    updateMatchMock,
    updateEqualMatchMock,
  };