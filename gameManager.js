let nextGameId = 0;
const games = [];

const getGameForPlayer = (player) => {
  return games.find((g) => g.players.find((p) => p.socket === player));
};

exports.getGames = () =>
  games.map((g) => {
    const { players, ...game } = g;
    return {
      ...game,
      numberOfPlayers: players.length,
    };
  });

exports.createGame = ({ player, name }) => {
  const game = {
    name,
    ballX: 300,
    ballY: 40,
    paddel1X: 0,
    paddel1Y: 470,
    paddel2X: 200,
    paddel2Y: 0,
    speedpaddel1X: 0,
    speedpaddel2X: 0,
    speedpaddel1Y: 0,
    speedpaddel2Y: 0,
    paddelHeight: 30,
    paddelWidth: 80,
    ballRadius: 25,
    speedBall: 4,
    ballDirectionX: -1,
    ballDirectionY: 1,
    styles: [
      { left: "0px", top: "450px" },
      { left: "200px", top: "0px" },
      { left: "300px", top: "40px" },
    ],
    classes: ["paddel1", "paddel2", "ball"],
    players: [
      {
        socket: player,
      },
    ],
    id: nextGameId++,
  };
  games.push(game);
  return game;
};

exports.keyDown = ({ player, keycode }) => {
  if (keycode !== 37 && keycode !== 38 && keycode !== 39 && keycode !== 40)
    return;
  var game = getGameForPlayer(player);
  if (game === undefined) return;
  if (game.players.length < 2) return;
  // key: left arrow
  if (keycode === 37) {
    if (game.players[0].socket === player) {
      game.speedpaddel1X = -10;
    } else if (game.players[1].socket === player) {
      game.speedpaddel2X = -10;
    }
  }
  // key: right arrow
  if (keycode === 39) {
    if (game.players[0].socket === player) {
      game.speedpaddel1X = 10;
    } else if (game.players[1].socket === player) {
      game.speedpaddel2X = 10;
    }
  }
  //Up move
  if (keycode === 38) {
    if (game.players[0].socket === player) {
      game.speedpaddel1Y = -10;
    } else if (game.players[1].socket === player) {
      game.speedpaddel2Y = -10;
    }
  }
  //down move
  if (keycode === 40) {
    if (game.players[0].socket === player) {
      game.speedpaddel1Y = 10;
    } else if (game.players[1].socket === player) {
      game.speedpaddel2Y = 10;
    }
  }
};

exports.keyUp = ({ player, keycode }) => {
  if (keycode !== 37 && keycode !== 38 && keycode !== 39 && keycode !== 40)
    return;
  var game = getGameForPlayer(player);
  if (game === undefined) return;
  if (game.players.length < 2) return;
  // key: left arrow
  if (keycode === 37) {
    if (game.players[0].socket === player) {
      game.speedpaddel1X = 0;
    } else if (game.players[1].socket === player) {
      game.speedpaddel2X = 0;
    }
  }
  // key: right arrow
  if (keycode === 39) {
    if (game.players[0].socket === player) {
      game.speedpaddel1X = 0;
    } else if (game.players[1].socket === player) {
      game.speedpaddel2X = 0;
    }
  }
  //Up move
  if (keycode === 38) {
    if (game.players[0].socket === player) {
      game.speedpaddel1Y = 0;
    } else if (game.players[1].socket === player) {
      game.speedpaddel2Y = 0;
    }
  }
  //down move
  if (keycode === 40) {
    if (game.players[0].socket === player) {
      game.speedpaddel1Y = 0;
    } else if (game.players[1].socket === player) {
      game.speedpaddel2Y = 0;
    }
  }
};

exports.moveball = ({ player }) => {
  let width = 375;//1090;
  let height = 812;//500;
  var game = getGameForPlayer(player);
  if (game === undefined) return;
  if (game.players.length < 2) return;
  // Paddles Movement Configuration
  let paddel1X = game.paddel1X + game.speedpaddel1X;
  let paddel2X = game.paddel2X + game.speedpaddel2X;
  let paddel1Y = game.paddel1Y + game.speedpaddel1Y;
  let paddel2Y = game.paddel2Y + game.speedpaddel2Y;
  // Ball movement configuration
  let ballx = game.ballX + game.speedBall * game.ballDirectionX;
  let bally = game.ballY + game.speedBall * game.ballDirectionY;
  // To prevent the paddels from going off boundaries
  //constrains for player 01
  if (paddel1X < 0) {
    paddel1X = 0;
  }
  if (paddel1X >= width - game.paddelWidth) {
    paddel1X = width - game.paddelWidth;
  }
  if (paddel1Y < 0) {
    paddel1Y = 0;
  }
  if (paddel1Y >= height - game.paddelHeight) {
    paddel1Y = height - game.paddelHeight;
  }
  //constrains for player 02
  if (paddel2X < 0) {
    paddel2X = 0;
  }
  if (paddel2X >= width - game.paddelWidth) {
    paddel2X = width - game.paddelWidth;
  }
  if (paddel2Y < 0) {
    paddel2Y = 0;
  }
  if (paddel2Y >= height - game.paddelHeight) {
    paddel2Y = height - game.paddelHeight;
  }
  // To prevent the ball from going off boundaries
  if (ballx <= 0) {
    game.ballDirectionX = 1;
  }
  if (ballx >= width - game.ballRadius) {
    game.ballDirectionX = -1;
  }
  if (bally <= 0) {
    game.ballDirectionY = 1;
  }
  if (bally >= height - game.ballRadius) {
    game.ballDirectionY = -1;
  }
  //Touching With paddel
  if (game.ballDirectionY === -1) {
    if (ballx >= paddel1X && ballx <= paddel1X + game.paddelWidth) {
      if (bally >= paddel1Y && bally <= paddel1Y + game.paddelHeight) {
        game.ballDirectionY = 1;
      }
    } else if (ballx >= paddel2X && ballx <= paddel2X + game.paddelWidth) {
      if (bally >= paddel2Y && bally <= paddel2Y + game.paddelHeight) {
        game.ballDirectionY = 1;
      }
    }
  } else if (game.ballDirectionY === 1) {
    if (ballx >= paddel1X && ballx <= paddel1X + game.paddelWidth) {
      if (
        bally + 2 * game.ballRadius > paddel1Y &&
        bally + 2 * game.ballRadius <= paddel1Y + game.paddelHeight
      ) {
        game.ballDirectionY = -1;
      }
    } else if (ballx >= paddel2X && ballx <= paddel2X + game.paddelWidth) {
      if (
        bally + 2 * game.ballRadius > paddel2Y &&
        bally + 2 * game.ballRadius <= paddel2Y + game.paddelHeight
      ) {
        game.ballDirectionY = -1;
      }
    }
  }
  // Final state update for this function
  game.paddel1X = paddel1X;
  game.paddel2X = paddel2X;
  game.paddel1Y = paddel1Y;
  game.paddel2Y = paddel2Y;
  game.ballX = ballx;
  game.ballY = bally;
  game.styles[0] = { left: `${paddel1X}px`, top: `${paddel1Y}px` };
  game.styles[1] = { left: `${paddel2X}px`, top: `${paddel2Y}px` };
  game.styles[2] = { left: `${ballx}px`, top: `${bally}px` };
};

exports.getGameById = (gameId) =>
  exports.getGames().find((g) => g.id === gameId);

exports.addPlayerToGame = ({ player, gameId }) => {
  const game = games.find((g) => g.id === gameId);
  if (game.players.length < 2) {
    game.players.push({
      socket: player,
    });
  }
};

exports.endGame = ({ player }) => {
  const game = getGameForPlayer(player);
  // players might disconnect while in the Home
  if (!game) return;
  games.splice(games.indexOf(game), 1);
  game.players.forEach((currentPlayer) => {
    if (player !== currentPlayer.socket) currentPlayer.socket.emit("end-game");
  });
};
