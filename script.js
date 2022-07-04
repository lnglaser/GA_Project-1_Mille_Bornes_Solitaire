//Establishing card decks

//These are the three card types I will use for the base version of the game.
const cardTypes = [
    "Miles",
    "Hazards",
    "Remedies"
];

//This is the first thing I would like to improve - there must be a better way to store the card values other than counting out each type.

//These are the values of cards used to score - they will be added to a value shown on the board. These will be put in a deck the player draws from.
// 10 copies each of the 25, 50 and 75 mile cards
// 12 copies of the 100 mile cards
// 4 copies of the 200 mile cards
const mileValues = [
    25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 
    50, 50, 50, 50, 50, 50, 50, 50, 50, 25,
    75, 75, 75, 75, 75, 75, 75, 75, 75, 75,
    100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100,
    200, 200, 200, 200
];

//These will be put in a deck the computer draws from.
const hazardTypes = [
    "Flat tire", "Flat tire", "Flat tire",
    "Out of gas", "Out of gas", "Out of gas",
    "Accident", "Accident", "Accident",
    "Red light", "Red light", "Red light", "Red light", "Red light"
];

//These will be put in the deck the player draws from.
const remedyTypes = [
    "Spare tire", "Spare tire", "Spare tire", "Spare tire", "Spare tire", "Spare tire",
    "Gas", "Gas", "Gas", "Gas", "Gas", "Gas",
    "Repairs", "Repairs", "Repairs", "Repairs", "Repairs", "Repairs",
    "Green light", "Green light", "Green light", "Green light", "Green light", "Green light", "Green light",
    "Green light", "Green light", "Green light", "Green light", "Green light", "Green light", "Green light"
];

let computerDeck = [];
let playerDeck = [];
let playerHand = [];

//This function will build both the player deck containing miles and remedies, and the computer deck containing the hazards.
function buildDeck ()  {
    for (i = 0; i < cardTypes.length; i++){
        if(i == 0) {
            for (j = 0; j < mileValues.length; j++){
                let card = {value: mileValues[j], type: cardTypes[i]};
                playerDeck.push(card);
            }
        } else if (i == 2){
            for (j = 0; j < remedyTypes.length; j++){
                let card = {value: remedyTypes[j], type: cardTypes[i]};
                playerDeck.push(card);
            }
        } else if (i == 1){
            for (j = 0; j < hazardTypes.length; j++){
                let card = {value: hazardTypes[j], type: cardTypes[i]};
                computerDeck.push(card);
            }
        }
    }
    //console.log("Player's deck: "+JSON.stringify(playerDeck));
    //console.log("Computer's deck: "+JSON.stringify(computerDeck));
}

buildDeck();

//Studied documentation on Math.random (https://www.w3schools.com/js/js_random.asp) and Math.floor (https://www.w3schools.com/jsref/jsref_floor.asp)
function shuffleDeck(){
    //shuffling player's deck
    for(i = playerDeck.length - 1; i> 0; i--) {
        let j = Math.floor(Math.random() * i);
        let shuffler = playerDeck[i];
        playerDeck[i] = playerDeck[j];
        playerDeck[j] = shuffler;
    }

    //shuffling computer's deck
    for(i = computerDeck.length - 1; i> 0; i--) {
        let j = Math.floor(Math.random() * i);
        let shuffler = computerDeck[i];
        computerDeck[i] = computerDeck[j];
        computerDeck[j] = shuffler;
    }
    console.log("Player's deck: "+JSON.stringify(playerDeck));
    console.log("Computer's deck: "+JSON.stringify(computerDeck));
}

shuffleDeck();

function dealCards(){
    for (i=0; i < 6; i++){
        playerHand.push(playerDeck[i]);
    }
    console.log("Player's hand: "+JSON.stringify(playerHand))
}

dealCards ();