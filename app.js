var BowlingGame = (function () {
    function BowlingGame() {
        this.roundBall = 1;
        this.round_max = 20;
        this.round = 1;
        this.round_points = 0;
        this.pins = 10;
        this.pinsLeft = 10;
        this.pinsHit = 0;
    }
    BowlingGame.prototype.addRound = function () {
        this.addScore();
    };
    BowlingGame.prototype.countPins = function () {
        this.pinsHit = Math.floor((Math.random() * this.pinsLeft) + 1);
        this.pinsLeft = this.pinsLeft - this.pinsHit + 1;
    };
    BowlingGame.prototype.addScore = function () {
        if (this.pinsLeft == this.pins) {
            this.countPins();
        }
        var node = document.createElement("span");
        if (this.round == 20) {
        }
        if (this.pinsHit != this.pins) {
            var second_score = Math.floor(Math.random() * this.pinsLeft);
            var firstnode = document.createTextNode(this.pinsHit.toString());
            var secondnode = document.createTextNode(second_score.toString());
            if (this.roundBall % 2 == 0) {
                if (this.pinsHit + second_score == this.pins) {
                    node.appendChild(document.createTextNode("/"));
                }
                else {
                    node.appendChild(secondnode);
                }
                document.getElementById("round-" + this.round.toString()).querySelector(".ball2").appendChild(node);
                this.roundBall = 1;
                this.round++;
                this.pinsLeft = this.pins;
            }
            else {
                node.appendChild(firstnode);
                document.getElementById("round-" + this.round.toString()).querySelector(".ball1").appendChild(node);
                this.roundBall++;
            }
        }
        if (this.pinsHit == this.pins) {
            var strike = document.createTextNode("X");
            node.appendChild(strike);
            document.getElementById("round-" + this.round.toString()).querySelector(".ball1").appendChild(node);
            document.getElementById("round-" + this.round.toString()).querySelector(".ball2").appendChild(document.createTextNode("-"));
            this.round++;
            this.pinsLeft = this.pins;
        }
    };
    return BowlingGame;
}());
var add = new BowlingGame();
