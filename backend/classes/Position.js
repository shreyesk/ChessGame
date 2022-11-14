class Position {
    constructor(row, col) {
        this.row = row;
        this.col = col;
    }

    rowAndCol(row, col){
        this.row = row;
        this.col = col;
    }
    
    print(){
        return toString(this.col + 49) + toString(this.row + 1);
    }
}

module.exports = Position;