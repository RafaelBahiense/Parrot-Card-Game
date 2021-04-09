let cards;
const parrots = ["bobross", "explody", "fiesta", "metal", "revertit", "unicorn", "triplets"];
let flipped = 0;
let jogadas = 0;

gameStart();
function gameStart() {
    do {
        cards = prompt("Quantas cartas?");
    } while (cards % 2 !== 0 && 4 <= cards <= 14);
    deckBuild();
}

function deckBuild() {
    const back = [];
    for (i = 0; i < cards/2; i++) {
        back.push(parrots[i]);
        back.push(parrots[i]);
    }
    back.sort(comparador);
    for (i = 0; i < cards; i++) {
        document.querySelector(".container").innerHTML +=      `<div class="card" onclick="flipper(this)">
                                                                    <div class="front-face face">
                                                                        <img src="/assets/images/front.png" alt="">
                                                                    </div>
                                                                    <div class="back-face face">
                                                                        <img src="/assets/images/${back[i]}parrot.gif" alt="">
                                                                    </div>
                                                                </div>`;
    }
}

function comparador() { 
	return Math.random() - 0.5; 
}

let first;
function flipper(card) {
    if (flipped === 0) {
        first = card;
        flipCard(card);
        flipped++;
    }
    else {
        const second = card;
        console.log(first.children[1].children[0].src);
        console.log(second.children[1].children[0].src);
        if (first.children[1].children[0].src === second.children[1].children[0].src) {
            flipCard(second);
            first.removeAttribute("onclick");
            second.removeAttribute("onclick");
            flipped = 0;
            console.log("igual");
        }
        else {
            flipCard(second);
            setTimeout(flipCard, 1000, first);
            setTimeout(flipCard, 1000, second);
            flipped = 0;
            console.log("diferente");
        }
    }
    console.log(flipped);
}

function flipCard(card) {
    card.children[0].classList.toggle("flip");
    card.children[1].classList.toggle("flip");
    jogadas++;
}