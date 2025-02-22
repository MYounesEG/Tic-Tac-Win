import { useState } from "react";
import Board from "./Board";

export default function Home() {
  return (
    <main>
      <h1>Tic-Tac-Toe</h1>
      <Board />
    </main>
  );
}