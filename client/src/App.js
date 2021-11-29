import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import Home from "./Components/Home/Home";
import Game from "./Components/Game/Game";

import "bootstrap/dist/css/bootstrap.min.css";

const PAGE_GAME = "Game";
const PAGE_Home = "Home";

function App() {
  const [page, setPage] = useState("Home");
  const [games, setGames] = useState([]);
  const [game, setGame] = useState({ board: [] });
  const [gameId, setGameId] = useState(null);
  const [socket, setSocket] = useState(null);

  const joinGame = (gameId) => {
    const game = games.find((g) => g.id === gameId);
    if (game.numberOfPlayers < 2) {
      socket.emit("join-game", gameId);
      setPage(PAGE_GAME);
      setGameId(gameId);
    } else {
      alert("Already 2 Players in this Room!");
    }
  };

  useEffect(() => {
    const game = games.find((g) => g.id === gameId);
    if (game) {
      setGame(game);
    }
  }, [games, gameId]);

  const leaveGame = () => {
    setGame(PAGE_Home);
    socket.emit("leave-game");
  };

  const createGame = (name) => {
    if (name !== "") {
      socket.emit("create-game", name);
      setPage(PAGE_GAME);
      setGameId(game.id);
    }
  };

  const keyDown = (keycode) => {
    if (keycode === 37 || keycode === 38 || keycode === 39 || keycode === 40) {
      socket.emit("move-key-down", keycode);
    }
  };

  const keyUp = (keycode) => {
    if (keycode === 37 || keycode === 38 || keycode === 39 || keycode === 40) {
      socket.emit("move-key-up", keycode);
    }
  };

  const moveBall = () => {
    socket.emit("move-ball");
  };
  useEffect(() => {
    const newSocket = io("http://localhost:4000", {
      transports: ["websocket"],
    });
    newSocket.on("disconnect", () => {
      setGameId(null);
      setPage(PAGE_Home);
      alert("The server crashed or restarted");
    });
    newSocket.on("games", (games) => {
      setGames(games);
    });
    newSocket.on("game-created", (gameId) => {
      setGameId(gameId);
    });
    newSocket.on("end-game", () => {
      setGameId(null);
      setPage(PAGE_Home);
      alert("Your opponent has left the game");
    });
    setSocket(newSocket);
  }, []);

  return (
    <>
      <div style={{ height: "100%" }}>
        {page === PAGE_Home && (
          <Home games={games} joinGame={joinGame} createGame={createGame} />
        )}
        {page === PAGE_GAME && game && (
          <Game
            game={game}
            leaveGame={leaveGame}
            keyDown={keyDown}
            keyUp={keyUp}
            moveBall={moveBall}
          />
        )}
      </div>
    </>
  );
}

export default App;
