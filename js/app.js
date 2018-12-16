

var cards = shuffle(createUnshuffledCards());
var openCards = new Set();
var matchedCards = new Set();
var cardTurnCounter= 0;
var numStars = 0;


// TODOs:
// 1) timing of game, e.g. https://www.w3schools.com/js/js_timing.asp
//.    or console.time https://blog.mariusschulz.com/2013/11/22/measuring-execution-times-in-javascript-with-consoletime



// 2) congratulations popup
//.   - need to detect winning situation, count match pairs
// 3) restart button - new shuffled state, all timers/vars zeroed out
// 4) star rating, hardcode based on moves, finalize before N then 3 stars
//.    before 2N then 2 stars (
// 5) update with number of moves (i.e. clicks that lead to a turn of a card)

function createUnshuffledCards() {
	var cardTypes = ["fa-diamond", "fa-paper-plane-o", "fa-anchor",
	"fa-bolt", "fa-cube", "fa-bicycle", "fa-bomb", "fa-leaf"];

	// create cards, twice the size of cardTypes since 2 of each card type
	var cards = []
	return cards.concat(cardTypes,cardTypes);
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

function createCardHTML(cardType) {
	var card = document.createElement('li');
	card.classList.toggle('card'); 
	// 'match' is used to look behind card for debug
	// card.classList.toggle('match');
	var cardInside = document.createElement('i');
	cardInside.classList.toggle('fa');
	cardInside.classList.toggle(cardType);
	card.appendChild(cardInside);
	return card;
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

 function displayCards() {
 	var deck = document.querySelector('.deck');
 	// TODO: remove all cards for each time

 	// remove any old ones
	while (deck.firstChild) {
    	deck.removeChild(deck.firstChild);
	}

	// add new ones
	for(var i=0; i<cards.length; ++i) {
 		deck.appendChild(createCardHTML(cards[i]));
 	}
 }




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

 
 function toggleCardOpenShow(card) {
 	console.log('toggleCard:' + card);
 	card.classList.toggle('open');
 	card.classList.toggle('show');
 }

 function toggleCardMatch(card) {
 	card.classList.toggle('match');
 }

 function checkForEqualityOfCards() {
 	var openCardsArray = Array.from(openCards);
 	var card1 = new Set(openCardsArray[0].firstElementChild.classList);
 	var card2 = new Set(openCardsArray[1].firstElementChild.classList);

 	if(card1.size != card2.size) {
 		console.log('card1 and card2 NOT same size!')
 		return false;
 	}

 	for (var elem of card1) {
 		if(!card2.has(elem)) {
 			console.log('card2 doesnt have elem..' + elem);
 			return false;
 		}
 	}
 	return true;
 }

 function addToOpenCards(clickedCard) {
 	console.log('opened..');
 	var clickedCardStatus = new Set(clickedCard.classList);
 	console.log(clickedCardStatus);
 	if(clickedCardStatus.has('open') && clickedCardStatus.has('show')) {
 		openCards.add(clickedCard);
 		console.log(openCards);
 	}
 }

 function checkForEquality() {
 	if(openCards.size == 2) {
 		var equalCards = checkForEqualityOfCards(openCards);
 		var openCardsArray = Array.from(openCards);

 		for(var i=0; i<openCardsArray.length; ++i) {
 			console.log('card' + openCardsArray[i]);
 			if(equalCards) {
 				console.log('equal - toggle!');
 				matchedCards.add(openCardsArray[i]);
 				console.log("MATCHEDCARDS", matchedCards.size);
 				toggleCardMatch(openCardsArray[i]);
 			}
 			console.log('>>>>>>> MATCH match toggle..');
 			toggleCardOpenShow(openCardsArray[i]);
 		}
 		openCards.clear();
 		console.log('opencards.size should be ZERO after clear' + openCards.size)
 		openCardsArray = [];

 		console.log("SIZE>>>>" + matchedCards.size);
 		console.log("")

 		if(matchedCards.size == cards.length) {
			// all cards have been matched, we have a winning situation
			congratulationsPopup();
			updateStars();
		}

	} else if(openCards.size == 1) {
		console.log(openCards.size + 'equal to 1');
	} else if(openCards.size > 2) {
		console.log(openCards.size + 'greater than 2!!!!!!!!!!');
	} else {
		console.log(openCards.size + 'less than equal to 0!!!!!!!!');
	}
}

function updateStars() {
	console.log('updatestars');
	// based on number of moves, calculate stars
	if(cardTurnCounter < 1.5*cards.length) {
		numStars = 3;
	} else if(cardTurnCounter < 2.0*cards.length) {
		numStars = 2;
	} else if(cardTurnCounter < 8.0*cards.length) {
		numStars = 1;
	} else {
		numStars = 0;
	}

	// UPDATE DOM for stars
	var stars = document.querySelector('.stars');
	for(var i=0; i<numStars; ++i) {
		var star = document.createElement('li');
		var innerStar = document.createElement('i')
		innerStar.classList.toggle('fa'); 
		innerStar.classList.toggle('fa-star');
		star.appendChild(innerStar);
		stars.appendChild(star);
	}
	console.log('stars..');
}

function congratulationsPopup() {
	window.alert('congratulations finalizing the game!');
	// perhaps reset afterwards?
}

function setupEventListenerForCards() {
	var deck = document.querySelector('.deck');

	function respondToTheClick(evt) {
 		// can click on <li>, and then reach the <i> inside with firstElementChild
 		// only able to click on card with certain status
 		// and a set number of cards
 		if(openCards.size >= 2) {
 			// deal with during setTimeout calls
 			return;
 		}

 		var clickedCard = evt.target;
 		if(clickedCard.nodeName.toLowerCase() == 'li') {
 			cardTurnCounter++;
 			updateNumberOfMoves();

 			console.log(clickedCard.nodeName);
 			console.log('A <i> lower ..was clicked: ' + clickedCard.firstElementChild.nodeName);
 			console.log(clickedCard.firstElementChild.classList);
 			toggleCardOpenShow(clickedCard); // not quite, since it is toggling, it can also hide
 			addToOpenCards(clickedCard);
 			console.log('*****' + openCards.size);
 			console.log('********' + openCards);
 			var pauseTimeInMilliseconds = 0;
 			if(openCards.size == 2) {
 				pauseTimeInMilliseconds = 1000;
 			}
 			console.log('pauseTimeInMilliseconds = ' + pauseTimeInMilliseconds)
 			setTimeout(checkForEquality, pauseTimeInMilliseconds);

 		}
 		//}
 	}

 	deck.addEventListener('click', respondToTheClick);
 }

function restartButtonAction() {
	// reset all variables and timers
	console.log('restartButtonAction');
	cards =  shuffle(createUnshuffledCards());
	openCards = new Set();
	matchedCards = new Set();
	cardTurnCounter = 0;
	numStars = 0;
	displayCards();
	updateNumberOfMoves();
}


function setupRestartButton() {
	var restartButton = document.querySelector(".restart");
	restartButton.addEventListener('click', restartButtonAction);
}

function updateNumberOfMoves() {
	var moves = document.querySelector(".moves");
	moves.innerText = cardTurnCounter;
}

/*
* MAIN FUNCTION that sets up everything
*/



function main() {
	displayCards();
	//setupRestartButton();
	var restartButton = document.querySelector(".restart");
	restartButton.addEventListener('click', restartButtonAction);
	setupEventListenerForCards();

}

main();
