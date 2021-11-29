import React, { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import "./Game.css";

export default function Game({ leaveGame, game, keyDown, keyUp, moveBall }) {
  const [color, setColor] = useState("#9f3acf")
  const [size, setSize] = useState("80px")

  useEffect(() => {
    window.addEventListener("keydown", (e) => keyDown(e.keyCode));
    window.addEventListener("keyup", (e) => keyUp(e.keyCode));
    window.setInterval(moveBall, 30);

    return () => leaveGame();
  }, []);

  useEffect(() => {
      // Power up and down
      const id = setInterval(() => {
          if (size === "80px") {
              setSize("40px")
          }else {
              setSize("80px")
          }
      }, 2000)

      return () => clearInterval(id)
  }, [size])

  const isGameStarted = () => game.numberOfPlayers === 2;

  const renderWaiting = () => {
    return (
      <div className="col">
        <div className="text-center">
          <h2 className="mb-4">{game.name}</h2>
          <div className="mb-4">
            <Spinner animation="border" role="status" />
          </div>
          <span>Waiting for an opponent....</span>
        </div>
      </div>
    );
  };

  const changeColor = () => {
      const possibleColors = ["#1bcccc", "#2312a3", "#c714b2", "#e0b010", "#e3105a", "#9f3acf"]
      const currIx = possibleColors.indexOf(color)
      const newIx = currIx + 1;
      if (newIx > possibleColors.length - 1) {
          setColor(possibleColors[newIx % possibleColors.length])
      }else {
          setColor(possibleColors[newIx])
      }
  }

  const colorStyle1 = { backgroundColor: color }

  const colorStyle2 = { backgroundColor: "#f29224" }

  const renderGame = () => {
    return (
      <>
        <div className="game-room">
          <div className="line"></div>
          {game.styles.map((newstyle, i) => {
              let stylesForElement = Object.assign({}, newstyle)
              if (game.classes[i] === "paddel1") {
                stylesForElement["backgroundColor"] = color
                stylesForElement["width"] = size
              }
              return (
                  <div key={i} className={game.classes[i]} style={stylesForElement}></div>
              )
          })}
          <div className="game-info">
            <p className="pp-title">Let's play multiplayer ping pong!</p>
            <p>Player 1 color: <span className="my-color" style={colorStyle1}></span><button onClick={changeColor}>Change color</button></p>
            <p>Player 2 color: <span className="my-color" style={colorStyle2}></span></p>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="row h-100 align-items-center">
      {!isGameStarted() && renderWaiting()}
      {isGameStarted() && renderGame()}
    </div>
  );
}
