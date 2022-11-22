const express = require("express");
const app = express();

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});


var Board = require('./classes/Board.js');
let board = new Board();

app.get("/boardState", (req, res) => {
  res.send(board);
});

app.get("/generateMoves", (req, res) => {
  let row = req.query['row'];
  let col = req.query['col'];
  let thisPiece = board.grid[row][col].pieceOccupying;
  moves = board.generateMoves(thisPiece)
  res.send(moves)
});

app.get("/makeMove", (req, res) => {
  let fromRow = req.query['fromRow'];
  let fromCol = req.query['fromCol'];
  let toRow = req.query['toRow'];
  let toCol = req.query['toCol'];
  board.move(fromRow, fromCol, toRow, toCol);
  res.send(board);
});
  
const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`Server started on port ${PORT}`));

/*
class Test {
  constructor() {
    this.a = "hello";
  }

  changeA() {
    this.a = "bye";
  }
}

t = new Test();
t.changeA();
*/