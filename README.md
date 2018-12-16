# Memory Game Project

## Table of Contents

* [Instructions](#instructions)
* [Code added for this project](#code)

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


