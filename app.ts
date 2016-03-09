class BowlingGame{
  roundBall: number = 1;
  round_max: number = 10;
  round: number = 1;
  pins: number = 10;
  pinsLeft: number = 10;
  pinsHit: number = 0;

  constructor(){
  }

  addRound(){
    this.addScore();
  }

  countPins(){
    this.pinsHit = Math.floor((Math.random() * this.pinsLeft) + 1);
    this.pinsLeft = this.pinsLeft - this.pinsHit + 1;
  }

  addScore(){
    if(this.pinsLeft == this.pins){
      this.countPins();
    }
    const node = document.createElement("span");
    if(this.round == this.round_max){

    }
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
        document.getElementById("round-" + this.round.toString()).querySelector(".ball2").appendChild(node);
        this.roundBall = 1;
        this.round++;
        this.pinsLeft = this.pins;
      } else {
        node.appendChild(firstnode);
        document.getElementById("round-" + this.round.toString()).querySelector(".ball1").appendChild(node);
        this.roundBall++;

      }
    }
    if(this.pinsHit == this.pins){
      const strike = document.createTextNode("X");
      node.appendChild(strike);
      document.getElementById("round-" + this.round.toString()).querySelector(".ball1").appendChild(node);
      document.getElementById("round-" + this.round.toString()).querySelector(".ball2").appendChild(document.createTextNode("-"));
      this.round++;
      this.pinsLeft = this.pins;
    }

  }

}

const add = new BowlingGame();
