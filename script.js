/* eslint-env browser */
const Card = function(value) {
  this.value = value;
};

const Board = function(squareSize) {
  this.sequence = [];
  this.squareSize = squareSize;
  this.size = squareSize * squareSize;
  this.selectedCard = "";
};

Board.prototype.startGame = function() {
  console.log("here");
  this.generateHTMLBoard();
  this.generateDataBoard();
  this.randomizeDataBoard();
  this.addEventListenerToCards();
};

Board.prototype.generateHTMLBoard = function() {
  const board = document.createElement("div");
  board.classList.add("wrapper");
  board.id = "board";
  for (let i = 0; i < this.size; i += 1) {
    const cardWrapper = document.createElement("div");
    const card = document.createElement("div");
    const cardFront = document.createElement("div");
    const cardBack = document.createElement("div");
    cardFront.classList.add("card__front");
    cardBack.classList.add("card__back");
    card.classList.add("card");
    card.setAttribute("data-cell", i);
    card.appendChild(cardBack);
    card.appendChild(cardFront);
    cardWrapper.classList.add("card__wrapper");
    cardWrapper.appendChild(card);
    board.appendChild(cardWrapper);
  }
  document.body.appendChild(board);
  this.boardElement = document.getElementById("board");
};

Board.prototype.generateDataBoard = function() {
  for (let i = 0; i < this.size / 2; i += 1) {
    this.sequence.push(new Card(i), new Card(i));
  }
};

Board.prototype.randomizeDataBoard = function() {
  this.sequence.sort(() => {
    return 0.5 - Math.random();
  });
};

Board.prototype.addEventListenerToCards = function() {
  this.boardElement.addEventListener("click", event => {
    if (event.target.matches(".card__front")) {
      const cardElement = event.target.parentNode;
      const index = cardElement.getAttribute("data-cell");
      cardElement.parentNode.classList.add("open");
      cardElement.querySelector(".card__back").innerHTML = this.sequence[
        index
      ].value;
      if (this.selectedCard) {
        if (this.sequence[index].value === this.selectedCard.value) {
          setTimeout(() => {
            this.hideCards();
            this.closeAllCards();
          }, 600);
        } else {
          setTimeout(() => {
            this.closeAllCards();
          }, 600);
        }
      } else {
        this.selectedCard = this.sequence[index];
      }
    }
  });
};

Board.prototype.closeAllCards = function() {
  this.selectedCard = "";
  Array.from(document.getElementsByClassName("card__wrapper")).forEach(i => {
    i.classList.remove("open");
  });
};

Board.prototype.hideCards = function() {
  Array.from(document.getElementsByClassName("card__wrapper open")).forEach(
    i => {
      i.classList.add("hide");
    }
  );
};

// INIT
const board = new Board(4);
board.startGame();
