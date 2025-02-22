"use client";
import { useState } from "react";

export default function Board() {
  const [grid, setGrid] = useState<(null | "X" | "O")[]>(Array(9).fill(null));
  const [player, setPlayer] = useState<"X" | "O">("X");
  const [winner, setWinner] = useState<string | null>(null);
  const [scores, setScores] = useState<{ X: number; O: number }>({ X: 0, O: 0 });
  const [isDraw, setIsDraw] = useState<boolean>(false);

  const handleClick = (index: number) => {
    if (grid[index] || winner) return;

    const newGrid = [...grid];
    newGrid[index] = player;
    setGrid(newGrid);

    if (checkWinner(newGrid)) {
      setWinner(player);
      setScores((prevScores) => ({
        ...prevScores,
        [player]: prevScores[player] + 1,
      }));
      return;
    }

    if (newGrid.every((cell) => cell !== null)) {
      setIsDraw(true);
      return;
    }

    setPlayer(player === "X" ? "O" : "X");
  };

  const checkWinner = (board: (null | "X" | "O")[]) => {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6], // Diagonals
    ];

    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setPlayer(player === "X" ? "O" : "X");
        return true;
      }
    }
    return false;
  };

  const resetGame = () => {
    setGrid(Array(9).fill(null));
    setWinner(null);
    setIsDraw(false);
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div>
      <button className="reset-btn" onClick={resetGame}>Restart</button>
      <button className="fullscreen-btn" onClick={toggleFullScreen}>Fullscreen</button>

      <div className="score-container">
        <div className="score x-score">X: {scores.X}</div>
        <div className="score o-score">O: {scores.O}</div>
      </div>

      <div className="grid-container">
        {grid.map((cell, index) => (
          <div
            className={`grid-item-container ${cell ? "no-hover" : ""}`}
            key={index}
            onClick={() => handleClick(index)}
          >
            <span className={`cell ${cell === "X" ? "x-player" : "o-player"}`}>
              {cell}
            </span>
          </div>
        ))}
      </div>
      
      {winner && <h2 className="winner">Winner: {winner} 🎉</h2>}
      {isDraw && <h2 className="draw">It's a Draw! 🤝</h2>}
    </div>
  );
}