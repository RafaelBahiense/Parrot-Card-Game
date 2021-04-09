let cards;
const parrots = ["bobross", "explody", "fiesta", "metal", "revertit", "unicorn", "triplets"];
let flippedCache = 0;
let moves = 0;
let flipped = 0;
let timePassed = 0;
let timeID;

gameStart();
function gameStart() {
    let remainder;
    let range;
    do {
        cards = parseInt(prompt("Quantas cartas?"));
        remainder = cards % 2 === 1;
        range = cards < 4 || cards > 14;
    } while (remainder || range);
    deckBuild();
    timeID = setInterval(time, 1000);
}

function deckBuild() {
    const backFaces = [];
    for (i = 0; i < cards/2; i++) {
        backFaces.push(parrots[i]);
        backFaces.push(parrots[i]);
    }
    backFaces.sort(comparador);
    for (i = 0; i < cards; i++) {
        document.querySelector(".container").innerHTML +=      `<div class="card" onclick="flipper(this)">
                                                                    <div class="front-face face">
                                                                        <img src="assets/images/front.png" alt="">
                                                                    </div>
                                                                    <div class="back-face face">
                                                                        <img src="assets/images/${backFaces[i]}parrot.gif" alt="">
                                                                    </div>
                                                                </div>`;
    }
}

function comparador() { 
	return Math.random() - 0.5; 
}

let firstCard;
function flipper(card) {
    if (flippedCache === 0) {
        firstCard = card;
        flipCard(card);
        flippedCache++;
    }
    else {
        const secondCard = card;
        if (firstCard.children[1].children[0].src === secondCard.children[1].children[0].src) {
            flipCard(secondCard);
            firstCard.removeAttribute("onclick");
            secondCard.removeAttribute("onclick");
            flippedCache = 0;
            flipped += 2;
            verifyGameEnd();
        }
        else {
            flipCard(secondCard);
            setTimeout(flipCard, 1000, firstCard);
            setTimeout(flipCard, 1000, secondCard);
            flippedCache = 0;
        }
    }
    moves++;
}

function flipCard(card) {
    card.children[0].classList.toggle("flip");
    card.children[1].classList.toggle("flip");
    verifyGameEnd();
}

function verifyGameEnd() {
    if(flipped === cards) {
        gameEnd();
    }
}

function gameEnd() {
    clearInterval(timeID);
    alert(`Você ganhou em ${moves} jogadas e no tempo ${new Date(timePassed * 1000).toISOString().substr(11, 8)}`);
    const restartGame = prompt("Deseja jogar novamente? (S/N)");
    if (restartGame === "S" || restartGame === "s") {
        document.querySelector(".container").innerHTML = ""
        flippedCache = 0;
        moves = 0;
        flipped = 0;
        timePassed = 0;
        time();
        gameStart();
    } else {
        alert("Obrigado por jogar!");
    }
}

function time() {
    timePassed++;
    document.querySelector(".time").innerHTML = new Date(timePassed * 1000).toISOString().substr(11, 8);
}