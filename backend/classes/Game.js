class Game {
    constructor(player1, player2) {
      this.board = board()
      this.moveHistory = []
      this.player1 = new Player(player1, colors.WHITE)
      this.player1 = new Player(player2, colors.BLACK)
      // this.matchHistory;
    }

    resetBoard() {
        this.board = board();
    }

    runGame(){
        
    }

    checkIfGameEnded() {
      
    }


    
}
  