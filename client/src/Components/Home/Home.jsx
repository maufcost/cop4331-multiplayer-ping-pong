import React, { useState } from "react";
import Button from "react-bootstrap/Button";

export default function Home({ joinGame, games, createGame }) {
  const [name, setName] = useState("");

  return (
    <div
      className="d-flex justify-content-center row"
      style={{ height: "100vh" }}
    >
      <div className="d-flex flex-column align-self-center text-light">
        <h2 className="text-center mb-2 text-primary">Multiplayer Ping Pong Game</h2>
        <div className="row">
          <div className="col col-3"></div>
          <div className="d-flex justify-content-center flex-column col-6">
            <input
              className="form-control"
              value={name}
              onChange={({ target }) => setName(target.value)}
              type="text"
              placeholder="Enter Your Room Name Here..."
            />
            <button
              onClick={() => createGame(name)}
              type="button"
              className="btn btn-outline-primary mt-1"
            >
              Create A New Room
            </button>
          </div>
        </div>
        <p className="text-center mt-1 mb-1">OR</p>
        <div className="row">
          <div className="col-1"></div>
          <div className="col-10">
            <table className="table text-light">
              <thead>
                <tr className="bg-primary">
                  <th scope="col">Room Name</th>
                  <th scope="col">Players</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {games.length === 0 && (
                  <tr>
                    <td colSpan="3">No Room Created Yet</td>
                  </tr>
                )}
                {games.map((game) => (
                  <tr key={game.name}>
                    <td>{game.name}</td>
                    <td>{game.numberOfPlayers}</td>
                    <td>
                      <Button onClick={() => joinGame(game.id)}  variant="link">Join Game</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
