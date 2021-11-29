const {
  createGame,
  endGame,
  getGameById,
  addPlayerToGame,
  getGames,
  keyDown,
  keyUp,
  moveball,
} = require("./gameManager");
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  transports: ["websocket"],
});

const sendGames = (sender) => {
  sender.emit("games", getGames());
};

io.on("connection", (socket) => {
  sendGames(socket);
  socket.on("disconnect", () => {
    endGame({ player: socket });
    sendGames(io);
  });
  socket.on("leave-game", () => {
    endGame({ player: socket });
    sendGames(io);
  });
  socket.on("move-key-down", (keycode) => {
    keyDown({ player: socket, keycode });
    sendGames(io);
  });
  socket.on("move-key-up", (keycode) => {
    keyUp({ player: socket, keycode });
    sendGames(io);
  });
  socket.on("move-ball", () => {
    moveball({ player: socket });
    sendGames(io);
  });
  socket.on("create-game", (name) => {
    const game = createGame({ player: socket, name });
    sendGames(io);
    socket.emit("game-created", game.id);
  });
  socket.on("join-game", (gameId) => {
    const game = getGameById(gameId);
    sendGames(io);
    if (game.numberOfPlayers < 2) {
      addPlayerToGame({
        player: socket,
        gameId,
      });
      sendGames(io);
    }
    sendGames(io);
  });
});

http.listen(4000, () => {
  console.log("listening on *:4000");
});
