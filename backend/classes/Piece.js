class Piece {

    constructor(position, weight, team, type) {
      this.position = position;
      this.weight = weight;
      this.team = team;
      this.type = type;
      this.numMoves = 0;
      this.isLastPieceMoved = false;
    }

    incrementMoves() {
        this.numMoves++;
    }

    print() {
        return type + " " + team + " " + this.position.print();
    }

  }
  
module.exports = Piece;