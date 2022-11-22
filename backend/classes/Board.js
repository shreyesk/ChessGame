var enums = require('./Enums.js');
var colors = enums.colors;
var types = enums.types;
var vals = enums.vals;
var teams = enums.teams;

var Tile = require('./Tile.js');
var Piece = require('./Piece.js');
var Position = require('./Position.js');

class Board {
    constructor() {
        this.grid = new Array(vals.NUM_ROWS);
        this.piecesInPlay = []
        this.lastMoved = null;
        this.currentTeam = colors.WHITE

        for (let i = 0; i < vals.NUM_ROWS; i++) {
            this.grid[i] = new Array(vals.NUM_COLS);
            for(let j = 0; j < vals.NUM_COLS; j++) {
                this.grid[i][j] = new Tile(null, new Position(i, j));
            }
        }
        for(let i = 0; i < 8; i++) {
            let newPiece = new Piece(new Position(6, i), 1, colors.BLACK, types.PAWN);
            this.piecesInPlay.push(newPiece);
            this.grid[6][i].pieceOccupying = newPiece;
            newPiece = new Piece(new Position(1, i), 0, colors.WHITE, types.PAWN);
            this.piecesInPlay.push(newPiece);
            this.grid[1][i].pieceOccupying = newPiece;
        }


        // Create rooks
        let newPiece = new Piece(new Position(7, 0), 1, colors.BLACK, types.ROOK);
        this.piecesInPlay.push(new Piece(new Position(7, 0), 1, colors.BLACK, types.ROOK));
        this.grid[7][0].pieceOccupying = newPiece;
        newPiece = new Piece(new Position(0, 0), 0, colors.WHITE, types.ROOK);
        this.piecesInPlay.push(newPiece);
        this.grid[0][0].pieceOccupying = newPiece;
        newPiece = new Piece(new Position(7, 7), 1, colors.BLACK, types.ROOK);
        this.piecesInPlay.push(newPiece);
        this.grid[7][7].pieceOccupying = newPiece;
        newPiece = new Piece(new Position(0, 7), 0, colors.WHITE, types.ROOK);
        this.piecesInPlay.push(newPiece);
        this.grid[0][7].pieceOccupying = newPiece;

        // Create bishops
        newPiece = new Piece(new Position(7, 2), 1, colors.BLACK, types.BISHOP);
        this.piecesInPlay.push(newPiece);
        this.grid[7][2].pieceOccupying = newPiece;
        newPiece = new Piece(new Position(0, 2), 0, colors.WHITE, types.BISHOP);
        this.piecesInPlay.push(newPiece);
        this.grid[0][2].pieceOccupying = newPiece;
        newPiece = new Piece(new Position(7, 5), 1, colors.BLACK, types.BISHOP);
        this.piecesInPlay.push(newPiece);
        this.grid[7][5].pieceOccupying = newPiece;
        newPiece = new Piece(new Position(0, 5), 0, colors.WHITE, types.BISHOP);
        this.piecesInPlay.push(newPiece);
        this.grid[0][5].pieceOccupying = newPiece;

        // Create knights
        newPiece = new Piece(new Position(7, 1), 1, colors.BLACK, types.KNIGHT);
        this.piecesInPlay.push(newPiece);
        this.grid[7][1].pieceOccupying = newPiece;
        newPiece = new Piece(new Position(0, 1), 0, colors.WHITE, types.KNIGHT);
        this.piecesInPlay.push(newPiece);
        this.grid[0][1].pieceOccupying = newPiece;
        newPiece = new Piece(new Position(7, 6), 1, colors.BLACK, types.KNIGHT);
        this.piecesInPlay.push(newPiece);
        this.grid[7][6].pieceOccupying = newPiece;
        newPiece = new Piece(new Position(0, 6), 0, colors.WHITE, types.KNIGHT);
        this.piecesInPlay.push(newPiece);
        this.grid[0][6].pieceOccupying = newPiece;

        // Create queens
        newPiece = new Piece(new Position(7, 4), 1, colors.BLACK, types.QUEEN);
        this.piecesInPlay.push(newPiece);
        this.grid[7][4].pieceOccupying = newPiece;
        newPiece = new Piece(new Position(0, 4), 0, colors.WHITE, types.QUEEN);
        this.piecesInPlay.push(newPiece);
        this.grid[0][4].pieceOccupying = newPiece;

        // Create kings
        newPiece = new Piece(new Position(7, 3), 1, colors.BLACK, types.KING);
        this.piecesInPlay.push(newPiece);
        this.grid[7][3].pieceOccupying = newPiece;
        newPiece = new Piece(new Position(0, 3), 0, colors.WHITE, types.KING);
        this.piecesInPlay.push(newPiece);
        this.grid[0][3].pieceOccupying = newPiece;
        
        this.primaryColor = "#ffffff";
        this.secondaryColor = "#000000";
        this.checkColor = "#D78787";
    }

    generatePawn(piece) {
        let possibleMoves = new Array()
        
        let row = Number(piece.position.row)
        let col = Number(piece.position.col)

        // starting move
        if(piece.team == colors.WHITE){
            if(row + 1 < 8 && this.grid[row + 1][col].pieceOccupying === null){
                possibleMoves.push(new Position(row + 1, col));
                if(row + 2 < 8 && piece.numMoves == 0 && this.grid[row + 2][col].pieceOccupying == null){ 
                    possibleMoves.push(new Position(row + 2, col));
                }
            }
        } else {
            if(row - 1 >= 0 && this.grid[row - 1][col].pieceOccupying === null) {
                possibleMoves.push(new Position(row - 1, col));
                if(row - 2 >= 0 && piece.numMoves == 0 && this.grid[row - 2][col].pieceOccupying == null){ 
                    possibleMoves.push(new Position(row - 2, col));
                }
            }
        }

        // take piece
        if(piece.team == colors.WHITE){
            if(row + 1 < 8 && col != 7 && this.grid[row + 1][col + 1]?.pieceOccupying != null && this.grid[row + 1][col + 1].pieceOccupying.team == colors.BLACK){
                possibleMoves.push(new Position(row + 1, col + 1));
            }
            if(row + 1 < 8 && col != 0 && this.grid[row + 1][col - 1]?.pieceOccupying != null && this.grid[row + 1][col - 1].pieceOccupying.team == colors.BLACK){
                possibleMoves.push(new Position(row + 1, col - 1));
            }
        } else {
            if(row - 1 >= 0 && col != 7 && this.grid[row - 1][col + 1]?.pieceOccupying != null && this.grid[row - 1][col + 1].pieceOccupying.team == colors.WHITE){
                possibleMoves.push(new Position(row - 1, col + 1));
            }
            if(row - 1 >= 0 && col != 0 && this.grid[row - 1][col - 1]?.pieceOccupying != null && this.grid[row - 1][col - 1].pieceOccupying.team == colors.WHITE){
                possibleMoves.push(new Position(row - 1, col - 1));
            }
        }
        
        //en passant
        if(col - 1 >= 0) {
            let left = this.grid[row][col - 1].pieceOccupying
            if(piece.team == colors.WHITE) {
                if(left != null && left.team == colors.BLACK && left.type == types.PAWN && left.numMoves == 1 && left == this.lastMoved)
                    possibleMoves.push(new Position(row + 1, col - 1))
            } else {
                if(left != null && left.team == colors.WHITE && left.type == types.PAWN && left.numMoves == 1 && left == this.lastMoved)
                    possibleMoves.push(new Position(row - 1, col - 1))
            }
        }
        if(col + 1 < 8) {
            let right = this.grid[row][col + 1].pieceOccupying
            if(piece.team == colors.WHITE) {
                if(right != null && right.team == colors.BLACK && right.type == types.PAWN && right.numMoves == 1 && right == this.lastMoved)
                    possibleMoves.push(new Position(row + 1, col + 1))
            } else {
                if(right != null && right.team == colors.WHITE && right.type == types.PAWN && right.numMoves == 1 && right == this.lastMoved)
                    possibleMoves.push(new Position(row - 1, col + 1))
            }
        }
        return possibleMoves;

        // if(piece.position.getRow() == 1 && piece.team == colors.WHITE){
        //     possibleMoves.push([2, piece.position.getCol() + 1]);
        //     possibleMoves.push([3, piece.position.getCol() + 1]);
        // }else if(piece.position.getRow() == 6 && piece.team == colors.BLACK){
        //     possibleMoves.push([5, piece.position.getCol() - 1]);
        //     possibleMoves.push([4, piece.position.getCol() - 1]);
        // }else{
            
        // }
        
    }

    generateBishop(piece) {
        let possibleMoves = new Array();
        let row = Number(piece.position.row);
        let col = Number(piece.position.col);
        

        //checks the down and right diagonal
        for(let i = 1; i < 8; i++){
            if(row + i > 7 || col + i > 7){
                break;
            }
            if(this.grid[row + i][col + i]?.pieceOccupying != null && this.grid[row + i][col + i]?.pieceOccupying.team == piece.team){
                break;
            }
            if(this.grid[row + i][col + i]?.pieceOccupying != null && this.grid[row + i][col + i]?.pieceOccupying.team != piece.team){
                possibleMoves.push(new Position(row + i, col + i));
                break;
            }
            possibleMoves.push(new Position(row + i, col + i));
        }

        //checks the down and left diagonal
        for(let i = 1; i < 8; i++){
            if(row + i > 7 || col - i < 0){
                break;
            }
            if(this.grid[row + i][col - i]?.pieceOccupying != null && this.grid[row + i][col - i]?.pieceOccupying.team == piece.team){
                break;
            }
            if(this.grid[row + i][col - i]?.pieceOccupying != null && this.grid[row + i][col - i]?.pieceOccupying.team != piece.team){
                possibleMoves.push(new Position(row + i, col - i));
                break;
            }
            possibleMoves.push(new Position(row + i, col - i));
        }

        //checks the up and right diagonal
        for(let i = 1; i < 8; i++){
            if(row - i < 0 || col + i > 7){
                break;
            }
            if(this.grid[row - i][col + i].pieceOccupying != null && this.grid[row - i][col + i].pieceOccupying.team == piece.team){
                break;
            }
            if(this.grid[row - i][col + i].pieceOccupying != null && this.grid[row - i][col + i].pieceOccupying.team != piece.team){
                possibleMoves.push(new Position(row - i, col + i));
                break;
            }
            possibleMoves.push(new Position(row - i, col + i));
        }

         //checks the up and left diagonal
         for(let i = 1; i < 8; i++){
            if(row - i < 0 || col - i < 0){
                break;
            }
            if(this.grid[row - i][col - i].pieceOccupying != null && this.grid[row - i][col - i].pieceOccupying.team == piece.team){
                break;
            }
            if(this.grid[row - i][col - i].pieceOccupying != null && this.grid[row - i][col - i].pieceOccupying.team.team != piece.team){
                possibleMoves.push(new Position(row - i, col - i));
                break;
            }
            possibleMoves.push(new Position(row - i, col - i));
        }
        return possibleMoves;
    }

    generateKnight(piece) {
        let row = Number(piece.position.row);
        let col = Number(piece.position.col);
        let possibleMoves = new Array()

        if(row + 2 < 8 && col + 1 < 8 && (this.grid[row + 2][col + 1].pieceOccupying == null || this.grid[row + 2][col + 1].pieceOccupying.team != piece.team)) {
            possibleMoves.push(new Position(row + 2, col + 1));
        }
        if(row + 2 < 8 && col - 1 >= 0 && (this.grid[row + 2][col - 1].pieceOccupying == null || this.grid[row + 2][col - 1].pieceOccupying.team != piece.team)) {
            possibleMoves.push(new Position(row + 2, col - 1));
        }
        if(row - 2 >= 0 && col + 1 < 8 && (this.grid[row - 2][col + 1].pieceOccupying == null || this.grid[row - 2][col + 1].pieceOccupying.team != piece.team)) {
            possibleMoves.push(new Position(row - 2, col + 1));
        }
        if(row - 2 >= 0 && col - 1 >= 0 && (this.grid[row - 2][col - 1].pieceOccupying == null || this.grid[row - 2][col - 1].pieceOccupying.team != piece.team)) {
            possibleMoves.push(new Position(row - 2, col - 1));
        }
        if(row + 1 < 8 && col + 2 < 8 && (this.grid[row + 1][col + 2].pieceOccupying == null || this.grid[row + 1][col + 2].pieceOccupying.team != piece.team)) {
            possibleMoves.push(new Position(row + 1, col + 2));
        }
        if(row + 1 < 8 && col - 2 >= 0 && (this.grid[row + 1][col - 2].pieceOccupying == null || this.grid[row + 1][col - 2].pieceOccupying.team != piece.team)) {
            possibleMoves.push(new Position(row + 1, col - 2));
        }
        if(row - 1 >= 0 && col + 2 < 8 && (this.grid[row - 1][col + 2].pieceOccupying == null || this.grid[row - 1][col + 2].pieceOccupying.team != piece.team)) {
            possibleMoves.push(new Position(row - 1, col + 2));
        }
        if(row - 1 >= 0 && col - 2 >= 0 && (this.grid[row - 1][col - 2].pieceOccupying == null || this.grid[row - 1][col - 2].pieceOccupying.team != piece.team)) {
            possibleMoves.push(new Position(row - 1, col - 2));
        }
        return possibleMoves
    }

    generateRook(piece) {
        let row = Number(piece.position.row)
        let col = Number(piece.position.col)
        let possibleMoves = new Array()

        let left = true;
        let right = true;
        let down = true;
        let up = true;

        for(var i = 1; i < 8; i++) {
            left = col - i >= 0 && left
            right = col + i < 8 && right
            up = row - i >= 0 && up
            down = row + i < 8 && down
            if(left && (this.grid[row][col - i]?.pieceOccupying == null || this.grid[row][col - i]?.pieceOccupying.team != piece.team)) {
                possibleMoves.push(new Position(row, col - i));
                if(this.grid[row][col - i].pieceOccupying !== null) {
                    left = false;
                }
            } else {
                left = false;
            }
            if(right && (this.grid[row][col + i]?.pieceOccupying == null || this.grid[row][col + i]?.pieceOccupying.team != piece.team)) {
                possibleMoves.push(new Position(row, col + i));
                if(this.grid[row][col + i].pieceOccupying !== null) {
                    right = false;
                }
            } else {
                right = false;
            }
            if(up && (this.grid[row - i][col]?.pieceOccupying == null || this.grid[row - i][col]?.pieceOccupying.team != piece.team)) {
                possibleMoves.push(new Position(row - i, col));
                if(this.grid[row - i][col].pieceOccupying !== null) {
                    up = false;
                }
            } else {
                up = false;
            }
            if(down && (this.grid[row + i][col]?.pieceOccupying == null || this.grid[row + i][col]?.pieceOccupying.team != piece.team)) {
                possibleMoves.push(new Position(row + i, col));
                if(this.grid[row + i][col].pieceOccupying !== null) {
                    down = false;
                }
            } else {
                down = false;
            }
        }
        return possibleMoves;
    }

    generateQueen(piece) {
        let possibleMoves = this.generateBishop(piece);
        let rook = this.generateRook(piece);

        for(let i = 0; i < rook.length; i++){
            possibleMoves.push(rook[i]);
        }
        return possibleMoves;
    }

    generateMoves(piece) {
        if(piece === null){
            return []
        }
        if(piece.team == this.currentTeam) {
            switch(piece.type) {
                case types.PAWN:
                    return this.generatePawn(piece);
                case types.BISHOP: 
                    return this.generateBishop(piece);
                case types.ROOK:
                    return this.generateRook(piece);
                case types.KNIGHT:
                    return this.generateKnight(piece);
                case types.QUEEN:
                    return this.generateQueen(piece);
                case types.KING:
                    return this.generateKing(piece);
            }
        }
        return []
    }

    isSquareAttacked(team, position){
        for(let i = 0; i < this.piecesInPlay.length; i++){
            if(this.piecesInPlay[i].team != team && this.piecesInPlay[i].type != types.KING){
                this.currentTeam = this.currentTeam == colors.WHITE ? colors.BLACK : colors.WHITE
                let moves = this.generateMoves(this.piecesInPlay[i]);
                this.currentTeam = this.currentTeam == colors.WHITE ? colors.BLACK : colors.WHITE
                for(let x = 0; x < moves.length; x++){
                    if(moves[x].row == position.row && moves[x].col == position.col) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    print() {
        let ret = "";
        for(let i = 0; i < this.grid.length; i++){
            for(let j = 0; j < this.grid[i].length; j++){
                ret += this.grid[i][j].pieceOccupying == null ? "0" : this.grid[i][j].pieceOccupying.type;
                ret += " ";
            }
            ret += "\n";
        }
        return ret;
    }
    
    isKingSafe(team) {
        for(let i = 0; i < this.piecesInPlay.length; i++) {
            if(this.piecesInPlay[i].team == team && this.piecesInPlay[i].type == types.KING) {
                return this.isSquareAttacked(this.piecesInPlay[i].team, this.piecesInPlay[i].position)
            }
        }
    }

    generateKing(piece) {
        let row = Number(piece.position.row);
        let col = Number(piece.position.col);
        let possibleMoves = []
        for(let i = -1; i < 2; i++) {
            for(let j = -1; j < 2; j++) {
                if(row + i >= 0 && row + i < 8 && col + j >= 0 && col + j < 8) {
                    if(i == 0 && j == 0) {
                        continue;
                    }
                    let pos = new Position(row + i, col + j);
                    if(!this.isSquareAttacked(piece.team, pos) && (this.grid[row + i][col + j]?.pieceOccupying == null || this.grid[row + i][col + j]?.pieceOccupying.team != piece.team)) {
                        possibleMoves.push(pos);
                    }
                }
            }
        }
        return possibleMoves
    }
 
    move(currRow, currCol, endRow, endCol) {
        // make sure moving the piece to the end position is valid
        // remove the piece pointer from the initial tile
        // set the piece pointer for the end tile to be piece
        let piece = this.grid[currRow][currCol].pieceOccupying;
        currRow = Number(currRow)
        currCol = Number(currCol)
        endRow = Number(endRow)
        endCol = Number(endCol)
        
        // check if en passant took place
        if(piece.team == colors.BLACK && piece.type == types.PAWN && endCol != currCol && this.grid[endRow][endCol].pieceOccupying == null) {
            this.grid[endRow + 1][endCol].pieceOccupying = null;
        } else if(piece.team == colors.WHITE && piece.type == types.PAWN && endCol != currCol && this.grid[endRow][endCol].pieceOccupying == null) {
            this.grid[endRow - 1][endCol].pieceOccupying = null;
        }

        this.grid[endRow][endCol].pieceOccupying = piece
        this.grid[endRow][endCol].pieceOccupying.position.rowAndCol(endRow, endCol)
        this.grid[endRow][endCol].pieceOccupying.incrementMoves()
        this.lastMoved = this.grid[endRow][endCol].pieceOccupying
        this.grid[currRow][currCol].pieceOccupying = null
        // Swap active team
        this.currentTeam = this.currentTeam == colors.WHITE ? colors.BLACK : colors.WHITE
    }
} 
module.exports = Board;