const cards = document.querySelector(".deck");
let icons = [];

// shuffle cards
const cardsArray = document.querySelectorAll(".card");
cardsArray.forEach(card => {
    let child = card.children[0];
    icons.push(child.className);
});

shuffleCards = () =>{
    i=0;
    icons = shuffle(icons);
    cardsArray.forEach(card => {
        let child = card.children[0];
        child.className = icons[i];
        i++;
    });
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
const restart = document.querySelector(".restart");
restart.addEventListener("click", shuffleCards);
//

// check card if matched or not
myFunc = (event) => {
    cardToggle = event.target;
    toggleCard(cardToggle);
    checkCard(cardToggle);
};
  
cards.addEventListener("click", myFunc);
var currentCards = [];
var movesCount = 0;
var score = 0;

const toggleCard = (card) => {
    card.classList.toggle("open");
    card.classList.toggle("show");
    currentCards.push(card);
};

const checkCard = (card) => {
    if (currentCards.length === 2) {
        movesCount +=1;
        dropStars(movesCount);
        timeing();
        if (
            currentCards[0].children[0].className ==
            currentCards[1].children[0].className
           
        ) {
            currentCards.forEach((card) => {
                card.classList.add("match");
                
            });
            score += 1;
            if (score == 8) {
                setTimeout(() => {
                    alert('Well Done!');
                }, 1000);
            }
            currentCards = [];
            
        } else {
            setTimeout(() => {
                currentCards.forEach((card) => {
                    card.classList.remove("show");
                    card.classList.remove("open");
                });
                currentCards = [];
            }, 1000);
        }
       
    }
    document.getElementById("moves").innerHTML = movesCount;
    document.getElementById("score").innerHTML = score;
};

document.getElementById("moves").innerHTML = movesCount;
document.getElementById("score").innerHTML = score;

// timeing
var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var totalSeconds = 0;
timeing = () => {
    function setTime() {
        ++totalSeconds;
        secondsLabel.innerHTML = pad(totalSeconds % 60);
        minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
    }
    function pad(val) {
        var valString = val + "";
        if (valString.length < 2) {
            return "0" + valString;
        } else {
            return valString;
        }
    }
    setInterval(setTime, 1000);
};
//

// stars
dropStars = (movesCount) => {
    var s1 = document.getElementById("s1");
    var s2 = document.getElementById("s2");
    var s3 = document.getElementById("s3");
    if (movesCount > 15 & movesCount < 32 ) {
        s1.style.display = "none";
    }
    else if (movesCount > 32 & movesCount < 48) {
        s2.style.display = "none";
    }
    else if (movesCount > 48) {
        s3.style.display = "none";
        if(s3.style.display === "none"){
            alert('Sorry , you loss the game!');

        }
    }
};
//

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */