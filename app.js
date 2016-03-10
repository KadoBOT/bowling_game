var BowlingGame = (function () {
    function BowlingGame() {
        this.roundBall = 1;
        this.round_max = 12;
        this.round = 1;
        this.pins = 10;
        this.pinsLeft = 10;
        this.pinsHit = 0;
        this.total = [];
        this.newRound = true;
        this.bonusStrike = false;
        this.spareBonus = false;
        this.extraBall = false;
        this.finished = false;
    }
    BowlingGame.prototype.addRound = function () {
        this.addScore();
    };
    BowlingGame.prototype.countPins = function () {
        this.pinsHit = Math.floor((Math.random() * this.pinsLeft) + 1);
        var msg1 = 'First ball hit for: ' + this.pinsHit;
        document.getElementById('msg').querySelector('h4').innerHTML = msg1;
        this.pinsLeft = this.pinsLeft - this.pinsHit + 1;
        var msg2 = 'There are ' + (this.pinsLeft - 1) + ' pin(s) left';
        document.getElementById('msg').querySelector('h6').innerHTML = msg2;
    };
    BowlingGame.prototype.addScore = function () {
        if (this.newRound) {
            this.countPins();
        }
        var node = document.createElement("span");
        if (this.finished == true) {
            location.reload();
        }
        if (this.round != 11 || this.extraBall) {
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
                    var msg1 = 'Second ball hit: ' + second_score + ' pins';
                    document.getElementById('msg').querySelector('h4').innerHTML = msg1;
                    var msg2 = 'There are ' + (this.pinsLeft - second_score - 1) + ' pins left';
                    document.getElementById('msg').querySelector('h6').innerHTML = msg2;
                    document.getElementById("round-" + this.round.toString()).querySelector(".ball2").appendChild(node);
                    this.total.push(this.pinsHit + second_score);
                    if (this.bonusStrike) {
                        var totalScore_1 = this.total[this.round - 1] + 10;
                        this.total[this.round - 2] = totalScore_1 + this.total[this.round - 2];
                        var total = this.total.reduce(function (a, b) {
                            return a + b;
                        });
                        var update = total - this.total[this.round - 1];
                        document.getElementById("round-" + (this.round - 1).toString()).querySelector('#total').innerHTML = update.toString();
                        this.bonusStrike = false;
                    }
                    if (this.spareBonus) {
                        var totalScore_2 = second_score + 10;
                        this.total[this.round - 2] = totalScore_2 + this.total[this.round - 2];
                        var total = this.total.reduce(function (a, b) {
                            return a + b;
                        });
                        var update = total - this.total[this.round - 1];
                        document.getElementById("round-" + (this.round - 1).toString()).querySelector('#total').innerHTML = update.toString();
                        this.spareBonus = false;
                    }
                    var totalScore = this.total.reduce(function (a, b) {
                        return a + b;
                    });
                    document.getElementById("round-" + this.round.toString()).querySelector('#total').innerHTML = totalScore.toString();
                    this.roundBall = 1;
                    if (this.pinsHit + second_score == this.pins) {
                        this.spareBonus = true;
                        if (this.round == 10) {
                            this.extraBall = true;
                        }
                        ;
                    }
                    this.round++;
                    if (this.round == 11 && !this.extraBall) {
                        var msg1_1 = 'Game Finished!';
                        document.getElementById('msg').querySelector('h4').innerHTML = msg1_1;
                        var msg2_1 = 'Your score: ' + totalScore.toString();
                        document.getElementById('msg').querySelector('h6').innerHTML = msg2_1;
                        document.getElementById('button').innerHTML = 'Reset';
                        this.finished = true;
                    }
                    this.pinsLeft = this.pins;
                    this.newRound = true;
                }
                else {
                    node.appendChild(firstnode);
                    if (this.round != 11) {
                        document.getElementById("round-" + this.round.toString()).querySelector(".ball1").appendChild(node);
                    }
                    else {
                        document.getElementById("round-" + (this.round - 1).toString()).querySelector(".ball3").appendChild(node);
                        this.total.push(this.pinsHit);
                        var totalScore = this.total.reduce(function (a, b) {
                            return a + b;
                        });
                        document.getElementById("round-" + (this.round - 1).toString()).querySelector('#total').innerHTML = totalScore.toString();
                        if (this.round >= 11 || !this.extraBall) {
                            var msg1 = 'Game Finished!';
                            document.getElementById('msg').querySelector('h4').innerHTML = msg1;
                            var msg2 = 'Your score: ' + totalScore.toString();
                            document.getElementById('msg').querySelector('h6').innerHTML = msg2;
                            document.getElementById('button').innerHTML = 'Reset';
                            this.finished = true;
                        }
                    }
                    this.roundBall++;
                    this.newRound = false;
                }
            }
        }
        if (this.round != 11 || this.extraBall) {
            if (this.pinsHit == this.pins) {
                var strike = document.createTextNode("X");
                node.appendChild(strike);
                if (this.round < 10) {
                    document.getElementById("round-" + this.round.toString()).querySelector(".ball1").appendChild(node);
                    document.getElementById("round-" + this.round.toString()).querySelector(".ball2").appendChild(document.createTextNode("-"));
                    this.total.push(this.pinsHit);
                }
                else if (this.round == 10) {
                    document.getElementById("round-" + this.round.toString()).querySelector(".ball1").appendChild(node);
                    this.total.push(this.pinsHit);
                }
                else if (this.round == 11) {
                    document.getElementById("round-" + (this.round - 1).toString()).querySelector(".ball2").appendChild(node);
                    this.total.push(this.pinsHit);
                    var totalScore_3 = this.total.reduce(function (a, b) {
                        return a + b;
                    });
                    document.getElementById("round-" + (this.round - 1).toString()).querySelector('#total').innerHTML = totalScore_3.toString();
                }
                else {
                    document.getElementById("round-" + (this.round - 2).toString()).querySelector(".ball3").appendChild(node);
                    this.total.push(this.pinsHit);
                    var totalScore_4 = this.total.reduce(function (a, b) {
                        return a + b;
                    });
                    document.getElementById("round-" + (this.round - 2).toString()).querySelector('#total').innerHTML = totalScore_4.toString();
                    var msg1 = 'Game Finished!';
                    document.getElementById('msg').querySelector('h4').innerHTML = msg1;
                    var msg2 = 'Your score: ' + totalScore_4.toString();
                    document.getElementById('msg').querySelector('h6').innerHTML = msg2;
                    document.getElementById('button').innerHTML = 'Reset';
                    this.finished = true;
                }
                if (this.bonusStrike) {
                    if (this.round <= 10) {
                        var totalScore_5 = this.total[this.round - 1] + 10;
                        this.total[this.round - 2] = totalScore_5 + this.total[this.round - 2];
                        var total = this.total.reduce(function (a, b) {
                            return a + b;
                        });
                        var update = total - this.total[this.round - 1];
                        document.getElementById("round-" + (this.round - 1).toString()).querySelector('#total').innerHTML = update.toString();
                        this.bonusStrike = false;
                    }
                }
                var totalScore = this.total.reduce(function (a, b) {
                    return a + b;
                });
                if (this.round <= 10) {
                    document.getElementById("round-" + this.round.toString()).querySelector('#total').innerHTML = totalScore.toString();
                }
                this.bonusStrike = true;
                if (this.round != 12) {
                    this.round++;
                }
                this.pinsLeft = this.pins;
                this.newRound = true;
            }
        }
    };
    return BowlingGame;
}());
var add = new BowlingGame();
