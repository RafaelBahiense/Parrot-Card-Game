let cards;
const parrots = ["bobross", "explody", "fiesta", "metal", "revertit", "unicorn", "triplets"];
let flippedCache = 0;
let moves = 0;
let flipped = 0;
let timePassed = 0;
let timeID;

gameStart();
function gameStart() {
    do {
        cards = parseInt(prompt("Quantas cartas?"));
    } while (cards % 2 !== 0 && 4 <= cards <= 14);
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
                                                                        <img src="/assets/images/front.png" alt="">
                                                                    </div>
                                                                    <div class="back-face face">
                                                                        <img src="/assets/images/${backFaces[i]}parrot.gif" alt="">
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
        console.log(firstCard.children[1].children[0].src);
        console.log(secondCard.children[1].children[0].src);
        if (firstCard.children[1].children[0].src === secondCard.children[1].children[0].src) {
            flipCard(secondCard);
            firstCard.removeAttribute("onclick");
            secondCard.removeAttribute("onclick");
            flippedCache = 0;
            flipped += 2;
            verifyGameEnd();
            console.log("igual");
        }
        else {
            flipCard(secondCard);
            setTimeout(flipCard, 1000, firstCard);
            setTimeout(flipCard, 1000, secondCard);
            flippedCache = 0;
            console.log("diferente");
        }
    }
    moves++;
    console.log("moves", moves);
    console.log(flippedCache);
}

function flipCard(card) {
    card.children[0].classList.toggle("flip");
    card.children[1].classList.toggle("flip");
    setTimeout(verifyGameEnd, 300);
}

function verifyGameEnd() {
    console
    if(flipped === cards) {
        gameEnd();
    }
}

function gameEnd() {
    clearInterval(timeID);
    const restart = prompt(`Você ganhou em ${moves} jogadas!
    Deseja jogar novamente? (S/N)`);
    if (restart === "S" || restart === "s") {
        document.querySelector(".container").innerHTML = ""
        flippedCache = 0;
        moves = 0;
        flipped = 0;
        timePassed = 0;
        time()
        gameStart();
    }
}

function time() {
    timePassed++;
    document.querySelector(".time").innerHTML = new Date(timePassed * 1000).toISOString().substr(11, 8);
}