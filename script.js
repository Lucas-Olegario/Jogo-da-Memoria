const board = document.getElementById('game-board');
const scoreDisplay = document.getElementById('score');

const images = [
  'img/Rare_Barley.png', 'img/el primo.png', 'img/Legendary_Crow.png', 'img/Legendary_Spike.png',
  'img/Rare_Barley.png', 'img/el primo.png', 'img/Legendary_Crow.png', 'img/Legendary_Spike.png',
  'img/mortis.png', 'img/Rare_Colt.png', 'img/Rare_Poco.png', 'img/TrophyRoad_Shelly.png',
  'img/mortis.png', 'img/Rare_Colt.png', 'img/Rare_Poco.png', 'img/TrophyRoad_Shelly.png'
];

let shuffledImages = [];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let score = 0;

function shuffle(array) {
  return array.sort(() => 0.5 - Math.random());
}

function createBoard() {
  board.innerHTML = '';
  shuffledImages = shuffle([...images]);
  shuffledImages.forEach((imgSrc, index) => {
    const img = document.createElement('img');
    img.src = 'img/brawl-logo.jpg'; 
    img.dataset.src = imgSrc;
    img.dataset.index = index;
    img.addEventListener('click', flipCard);
    board.appendChild(img);
  });
  score = 0;
  scoreDisplay.textContent = score;
}

function flipCard(e) {
  if (lockBoard) return;
  const card = e.target;
  const index = card.dataset.index;

  if (firstCard && firstCard.dataset.index === index) return;

  card.src = card.dataset.src;

  if (!firstCard) {
    firstCard = card;
  } else {
    secondCard = card;
    lockBoard = true;

    if (firstCard.dataset.src === secondCard.dataset.src) {
      score++;
      scoreDisplay.textContent = score;
      firstCard.removeEventListener('click', flipCard);
      secondCard.removeEventListener('click', flipCard);
      resetSelection();
    } else {
      setTimeout(() => {
        firstCard.src = 'img/brawl-logo.jpg';
        secondCard.src = 'img/brawl-logo.jpg';
        resetSelection();
      }, 1000);
    }
  }
}

function resetSelection() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

function resetGame() {
  createBoard();
}

createBoard();
