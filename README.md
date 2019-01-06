# Memory Game Project

## Table of Contents

* How the game is played
* Appendix

# How the game is played

## Starting and restarting the game
The game starts when opening index.html file in the browser. It can be restarted when clicking the circular arrow (upper right). You can also choose to restart the game if winning it and click the Play again button (in the popup showing that you won).

## Playing the game 

Try to find matching pairs of symbols by clicking at them (one at a
time) to turn the cards. If the cards match they stick and then you
continue until you've found all pairs (hint: use your memory). There
are 16 cards in total, and since they are paired there are 8 different
types of cards. The time increments every second and the more moves
(pairs attempted to match) you make the less stars you keep.

# Appendix 
## Instructions

The starter project has some HTML and CSS styling to display a static version of the Memory Game project. You'll need to convert this project from a static project to an interactive one. This will require modifying the HTML and CSS files, but primarily the JavaScript file.

To get started, open `js/app.js` and start building out the app's functionality

For specific, detailed instructions, look at the project instructions in the [Udacity Classroom](https://classroom.udacity.com/me).

## Code added for this project 

See js/app.js for details. This gives a high level overview.

### Functions that deals with the initial card state
```
function createUnshuffledCards()  
function shuffle(array) 
```

### Functions that deals with displaying cards
```
function createCardHTML(cardType) 
function displayCards() 
function toggleCardOpenShow(card) 
function toggleCardMatch(card) 
```

### Functions that deals with the state of the game
```
function checkForEqualityOfCards() 
function addToOpenCards(clickedCard)
function checkForEquality() 
function setupEventListenerForCards() 
  function respondToTheClick(evt) 
```

### Functions that deals with additional features in the game (e.g. scoring)
```
function updateStars() 
function congratulationsPopup()
function setupRestartButton() 
  function restartButtonAction() 
function updateNumberOfMoves()
function updateTimer() 
```

### Main function that orchestrates everything
```
function main() 
```


