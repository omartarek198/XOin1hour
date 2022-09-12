"use strict";
var get = require("http").get;
var exit = require("process").exit;
var readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
});
var XO = /** @class */ (function () {
    function XO() {
        this.board = [];
        this.currSymbol = 'X';
        for (var i = 0; i < 3; i++) {
            this.board[i] = [];
        }
        for (var i = 0; i < 3; i++) {
            for (var k = 0; k < 3; k++) {
                this.board[i][k] = ' ';
            }
        }
    }
    XO.prototype.displayBoard = function () {
        var cell = 0;
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                // console.log("|  ", cell, "   |")
                if (this.board[i][j] == ' ') {
                    process.stdout.write("".concat("|  " + cell + "   |"));
                }
                else {
                    process.stdout.write("".concat("|  " + this.board[i][j] + "   |"));
                }
                cell++;
            }
            console.log("");
        }
    };
    XO.prototype.placeXOinCell = function (cell) {
        if (cell > 8 || cell < 0)
            return -1;
        var rows = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
        ];
        var ct = 0;
        var R = 0;
        var C = 0;
        for (var i = 0; i < 3; i++) {
            var row = rows[i];
            var index = row.indexOf(cell);
            // console.log(index);
            // console.log(row)
            if (index > -1) {
                R = ct;
                C = index;
                break;
            }
            ct++;
        }
        // console.log("R: ", R)
        // console.log("C: ", C)
        if (this.board[R][C] != " ")
            return -1;
        else {
            this.board[R][C] = this.currSymbol;
            if (this.Connected(R, C) == 1) {
                console.log(this.currSymbol, " won");
                exit();
            }
            this.currSymbol == 'O' ? this.currSymbol = 'X' : this.currSymbol = 'O';
            return 1;
        }
        return 0;
    };
    XO.prototype.Connected = function (r, c) {
        var ct = 0;
        for (var i = 0; i < 3; i++) {
            ct = 0;
            for (var k = 0; k < 3; k++) {
                if (this.board[i][k] != this.currSymbol) {
                    break;
                }
                else {
                    ct++;
                }
            }
            if (ct == 3) {
                return 1;
            }
            else {
                ct = 0;
            }
        }
        for (var i = 0; i < 3; i++) {
            ct = 0;
            for (var k = 0; k < 3; k++) {
                if (this.board[k][i] != this.currSymbol) {
                    break;
                }
                else {
                    ct++;
                }
            }
            if (ct == 3) {
                return 1;
            }
            else {
                ct = 0;
            }
        }
        //diagonals
        for (i = 0; i < 3; i++) {
            if (this.board[i][i] != this.currSymbol) {
                ct = 0;
                break;
            }
            else {
                ct++;
            }
        }
        if (ct == 3)
            return 1;
        else {
            console.log(ct);
        }
        var j = 2;
        for (i = 0; i < 3; i++) {
            if (this.board[i][j] != this.currSymbol) {
                ct = 0;
                break;
            }
            else {
                ct++;
            }
            j--;
        }
        if (ct == 3)
            return 1;
        return 0;
    };
    XO.prototype.validate = function (x) {
        var num = parseInt(x);
        if (Number.isNaN(num)) {
            console.log("invalid");
            return -1;
        }
        else {
            return num;
        }
    };
    XO.prototype.getCellFromUser = function () {
        var _this = this;
        var cell = 0;
        readline.question("Enter Cell Number", function (cell) {
            cell = _this.validate(cell);
            if (cell == -1) {
                _this.getCellFromUser();
            }
            else {
                var result = 0;
                var result = _this.placeXOinCell(cell);
                if (result == -1) {
                    console.log("invalid");
                    _this.getCellFromUser();
                }
                if (result == 1) {
                    _this.displayBoard();
                    _this.getCellFromUser();
                }
            }
            // readline.close();
        });
    };
    return XO;
}());
var xo = new XO();
xo.displayBoard();
xo.getCellFromUser();
