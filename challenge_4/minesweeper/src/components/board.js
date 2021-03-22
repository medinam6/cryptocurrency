import React, { useState, useEffect } from "react";
import createBoard from '../utils/createBoard';

function Board() {
    const [grid, setGrid] = useState([]);
    const [banner, setBanner] = useState('Minesweeper');

    useEffect(() => {
        newBoard();
    }, []);

    const newBoard = () => {
      const newBoard = createBoard(10,10,10);
      setGrid(newBoard.board);
    }

    const checkCells = (grid, x, y) => {

      if (x >= grid.length || x<0 || y >= grid[x].length||y<0){
        return grid;
      }
      if (grid[x][y].value !== 0 || grid[x][y].className === 'shownCells') {
        return grid;
      }
      grid[x][y].className = 'shownCells';
      checkCells(grid, x+1, y);
      checkCells(grid, x-1, y);
      checkCells(grid, x, y+1);
      checkCells(grid, x, y-1);
      return grid;
    }

    const handleClick =(cell) => {
      let newGrid=JSON.parse(JSON.stringify(grid));
      if (newGrid[cell.x][cell.y].value === 0) {
        newGrid = checkCells(newGrid, cell.x, cell.y);
        setGrid(newGrid);
      } else if (newGrid[cell.x][cell.y].value === 'X') {
        setBanner(<h1>'You lose!'</h1>);
      } else {
        newGrid[cell.x][cell.y].className = "shownCells"
        setGrid(newGrid);
      }

  }

    return (
      <div>
        {banner}
        <div className="board">
            {
            grid.map((row, rowIndex) => {
                return (
                    <div className="rows" key={rowIndex}>
                        {row.map((col, colIndex) => {
                                return <div onClick={() => {handleClick((col))}} className={col.className} key={colIndex}>
                                    {JSON.stringify(col.value)}
                                    </div>
                        })}
                    </div>
                )
            })}
        </div>
      </div>
    )

}
export default Board;