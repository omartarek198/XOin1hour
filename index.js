class XO {
    board = [3][3];
    currSymbol = 'O'

  displayBoard() {
    var cell = 0;
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        // console.log("|  ", cell, "   |")
        process.stdout.write(`${"|  " + cell + "   |"}`);
        cell++;
      }
      console.log("");
    }
  }
    placeXOinCell(cell)
    {
        if (cell > 8 || cell < 0)
            return -1
        
       const rows = [[0, 1, 2], [3, 4, 5], [6, 7, 8]]
        var ct = 0
        var R = 0
        var C = 0
        for (var i = 0; i < 3;i++)
        {

            var row = rows[i]
            var index = row.indexOf(cell)
                // console.log(index);
                // console.log(row)
            if (index > -1)
            {
                C = ct;
                R = index;
                break;
            }
            ct++;
        }

        // console.log("R: ", R)
        // console.log("C: ", C)

        if (this.board[R][C] != ' ')
            return -1
        else
        {
            this.board[R][C] = currSymbol;    
        }
    }
  validate(x) {
    var num = parseInt(x);
    if (Number.isNaN(num)) {
      console.log("invalid");
      return -1;
    } else {
        return num
    }
  }
  getCellFromUser() {
    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });
     var cell = 0
    readline.question("Enter Cell Number", (cell) => {
        cell = this.validate(cell);
         if (cell == -1) {
           this.getCellFromUser();
         } else {
           this.placeXOinCell(cell);
         }
      readline.close();
    });
     
      
  }
}

var xo = new XO();

xo.displayBoard();
xo.getCellFromUser();
