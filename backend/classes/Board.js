var enums = require('./Enums.js');
var colors = enums.colors;
var types = enums.types;
var vals = enums.vals;

var Tile = require('./Tile.js');
var Piece = require('./Piece.js');
var Position = require('./Position.js');

class Board {
    constructor() {
        this.grid = new Array(vals.NUM_ROWS);
        this.pieces = []
        this.lastMoved = null;

        for (let i = 0; i < vals.NUM_ROWS; i++) {
            this.grid[i] = new Array(vals.NUM_COLS);
            for(let j = 0; j < vals.NUM_COLS; j++) {
                this.grid[i][j] = new Tile(null, new Position(i, j));
            }
        }
        for(var i = 0; i < 8; i++) {
            let newPiece = new Piece(new Position(6, i), 1, colors.BLACK, types.PAWN);
            this.pieces.push(newPiece);
            this.grid[6][i].pieceOccupying = newPiece;
            newPiece = new Piece(new Position(1, i), 0, colors.WHITE, types.PAWN);
            this.pieces.push(newPiece);
            this.grid[1][i].pieceOccupying = newPiece;
        }
        
        // Create rooks
        let newPiece = new Piece(new Position(7, 0), 1, colors.BLACK, types.ROOK);
        this.pieces.push(new Piece(new Position(7, 0), 1, colors.BLACK, types.ROOK));
        this.grid[7][0].pieceOccupying = newPiece;
        newPiece = new Piece(new Position(0, 0), 0, colors.WHITE, types.ROOK);
        this.pieces.push(newPiece);
        this.grid[0][0].pieceOccupying = newPiece;
        newPiece = new Piece(new Position(7, 7), 1, colors.BLACK, types.ROOK);
        this.pieces.push(newPiece);
        this.grid[7][7].pieceOccupying = newPiece;
        newPiece = new Piece(new Position(0, 7), 0, colors.WHITE, types.ROOK);
        this.pieces.push(newPiece);
        this.grid[0][7].pieceOccupying = newPiece;

        // Create bishops
        newPiece = new Piece(new Position(7, 2), 1, colors.BLACK, types.BISHOP);
        this.pieces.push(newPiece);
        this.grid[7][2].pieceOccupying = newPiece;
        newPiece = new Piece(new Position(0, 2), 0, colors.WHITE, types.BISHOP);
        this.pieces.push(newPiece);
        this.grid[0][2].pieceOccupying = newPiece;
        newPiece = new Piece(new Position(7, 5), 1, colors.BLACK, types.BISHOP);
        this.pieces.push(newPiece);
        this.grid[7][5].pieceOccupying = newPiece;
        newPiece = new Piece(new Position(0, 5), 0, colors.WHITE, types.BISHOP);
        this.pieces.push(newPiece);
        this.grid[0][5].pieceOccupying = newPiece;

        // Create knights
        newPiece = new Piece(new Position(7, 1), 1, colors.BLACK, types.KNIGHT);
        this.pieces.push(newPiece);
        this.grid[7][1].pieceOccupying = newPiece;
        newPiece = new Piece(new Position(0, 1), 0, colors.WHITE, types.KNIGHT);
        this.pieces.push(newPiece);
        this.grid[0][1].pieceOccupying = newPiece;
        newPiece = new Piece(new Position(7, 6), 1, colors.BLACK, types.KNIGHT);
        this.pieces.push(newPiece);
        this.grid[7][6].pieceOccupying = newPiece;
        newPiece = new Piece(new Position(0, 6), 0, colors.WHITE, types.KNIGHT);
        this.pieces.push(newPiece);
        this.grid[0][6].pieceOccupying = newPiece;

        // Create queens
        newPiece = new Piece(new Position(6, i), 1, colors.BLACK, types.QUEEN);
        this.pieces.push(newPiece);
        this.grid[7][4].pieceOccupying = newPiece;
        newPiece = new Piece(new Position(0, 4), 0, colors.WHITE, types.QUEEN);
        this.pieces.push(newPiece);
        this.grid[0][4].pieceOccupying = newPiece;

        // Create kings
        newPiece = new Piece(new Position(7, 3), 1, colors.BLACK, types.KING);
        this.pieces.push(newPiece);
        this.grid[7][3].pieceOccupying = newPiece;
        newPiece = new Piece(new Position(0, 3), 0, colors.WHITE, types.KING);
        this.pieces.push(newPiece);
        this.grid[0][3].pieceOccupying = newPiece;
        
        this.primaryColor = "#ffffff";
        this.secondaryColor = "#000000";
        this.checkColor = "#D78787";
    }

    generatePawn(piece){ // need work
        let possibleMoves = new Array()
        
        let row = piece.position.row
        let col = piece.position.col

        // starting move
        if(piece.numMoves == 0){
            if(piece.team == colors.WHITE){
                if(this.grid[row + 1][col].pieceOccupying === null) {
                    possibleMoves.push(new Position(row + 1, col));
                    if(this.grid[row + 2][col].pieceOccupying == null){ 
                        possibleMoves.push(new Position(row + 2, col));
                    }
                } 
            } else {
                if(this.grid[row - 1][col].pieceOccupying === null) {
                    possibleMoves.push(new Position(row - 1, col));
                    if(this.grid[row - 2][col].pieceOccupying == null){ 
                        possibleMoves.push(new Position(row - 2, col));
                    }
                }
            }
        } else {
            if(piece.team == colors.WHITE){
                if(this.grid[row + 1][col].pieceOccupying == null) {
                    possibleMoves.push(new Position(row + 1, col));
                }
            }else{
                if(this.grid[row - 1][col].pieceOccupying == null) {
                    possibleMoves.push(new Position(row - 1, col));
                }
            }
        }
        
        //take peice
        if(piece.team == colors.WHITE){
            if(col != 7 && this.grid[row + 1][col - 1]?.pieceOccupying != null && this.grid[row + 1][col - 1]?.pieceOccupying.team == colors.BLACK){
                possibleMoves.push(new Position(row + 1, col) - 1);
            }
            if(col != 0 && this.grid[row + 1][col + 1]?.pieceOccupying != null && this.grid[row + 1][col + 1]?.pieceOccupying.team == colors.BLACK){
                possibleMoves.push(new Position(row + 1, col + 1));
            }
        }else{
            if(col != 7 && this.grid[row - 1][col - 1]?.pieceOccupying != null && this.grid[row - 1][col - 1]?.pieceOccupying.team == colors.WHITE){
                possibleMoves.push(new Position(row - 1, col - 1));
            }
            if(col != 0 && this.grid[row - 1][col + 1]?.pieceOccupying != null && this.grid[row - 1][col + 1]?.pieceOccupying.team == colors.WHITE){
                possibleMoves.push(new Position(row - 1, col + 1));
            }
        }
        
        //en passant
        if(piece.team == colors.WHITE){
            if(col != 7 && this.grid[row][col - 1]?.pieceOccupying != null && this.grid[row][col - 1]?.pieceOccupying.team == colors.BLACK && this.grid[row][col - 1]?.pieceOccupying.type == type.PAWN && this.grid[row][col - 1]?.pieceOccupying.firstMove && this.grid[row][col - 1]?.pieceOccupying == this.lastMoved){
                possibleMoves.push(new Position(row + 1, col) - 1);
            }
            if(col != 0 && this.grid[row][col + 1]?.pieceOccupying != null && this.grid[row][col + 1]?.pieceOccupying.team == colors.BLACK && this.grid[row][col + 1]?.pieceOccupying.type == type.PAWN && this.grid[row][col + 1]?.pieceOccupying.firstMove && this.grid[row][col + 1]?.pieceOccupying == this.lastMoved){
                possibleMoves.push(new Position(row + 1, col + 1));
            }
        } else {
            if(col != 7 && this.grid[row - 1][col - 1]?.pieceOccupying != null && this.grid[row - 1][col - 1]?.pieceOccupying.team == colors.WHITE && this.grid[row][col - 1]?.pieceOccupying.type == type.PAWN && this.grid[row][col - 1]?.pieceOccupying.firstMove && this.grid[row][col - 1]?.pieceOccupying == this.lastMoved){
                possibleMoves.push(new Position(row - 1, col - 1));
            }
            if(col != 0 && this.grid[row - 1][col + 1]?.pieceOccupying != null && this.grid[row - 1][col + 1]?.pieceOccupying.team == colors.WHITE && this.grid[row][col + 1]?.pieceOccupying.type == type.PAWN && this.grid[row][col + 1]?.pieceOccupying.firstMove && this.grid[row][col + 1]?.pieceOccupying == this.lastMoved){
                possibleMoves.push(new Position(row - 1, col + 1));
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
        console.log('generating moves for bishop')
        let possibleMoves = new Array();
        let row = Number(piece.position.row);
        let col = Number(piece.position.col);
        console.log('bishop at ' + row + ' ' + col)
        

        //checks the down and right diagonal
        for(let i = 1; i < 8; i++){
            if(row + i > 7 || col + i > 7){
                console.log(row+i, col+i)
                console.log('first')
                break;
            }
            if(this.grid[row + i][col + i]?.pieceOccupying != null && this.grid[row + i][col + i]?.pieceOccupying.team == piece.team){
                console.log('second')
                break;
            }
            if(this.grid[row + i][col + i]?.pieceOccupying != null && this.grid[row + i][col + i]?.pieceOccupying.team != piece.team){
                possibleMoves.push(new Position(row + i, col + i));
                console.log('second')
                break;
            }
            console.log(row+i, col+i)
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

        console.log(possibleMoves);
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
        console.log('rook at ' + row + ' ' + col)
        let possibleMoves = new Array()

        let left = true;
        let right = true;
        let down = true;
        let up = true;

        for(var i = 1; i < 8; i++) {
            left = col - i >= 0 && left
            right = col + i < 8 && right
            down = row - i >= 0 && down
            up = row + i < 8 && up
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
            console.log('')
            if(down && (this.grid[row - i][col]?.pieceOccupying == null || this.grid[row - i][col]?.pieceOccupying.team != piece.team)) {
                possibleMoves.push(new Position(row - i, col));
                if(this.grid[row - i][col].pieceOccupying !== null) {
                    down = false;
                }
            } else {
                down = false;
            }
            if(up && (this.grid[row + i][col]?.pieceOccupying == null || this.grid[row + i][col]?.pieceOccupying.team != piece.team)) {
                possibleMoves.push(new Position(row + i, col));
                if(this.grid[row + i][col].pieceOccupying !== null) {
                    up = false;
                }
            } else {
                up = false;
            }
        }
        return possibleMoves;
    }

    generateQueen(piece){
        let possibleMoves = this.generateBishop(piece);
        let rook = this.generateRook(piece);

        for(let i = 0; i < rook.length; i++){
            possibleMoves.push(rook[i]);
        }
        return possibleMoves;
    }



    generateMoves(piece) {
        if(piece === null){
            return [];
        }
        switch(piece.type){
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
    isSquareAttacked(piece, position){
        teamColor = piece.team;
        enemyMoves = newArray();

        for(let i = 0; i < piece.length; i++){
            if(piece[i].team != teamColor){
                moves = generateMoves(piece[i]);
                for(let x = 0; x < moves.length; x++){
                    if(moves[x] == position){
                        return true;
                    }
                }
            }
        }
        return false;
    }

    print(){
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
    
    generateKing(piece) {
        let row = Number(piece.row);
        let col = Number(piece.col);
        
        let possibleMoves = []

        for(var i = -1; i < 2; i++) {
            for(var j = -1; j < 2; j++) {
                if(row + i >= 0 && row + i < 8 && col + j >= 0 && col + j < 8) {
                    if(i == 0 && j == 0) {
                        continue;
                    }
                    pos = new Position(row + i, col + j);
                    if(!this.isSquareAttacked(piece.color, pos)) {
                        possibleMoves.push(pos);
                    }
                }
            }
        }
        return possibleMoves
    }
    // generateAttack(piece) {
    //     possibleMoves = [[]];
    //     switch(piece.type){
    //         case types.PAWN:
    //             return this.generatePawn(piece);
    //         case types.BISHOP: 
    //             return this.generateBishop(piece);
    //         case types.ROOK:
    //             return this.generateRook(piece);
    //         case types.KNIGHT:
    //             return this.generateKnight(piece);
    //         case types.QUEEN:
    //             return this.generateQueen(piece);
    //         case types.KING:
    //     }
    // }
 
    move(currRow, currCol, endRow, endCol) {
        // make sure moving the piece to the end position is valid
        // remove the piece pointer from the initial tile
        // set the piece pointer for the end tile to be piece
        let piece = this.grid[currRow][currCol].pieceOccupying;
        //this.grid[endRow][endCol].pieceOccupying = this.grid[currRow][currCol].pieceOccupying
        this.grid[endRow][endCol].pieceOccupying = new Piece(piece.position, piece.weight, piece.team, piece.type)
        this.grid[endRow][endCol].pieceOccupying.position.rowAndCol(endRow, endCol)
        this.grid[endRow][endCol].pieceOccupying.incrementMoves()
        this.lastMoved = this.grid[endRow][endCol].pieceOccupying
        this.grid[currRow][currCol].pieceOccupying = null
        console.log(this.grid[endRow][endCol].pieceOccupying);
        console.log(this.grid[currRow][currCol].pieceOccupying);
    }
} 
module.exports = Board;