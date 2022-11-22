import '../styles/Board.css'

import { useEffect, useState } from "react"


import {types, colors, vals} from "./Enums"
import Tile from "./Tile"

import blackBishop from '../chess_images/black_bishop.svg'
import blackKnight from '../chess_images/black_knight.svg'
import blackPawn from '../chess_images/black_pawn.svg'
import blackRook from '../chess_images/black_rook.svg'
import blackQueen from '../chess_images/michelle.svg'
import blackKing from '../chess_images/tchalla.svg'

import whiteBishop from '../chess_images/white_bishop.svg'
import whiteKnight from '../chess_images/pokimane_sub.svg'
import whitePawn from '../chess_images/white_pawn.svg'
import whiteRook from '../chess_images/white_rook.svg'
import whiteQueen from '../chess_images/elizabeth.svg'
import whiteKing from '../chess_images/henry.svg'

let pieceImages = {
    blackBishop: blackBishop,
    blackKnight: blackKnight,
    blackPawn: blackPawn,
    blackRook: blackRook,
    blackQueen: blackQueen,
    blackKing: blackKing,
    
    whiteBishop: whiteBishop,
    whiteKnight: whiteKnight,
    whitePawn: whitePawn,
    whiteRook: whiteRook,
    whiteQueen: whiteQueen,
    whiteKing: whiteKing
}

var lastClickedRow = -1;
var lastClickedCol = -1;
var lastClickedIsPiece = false;
var validMoves = []

function generateImageName(piece) {
    let name = "white"
    if(piece.team === colors.BLACK) {
        name = "black"
    }
    switch(piece.type) {
        case(types.KING):
            name += "King"
            return name
        case(types.QUEEN):
            name += "Queen"
            return name
        case(types.ROOK):
            name += "Rook"
            return name
        case(types.BISHOP):
            name += "Bishop"
            return name
        case(types.KNIGHT):
            name += "Knight"
            return name
        case(types.PAWN):
            name += "Pawn"
            return name
        default:
            return ""
    }
}

async function getBoardState() {
    return fetch('http://localhost:8080/boardState')
        .then((res) => res.json())
        .then(res => {
            return res
        })
}

async function generateMoves(row, col) {
    return fetch(`http://localhost:8080/generateMoves?row=${row}&col=${col}`)
        .then((res) => res.json())
        .then(res => {return res})
}

async function makeMove(fromRow, fromCol, endRow, endCol) {
    return fetch(`http://localhost:8080/makeMove?fromRow=${fromRow}&fromCol=${fromCol}&toRow=${endRow}&toCol=${endCol}`)
        .then((res) => res.json())
        .then(res => {return res})
}

function isValidMove(row, col) {
    for(let i = 0; i < validMoves.length; i++){
        if(validMoves[i].row == row && validMoves[i].col == col){
            return true;
        }
    }
    return false;
}

function handleTileClick(row, col, setTiles) {
    getBoardState().then(boardState => {
        updateFromBoardState(boardState, setTiles);
        let clickedTile = boardState.grid[row][col];
        // if the tile clicked is not in valid moves
        // TODO figure out how to make that conditional
        if(!isValidMove(row, col)) {
            if(clickedTile.pieceOccupying === null) {
                return
            }
            lastClickedRow = row;
            lastClickedCol = col;
            lastClickedIsPiece = true;
            
            generateMoves(row, col).then(moves => {
                validMoves = moves;
                console.log('vm')
                console.log(validMoves);
                setTiles(prevTiles => {
                    let newTiles = prevTiles.slice()
                    for(let i = 0; i < moves.length; i++) {
                        let row = moves[i].row;
                        let col = moves[i].col;
                        let currTile = newTiles[row][col];
                        let newTile = <Tile 
                            handleClick={currTile.props.handleClick}
                            key={currTile.key}
                            row={currTile.props.row}
                            col={currTile.props.col}
                            color={2}
                            piece={currTile.props.piece}
                            pieceName={currTile.props.pieceName} 
                        />
                        newTiles[row][col] = newTile;
                    } 
                    return newTiles;
                });
            });
        } else {
            makeMove(lastClickedRow, lastClickedCol, row, col).then(res => {
                getBoardState().then(newBoardState => {
                    updateFromBoardState(newBoardState, setTiles);
                })
            });
            validMoves = []
            lastClickedRow = -1;
            lastClickedCol = -1;
            lastClickedIsPiece = false;
            return 
        }
    });

    // case 1: clicked to move piece to square
    // case 2: a piece is being clicked
    // case 3: empty tile click
    // case 4: taking piece

    // generateMoves(row, col).then(moves => {
    //     setTiles(prevTiles => {
    //         if(prevTiles[row][col].props.color === 2) {
    //             let fromRow, fromCol;
    //             for(let i = 0; i < 8; i++) {
    //                 for(let j = 0; j < 8; j++) {
    //                     if(prevTiles[i][j].props.color === 3) {
    //                         fromRow = i;
    //                         fromCol = j;
    //                         makeMove(fromRow, fromCol, row, col); // .then(getBoardState().then());
    //                     }
    //                 }
    //             }
    //             // makeMove().then(res => {
    //             //     // getBoardState().then(boardState => {

    //             //     // });
    //             // });
    //             return prevTiles;
    //         }
    //         let newTiles = prevTiles.slice();
    //         let startColor = 0; // to keep track of if we are on a white or black square
    //         for(let i = 0; i < 8; i++) {
    //             for(let j = 0; j < 8; j++) {
    //                 let currTile = prevTiles[i][j];
    //                 let newColor = startColor % 2;
    //                 let newTile = <Tile 
    //                     handleClick={currTile.props.handleClick}
    //                     key={currTile.key}
    //                     row={currTile.props.row}
    //                     col={currTile.props.col}
    //                     color={newColor}
    //                     piece={currTile.props.piece}
    //                     pieceName={currTile.props.pieceName} 
    //                 />
    //                 newTiles[i][j] = newTile;
    //                 startColor += 1;
    //             }
    //             startColor += 1;
    //         }

    //         for(let i = 0; i < moves.length; i++) {
    //             let row = moves[i].row;
    //             let col = moves[i].col;
    //             let currTile = newTiles[row][col];
    //             let newTile = <Tile 
    //                 handleClick={currTile.props.handleClick}
    //                 key={currTile.key}
    //                 row={currTile.props.row}
    //                 col={currTile.props.col}
    //                 color={2}
    //                 piece={currTile.props.piece}
    //                 pieceName={currTile.props.pieceName} 
    //             />
    //             newTiles[row][col] = newTile;
    //         }

    //         let currTile = newTiles[row][col];
    //         let newTile = <Tile
    //             handleClick={currTile.props.handleClick}
    //             key={currTile.key}
    //             row={currTile.props.row}
    //             col={currTile.props.col}
    //             color={3}
    //             piece={currTile.props.piece}
    //             pieceName={currTile.props.pieceName} 
    //         />
    //         newTiles[row][col] = newTile;
    //         return newTiles;
    //     })
    // });
}

function updateFromBoardState(boardState, setTiles) {
    let newTiles = []
    let startColor = 0
    for(let i = 0; i < 8; i++) {
        newTiles.push([])
        for(let j = 0; j < 8; j++) {
            let boardTile = boardState.grid[i][j]
            let name = ""
            if(boardTile.pieceOccupying !== null) {
                name = generateImageName(boardTile.pieceOccupying)
            }
            newTiles[i].push(
                <Tile
                    handleClick={(row, col) => {handleTileClick(row, col, setTiles)}}
                    key={i + "|" + j}
                    row={i}
                    col={j}
                    color={startColor % 2}
                    piece={pieceImages[name]}
                    pieceName={name}
                />)
            startColor += 1
        }
        startColor += 1
    }
    setTiles(newTiles)
}

export default function Board(props) {
    const [tiles, setTiles] = useState()

    useEffect(() => {
        getBoardState().then(res => {
            updateFromBoardState(res, setTiles);
        })
    }, [])

    return (
        <>
            <div id="boardContainer">
                {tiles?.map((row, i) => {
                    return (
                        <div key={i} className='boardRow'>
                            {row.map((val, j) => {
                                return val
                            })}
                        </div>
                    )
                })}
            </div>
        </>
    )
    
}