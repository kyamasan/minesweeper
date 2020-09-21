import React, { useEffect, useState } from 'react';
import createBoard from '../util/createBoard';
import { revealed } from '../util/reveal';
import Cell from './Cell';
import Modal from './Modal';
import Timer from './Timer';

export default function Board() {
  const [grid, setGrid] = useState([]);
  const [nonMineCount, setNonMineCount] = useState(0);
  const [mineLocations, setMineLocations] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  //ComponentDidMount
  useEffect(() => {
    freshBoard();
  }, []);

  const freshBoard = () => {
    const newBoard = createBoard(10, 10, 1);
    setNonMineCount(10 * 10 - 15);
    setMineLocations(newBoard.mineLocation);
    setGrid(newBoard.board);
  };

  const restartGame = () => {
    setGameOver(false);
    freshBoard();
  };

  //Right Click
  const updateFlag = (e, x, y) => {
    e.preventDefault();
    let newGrid = JSON.parse(JSON.stringify(grid));
    newGrid[x][y].flagged = true;
    setGrid(newGrid);
  };

  //Reveal Cell
  const revealCell = (x, y) => {
    if (grid[x][y].revealed || gameOver) {
      return;
    }
    let newGrid = JSON.parse(JSON.stringify(grid));
    if (newGrid[x][y].value === 'X') {
      for (let i = 0; i < mineLocations.length; i++) {
        newGrid[mineLocations[i][0]][mineLocations[i][1]].revealed = true;
      }
      setGrid(newGrid);
      setGameOver(true);
    } else {
      let newRevealedBoard = revealed(newGrid, x, y, nonMineCount);
      setGrid(newRevealedBoard.arr);
      setNonMineCount(newRevealedBoard.newNonMinesCount);
      if (newRevealedBoard.newNonMinesCount === 0) {
        setGameOver(true);
      }
    }
  };

  return (
    <div>
      <p>Minesweeper</p>
      <Timer />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          position: 'relative',
        }}
      >
        {gameOver && <Modal restartGame={restartGame} />}
        {grid.map((singleRow, index) => (
          <div style={{ display: 'flex' }} key={index}>
            {singleRow.map((singleBlock, index) => (
              <Cell
                revealCell={revealCell}
                details={singleBlock}
                updateFlag={updateFlag}
                key={index}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
