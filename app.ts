class BowlingGame{
  roundBall: number = 1;
  round_max: number = 12;
  round: number = 1;
  pins: number = 10;
  pinsLeft: number = 10;
  pinsHit: number = 0;
  total: Array<number> = [];
  newRound: boolean = true;
  bonusStrike: boolean = false;
  spareBonus: boolean = false;
  extraBall: boolean = false;
  finished: boolean = false;

  addRound(){
    this.addScore();
  }

  countPins(){
    this.pinsHit = Math.floor((Math.random() * this.pinsLeft) + 1);
    const msg1 = 'First ball hit for: ' + this.pinsHit;
    document.getElementById('msg').querySelector('h4').innerHTML = msg1;
    this.pinsLeft = this.pinsLeft - this.pinsHit + 1;
    const msg2 = 'There are ' + (this.pinsLeft - 1) + ' pin(s) left';
    document.getElementById('msg').querySelector('h6').innerHTML = msg2;
  }

  addScore(){
    if(this.newRound){
      this.countPins();
    }
    const node = document.createElement("span");
    if(this.finished == true){
      location.reload();
    }
    if(this.round != 11 || this.extraBall){
      if(this.pinsHit != this.pins){
        const second_score = Math.floor(Math.random() * this.pinsLeft);
        const firstnode = document.createTextNode(this.pinsHit.toString());
        const secondnode = document.createTextNode(second_score.toString());
          if(this.roundBall%2==0){
            if(this.pinsHit + second_score == this.pins) {
              node.appendChild(document.createTextNode("/"));
            } else{
              node.appendChild(secondnode);
            }
            const msg1 = 'Second ball hit: ' + second_score + ' pins';
            document.getElementById('msg').querySelector('h4').innerHTML = msg1;
            const msg2 = 'There are ' + (this.pinsLeft - second_score - 1) + ' pins left';
            document.getElementById('msg').querySelector('h6').innerHTML = msg2;
            document.getElementById("round-" + this.round.toString()).querySelector(".ball2").appendChild(node);
            this.total.push(this.pinsHit + second_score);
            if(this.bonusStrike){
              let totalScore = this.total[this.round - 1] + 10;
              this.total[this.round - 2] = totalScore + this.total[this.round - 2];
              let total = this.total.reduce((a, b) => {
               return a + b;
              });
              let update = total - this.total[this.round -1];
              document.getElementById("round-" + (this.round - 1).toString()).querySelector('#total').innerHTML = update.toString();
              this.bonusStrike = false;
            }
            if(this.spareBonus){
              let totalScore = second_score + 10;
              this.total[this.round - 2] = totalScore + this.total[this.round - 2];
              let total = this.total.reduce((a, b) => {
               return a + b;
              });
              let update = total - this.total[this.round -1];
              document.getElementById("round-" + (this.round - 1).toString()).querySelector('#total').innerHTML = update.toString();
              this.spareBonus = false;
            }
            let totalScore = this.total.reduce((a, b) => {
              return a + b;
            });
            document.getElementById("round-" + this.round.toString()).querySelector('#total').innerHTML = totalScore.toString();
            this.roundBall = 1;
            if(this.pinsHit + second_score == this.pins) {
              this.spareBonus = true;
              if(this.round == 10){
                this.extraBall = true;
              };
            }
            this.round++;
            if(this.round == 11 && !this.extraBall){
              const msg1 = 'Game Finished!';
              document.getElementById('msg').querySelector('h4').innerHTML = msg1;
              const msg2 = 'Your score: ' + totalScore.toString();
              document.getElementById('msg').querySelector('h6').innerHTML = msg2;
              document.getElementById('button').innerHTML = 'Reset';
              this.finished = true;
            }
            this.pinsLeft = this.pins;
            this.newRound = true;
          } else {
            node.appendChild(firstnode);
            if(this.round != 11){
              document.getElementById("round-" + this.round.toString()).querySelector(".ball1").appendChild(node);
            } else {
              document.getElementById("round-" + (this.round - 1).toString()).querySelector(".ball3").appendChild(node);
              this.total.push(this.pinsHit);
              let totalScore = this.total.reduce((a, b) => {
                return a + b;
              });
              document.getElementById("round-" + (this.round - 1).toString()).querySelector('#total').innerHTML = totalScore.toString();
              if(this.round >= 11 || !this.extraBall){
                const msg1 = 'Game Finished!';
                document.getElementById('msg').querySelector('h4').innerHTML = msg1;
                const msg2 = 'Your score: ' + totalScore.toString();
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
    if(this.round != 11 || this.extraBall){
      if(this.pinsHit == this.pins){
        const strike = document.createTextNode("X");
        node.appendChild(strike);
        if(this.round < 10){
          document.getElementById("round-" + this.round.toString()).querySelector(".ball1").appendChild(node);
          document.getElementById("round-" + this.round.toString()).querySelector(".ball2").appendChild(document.createTextNode("-"));
          this.total.push(this.pinsHit);
        }
        else if(this.round == 10){
          document.getElementById("round-" + this.round.toString()).querySelector(".ball1").appendChild(node);
          this.total.push(this.pinsHit);
        }
        else if(this.round == 11){
          document.getElementById("round-" + (this.round - 1).toString()).querySelector(".ball2").appendChild(node);
          this.total.push(this.pinsHit);
          let totalScore = this.total.reduce((a, b) => {
            return a + b;
          });
          document.getElementById("round-" + (this.round - 1).toString()).querySelector('#total').innerHTML = totalScore.toString();
        } else{
          document.getElementById("round-" + (this.round - 2).toString()).querySelector(".ball3").appendChild(node);
          this.total.push(this.pinsHit);
          let totalScore = this.total.reduce((a, b) => {
            return a + b;
          });
          document.getElementById("round-" + (this.round - 2).toString()).querySelector('#total').innerHTML = totalScore.toString();
          const msg1 = 'Game Finished!';
          document.getElementById('msg').querySelector('h4').innerHTML = msg1;
          const msg2 = 'Your score: ' + totalScore.toString();
          document.getElementById('msg').querySelector('h6').innerHTML = msg2;
          document.getElementById('button').innerHTML = 'Reset';
          this.finished = true;
        }
        if(this.bonusStrike){
          if(this.round <= 10){
            let totalScore = this.total[this.round - 1] + 10;
            this.total[this.round - 2] = totalScore + this.total[this.round - 2];
            let total = this.total.reduce((a, b) => {
             return a + b;
            });
            let update = total - this.total[this.round -1];
            document.getElementById("round-" + (this.round - 1).toString()).querySelector('#total').innerHTML = update.toString();
            this.bonusStrike = false;
          }
        }
        let totalScore = this.total.reduce((a, b) => {
          return a + b;
        });
        if(this.round <=10){
        document.getElementById("round-" + this.round.toString()).querySelector('#total').innerHTML = totalScore.toString();}
        this.bonusStrike = true;
        if(this.round != 12){
          this.round++;
        }
        this.pinsLeft = this.pins;
        this.newRound = true;
      }
    }
  }

}

const add = new BowlingGame();
