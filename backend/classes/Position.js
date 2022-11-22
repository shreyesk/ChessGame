class Position {
    constructor(row, col) {
        this.row = Number(row);
        this.col = Number(col);
    }

    rowAndCol(row, col){
        this.row = Number(row);
        this.col = Number(col);
    }
    
    print(){
        return toString(this.col + 49) + toString(this.row + 1);
    }
}

module.exports = Position;