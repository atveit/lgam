
/***********************************
* Global variables with game state
************************************/

// shuffled set of cards (one pair of each type)
var cards = shuffle(createUnshuffledCards());

// cards that are currently open (turned up)
var openCards = new Set();

// cards that have been matched pairwise
var matchedCards = new Set();

// number of card turns (moves)
var cardTurnCounter= 0;

// number of stars (calculated as a function of moves when finished)
var numStars = 0;

// absolute start datetime (used to calculate elative game time in seconds)
var startDateTime = new Date();

/*
 * @description Creates array with pairs of cards per type
 * @return {Array} of pairs of cards (not shuffled)
 */
 function createUnshuffledCards() {
 	var cardTypes = ["fa-diamond", "fa-paper-plane-o", "fa-anchor",
 	"fa-bolt", "fa-cube", "fa-bicycle", "fa-bomb", "fa-leaf"];

	// create cards, twice the size of cardTypes since 2 of each card type
	var cards = []
	return cards.concat(cardTypes,cardTypes);
}

/*
 * @description Shuffle function from http://stackoverflow.com/a/2450976
 * @param {Array} of (unshuffled) cards
 * @return {Array} of shuffled cards
 */
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

/*
 * @description Creates HTML element to represent a given card type
 * @param {String} with the card type (class)
 * @return {Object} with HTML to be used in DOM to represent a card
 */
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
 * @description Creates all cards in the DOM
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
 * @description Turns a card so it is visible (open/show)
 * @param {Object} a card element
 */
 function toggleCardOpenShow(card) {
 	card.classList.toggle('open');
 	card.classList.toggle('show');
 }

/*
 * @description Highlights a matched card (when having pairs)
 * @param {Object} a card element
 */
 function toggleCardMatch(card) {
 	card.classList.toggle('match');
 }

 /*
 * @description Checks that cards are equal
 * @returns {boolean} true if they are equal, otherwise false
 */
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

/*
 * @description Adds current (opened) card to set of opened cards
 * @param {Object} card element clicked on
 */
 function addToOpenCards(clickedCard) {
 	console.log('opened..');
 	var clickedCardStatus = new Set(clickedCard.classList);
 	console.log(clickedCardStatus);
 	if(clickedCardStatus.has('open') && clickedCardStatus.has('show')) {
 		openCards.add(clickedCard);
 		console.log(openCards);
 	}
 }

/*
 * @description Updates matches (if any) of pairs, and checks/stops if winning
 */
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

/*
 * @description Clears stars that shows performance (utilify function)
 */
function clearStars() {
	console.log("clearStars");
	var myNode = document.querySelector(".stars");
	while (myNode.firstChild) {
    	myNode.removeChild(myNode.firstChild);
	}
}

/*
 * @description Updates number of stars based on performance
 */
 function updateStars() {
 	console.log('==> updatestars');
	// based on number of moves, calculate stars
	if(cardTurnCounter < 1.2*cards.length) {
		numStars = 3;
	} else if(cardTurnCounter < 2.0*cards.length) {
		numStars = 2;
	} else if(cardTurnCounter < 3.0*cards.length) {
		numStars = 1;
	} else {
		numStars = 0;
	}

	// UPDATE DOM for stars
	clearStars();
	var stars = document.querySelector('.stars');
	for(var i=0; i<numStars; ++i) {
		var star = document.createElement('li');
		var innerStar = document.createElement('i')
		innerStar.classList.toggle('fa'); 
		innerStar.classList.toggle('fa-star');
		star.appendChild(innerStar);
		stars.appendChild(star);
	}
	console.log('<== updatestars - numstars = '+ numStars);
}

/*
 * @description Creates popup when celebrating victory
 */
 function congratulationsPopup() {
 	window.alert('congratulations finalizing the game!');
	// perhaps reset afterwards?
}

/*
 * @description Adds event listener for cards
 */
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


/*
 * @description Sets up restart button (resetting all variables when restarting)
 */
 function setupRestartButton() {
 	var restartButton = document.querySelector(".restart");
 	function restartButtonAction() {
		// reset all variables and timers
		console.log('restartButtonAction');
		cards =  shuffle(createUnshuffledCards());
		openCards = new Set();
		matchedCards = new Set();
		cardTurnCounter = 0;
		numStars = 3;
		startDateTime = new Date();
		setTimeout(updateTimer, 1000);
		displayCards();
		updateNumberOfMoves();
	}
	restartButton.addEventListener('click', restartButtonAction);
}

/*
 * @description Updates number of moves (turns)
 */
function updateNumberOfMoves() {
	console.log('update number of moves');
	var moves = document.querySelector(".moves");
	moves.innerText = cardTurnCounter;
	console.log("before updatestars..");
	updateStars();
}

/* 
 * @description Updates timer by recursively call itself every 1000ms 
 */
function updateTimer() {
	var currentDateTime = new Date();

	var deltaInMilliseconds = currentDateTime-startDateTime;
	var deltaInSeconds = Math.round(deltaInMilliseconds/1000);

	var timer = document.querySelector(".timer");
	timer.innerText = deltaInSeconds;

	// recursive call after 1000 milliseconds, unless game is finished
	if(matchedCards.size < cards.length) {
		setTimeout(updateTimer, 1000);
	}
}

/*
 * @description MAIN FUNCTION that sets up everything
 */
function main() {
	clearStars();
	updateStars();
	displayCards();
	setupRestartButton();
	setupEventListenerForCards();
	setTimeout(updateTimer, 1000);

}

main();
