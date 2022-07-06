//Establishing card decks

//These are the three card types I will use for the base version of the game.
const cardTypes = [
    "Mileage",
    "Hazard",
    "Remedy"
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
//3 copies each of Flat tire, Out of gas, and Accident cards
//5 copies of Red light cards
const hazardTypes = [
    "Flat tire", "Flat tire", "Flat tire",
    "Out of gas", "Out of gas", "Out of gas",
    "Accident", "Accident", "Accident",
    "Red light", "Red light", "Red light", "Red light", "Red light"
];

//These will be put in the deck the player draws from.
//6 copies each of Spare tire, Gas and Repairs cards
//14 copies of Green light cards
const remedyTypes = [
    "Spare tire", "Spare tire", "Spare tire", "Spare tire", "Spare tire", "Spare tire",
    "Gas", "Gas", "Gas", "Gas", "Gas", "Gas",
    "Repairs", "Repairs", "Repairs", "Repairs", "Repairs", "Repairs",
    "Green light", "Green light", "Green light", "Green light", "Green light", "Green light", "Green light",
    "Green light", "Green light", "Green light", "Green light", "Green light", "Green light", "Green light"
];

let computerDeck = [];
let playerDeck = [];
let playerHand = [

];
let discardPile = [];
let cardDraw = null;
let turnsRemaining = 20;
//Variables that interact with DOM elements
let discardButton = document.querySelector(".discardButton")
let playButton = document.querySelector(".playButton")
let playerCardsOnScreen = document.querySelectorAll(".player-card");//playerCards needs to be an array of objects? These can't be objects because it's just used to reference DOM elements
//Had to set empty values for the object in the battlePile array to test the computerTurn function
// let playerCards = [
//     {value: "",
//     type: ""
// }
// ]
//If battle pile is changed from array to single object, you must make changes in the computerTurn function
let battlePile =
    {value: "",
    type: ""};

let playerScore = 0;
let selectedCard = {
    value: "",
    type: ""
}

let cardPosition = 0;
//This function will build both the player deck containing miles and remedies, and the computer deck containing the hazards.

document.querySelector(".turnCount").innerText = (`Number of turns left: ${turnsRemaining}`)
document.querySelector(".battle-pile").innerText = ("Battle pile: "+battlePile.value);

function buildDeck ()  {
    for (i = 0; i < cardTypes.length; i++){
        if(i == 0) {
            for (j = 0; j < mileValues.length; j++){
                let card = {value: mileValues[j], type: cardTypes[i], isInPlayerHand: false};
                playerDeck.push(card);
            }
        } else if (i == 2){
            for (j = 0; j < remedyTypes.length; j++){
                let card = {value: remedyTypes[j], type: cardTypes[i], isInPlayerHand: false};
                playerDeck.push(card);
            }
        } else if (i == 1){
            for (j = 0; j < hazardTypes.length; j++){
                let card = {value: hazardTypes[j], type: cardTypes[i], isInPlayerHand: false};
                computerDeck.push(card);
            }
        }
    }
    //console.log("Player's deck: "+JSON.stringify(playerDeck));
    //console.log("Computer's deck: "+JSON.stringify(computerDeck));
}

buildDeck();
//Card shuffling tutorial found here: https://www.programiz.com/javascript/examples/shuffle-card
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
    // console.log("Player's deck: "+JSON.stringify(playerDeck));
    // console.log("Computer's deck: "+JSON.stringify(computerDeck));
}

shuffleDeck();

//Assigns values of top 6 cards in the player deck to corresponding positiions in the player hand, and removes those objects from the top of the deck array.
function dealCards(){
    for (i = 0; i < 6; i++){
        playerHand.push(playerDeck.shift());
        
        playerHand[i].isInPlayerHand = true;
    }
    console.log("Player's hand: ");
    for(i = 0; i < 6; i++){
        console.log(playerHand[i])
    }
    
    document.getElementById('0').innerText = playerHand[0].value;
    document.getElementById('1').innerText = playerHand[1].value;
    document.getElementById('2').innerText = playerHand[2].value;
    document.getElementById('3').innerText = playerHand[3].value;
    document.getElementById('4').innerText = playerHand[4].value;
    document.getElementById('5').innerText = playerHand[5].value;

    // console.log("Player's deck: "+JSON.stringify(playerDeck));
    // console.log("Computer's deck: "+JSON.stringify(computerDeck));
}

dealCards ();

//Assigns a spot in the player's hand the value of the first card in the deck, and then removes that card from the "top" of the deck. This function will be called inside the "playerTurn" function. Drawn card is temporarily stored in the "cardDraw" variable. Since the card cannot return to the deck per the rules, the shift function is called on the player deck here, to remove it.
function drawCard(){
    cardDraw = playerDeck.shift();
    
    document.getElementById('6').innerText = (cardDraw.value);
    console.log("Drawn card: "+Object.values(cardDraw))
}

//removes selected card from play and adds it to the discard pile.


// for(i = 0; i < 7; i++){;
//     discardButton[i].addEventListener('click', discardCard);
// }
//Plays card to the table - either adds to score (mileage) or plays a remedy on top of a hazard.
// function playCard(e){
//     e.target.
//}

//This function will generate a random number, and based on that number, either draw a hazard card from the computer deck and play it on the battle pile, or pass its turn. (Might possibly be able to make this number adjustable to change the difficulty of the game.)
function computerTurn(){
    let i = Math.round(Math.random())
    if(i === 0){
        console.log("Clear road ahead")
        document.querySelector(".message-area").innerText = "Clear road ahead"
    } else if (i === 1 && battlePile.value === "Green light"){
        document.querySelector(".battle-pile").innerText = ("Battle pile: "+Object.values(computerDeck[0])[0])
        battlePile = (computerDeck[0]);
        console.log("Top of enemy deck: "+Object.values(computerDeck[0])[0])//remove later, used to test Object.values
        computerDeck.shift();
        document.querySelector(".message-area").innerText = (`Hazard played: ${battlePile.value}`)
        document.querySelector(".battle-pile").innerText = (`Battle pile: ${battlePile.value}`)
        console.log(`Hazard played: ${battlePile.value}`)
    }
}
computerTurn();
//Player should be able to draw a card, and either play a card to the table or discard.
function playerTurn(){ //remember to call at the end
    drawCard();
    //discardCard();

//Player:
// 1) Draws a card, and MUST either
// 2) a) play a card to the table
//      i) A miles card to the score counter, or
//      ii) a remedy card to the battle pile
//    b) discard a card
// should be able to play card by mousing over and clicking, possibly add buttons for discarding instead.
//Might be nice to add a hand sorting function that automatically keeps your cards in order.
}

//drawCard();

function chooseCard(selectedCard){
    for (i = 0; i < 7; i++){
        playerCardsOnScreen[i].addEventListener('click', e => {
            //console.log(playerHand[e.target.id])
            cardPosition = document.getElementById(e.target.id).id;
            console.log(cardPosition)
            selectedCard.value = e.target.innerText;
            let cardChoice = selectedCard.value;
            if(cardChoice === '25' || cardChoice === '50' || cardChoice === '75' || cardChoice === '100' || cardChoice === '200'){
                selectedCard.value = parseInt(selectedCard.value);
                selectedCard.type = cardTypes[0];
                selectedCard.isInPlayerHand = playerHand[e.target.id] ? true : false;
                console.log(selectedCard.type);
            } else if(cardChoice === 'Spare tire' || cardChoice === 'Gas' || cardChoice === 'Repairs' || cardChoice === 'Green light'){
                selectedCard.type = cardTypes[2];
                selectedCard.isInPlayerHand = playerHand[e.target.id] ? true : false;
                console.log(selectedCard.type)
            }
            console.log(`Selected card: ${Object.values(selectedCard)[0]} ${Object.values(selectedCard)[1]} ${Object.values(selectedCard)[2]}`)
            document.querySelector(".selected-card").innerText = (`Card selected: ${Object.values(selectedCard)[0]}`)
            //console.log("Card chosen: "+selectedCard.isInPlayerHand)
            // return selectedCard;
            // add calls to playCard and discardCard here??
            // playCard();
            // discardCard();
        })
    }
} 

chooseCard(selectedCard);
//return selectedCard;

    
//might have to build separate functions for playing and discarding?
//"If you chose to play a remedy card, check if it's the correct one and play it to the battle pile. (If it's not, throw an error message.)"
//"If you chose to play a mileage card, check if the battle pile has a Green light card on top. (If not, throw an error message."
function playCard (){

    //Add event listener to "play" button - done

    //If selected card is a mileage card:
        //check if battle pile shows a "Green light" card
            // - if yes, add value of mileage card to score, end turn
            // - if not, show error, do not play card, run function again(?)

    //If selected card is a remedy card:
        //If remedy card is a "Green light" card,
            //check if battle pile is a different remedy card OR a "red light" hazard card 
                //If yes - play card on top of battle pile, end turn
                //If not - show error, do not play card, run function again
        //If remedy card is NOT a "Green light" card,
            //check if battle pile shows associated hazard card
                // - if yes, put remedy card on top of battle pile, end turn
                // - if not, show error, do not play card, run function again

    //If the played card was the newly drawn card, move it to a pile and draw a new card.

    //If the played card was in the player's hand, remove it from the hand, add the drawn card to the hand.

    //When function completes (player turn ends), the computer will play its turn
    console.log("Play button clicked")
    //chooseCard();
   
    if (selectedCard.type === cardTypes[0]){
        console.log(selectedCard)

        if (battlePile.value === "Green light"){
            console.log("Miles played")
            playerScore = playerScore+(selectedCard.value)
            console.log("Score: "+playerScore)
            document.querySelector(".score-counter").innerText = (`Miles: ${playerScore}`)
            turnsRemaining--;
        } else {
            console.log("You must have a green light on the battle pile to play miles.")
        }
    } else if (selectedCard.type === cardTypes[2]){
        console.log(selectedCard)
        if (selectedCard.value === "Green light"){
            if ((battlePile.type === cardTypes[2] && battlePile.value != "Green light") || (battlePile.type === "" && battlePile.value === "")||(battlePile.value === "Red light")){
                console.log("Green light played")
                battlePile.type = selectedCard.type;
                battlePile.value = selectedCard.value;
                turnsRemaining--;
            } else if (battlePile.type = cardTypes[1]){
                console.log("You can't play a green light until you fix this hazard.")
            }
        } 
        else if (selectedCard.value != "Green light"){
            if (selectedCard.value === "Spare tire" && battlePile.value === "Flat tire"){
                console.log(`${battlePile.value} replaced with ${selectedCard.value}.`);
                battlePile.type = selectedCard.type;
                battlePile.value = selectedCard.value;
                selectedCard.type = "";
                selectedCard.value = "";
                turnsRemaining--;
            } 
            else if (selectedCard.value === "Gas" && battlePile.value === "Out of gas"){
                console.log(`Gas tank refilled.`);
                battlePile.type = selectedCard.type;
                battlePile.value = selectedCard.value;
                selectedCard.type = "";
                selectedCard.value = "";
                turnsRemaining--;
            } 
            else if (selectedCard.value === "Repairs" && battlePile.value === "Accident"){
                console.log(`${battlePile.value} fixed with ${selectedCard.value}.`);
                battlePile.type = selectedCard.type;
                battlePile.value = selectedCard.value;
                selectedCard.type = "";
                selectedCard.value = "";
                turnsRemaining--;
            } 
            else if (battlePile.type = cardTypes[1]){
                console.log("Incorrect remedy - choose another card.")
            }

        } 
    } document.querySelector(".battle-pile").innerText = (`Battle pile: ${battlePile.value}`);
    document.querySelector(".turnCount").innerText = (`Number of turns left: ${turnsRemaining}`)
    computerTurn();

    gameEnd()


    
}

//playCard()


const discardCard = () =>{
    //discardButton.addEventListener('click', chooseCard);

    //Take "selectedCard" variable
    //Push to "discardPile" array
    //Remove matching card from either player's hand or drawn card spot
    //reset "selectedCard" to empty object
    //draw new card

    //IF selected card is the Drawn card, push to discard and draw new card

    //IF selected card is in the player's hand, remove card, put Drawn card into player's hand, draw new card

    //when function completes, computer will play its turn
        //use .find to store a card in a local variable
        //chooseCard();

    if(selectedCard.isInPlayerHand){

        //Need to remove the first card in your hand that matches "selectedCard" values, and push the drawn card into the player hand array.
        console.log(`Is in player hand: ${JSON.stringify(selectedCard)}`)
        for(i = 0; i < 7; i++){
            if (playerHand[i].value === selectedCard.value){
                playerHand.splice(i, 1, cardDraw);
                break;
            }
        }
        // selectedCard.value = cardDraw.value;
        // selectedCard.type = cardDraw.type;
        // selectedCard.isInPlayerHand = cardDraw.isInPlayerHand;
        // cardDraw.value = "";
        // cardDraw.type = "";
        turnsRemaining--;
        document.querySelector(".turnCount").innerText = (`Number of turns left: ${turnsRemaining}`)
        drawCard();
        console.log("New card: "+(JSON.stringify(selectedCard)));
        
        document.querySelector
        
    } else {
        console.log(`Is NOT in player hand: ${JSON.stringify(selectedCard)}`);
        discardPile.push(selectedCard);
        console.log(discardPile[0])
        turnsRemaining--;
        document.querySelector(".turnCount").innerText = (`Number of turns left: ${turnsRemaining}`)
        drawCard();
    }


        // console.log("Discard button clicked")
        // console.log(`${selectedCard.value}, ${selectedCard.type}`)
        // discardPile.push(selectedCard);
        // console.log(discardPile[0]);
        // selectedCard.value = "";
        // selectedCard.type = "";
        // //chooseCard();
        // drawCard();
        // console.log(`New draw card: ${cardDraw.value}, ${cardDraw.type}`)
        // turnsRemaining--;
        // document.querySelector(".turnCount").innerText = (`Number of turns left: ${turnsRemaining}`)
    gameEnd();

    }
   // discardCard();

console.log(discardButton)
discardButton.addEventListener("click", discardCard);
playButton.addEventListener("click", playCard)

//Event listener section - add event listeners for various buttons (play, discard for each card)
// newFunction();

// function newFunction() {
//     playButtons.forEach(playerTurn); {
//         playButtons[i].addEventListener("click", playerTurn);
//     }
//}
playerTurn();
//addEventListener();
function gameEnd(){
    if (turnsRemaining === 0 && playerScore === 1000){
    document.querySelector(".message-area").innerText = (`Well done! You completed your trip.`);
    discardButton.removeEventListener("click", discardCard);
    discardButton.removeEventListener("click", playCard)
    } else if (turnsRemaining === 0 && playerScore < 1000){
        document.querySelector(".message-area").innerText = (`Nice driving, but you needed a little more time to get there.`);
        discardButton.removeEventListener("click", discardCard);
        discardButton.removeEventListener("click", playCard)
    } else if (turnsRemaining === 0 && playerScore > 1000) {
        document.querySelector(".message-area").innerText = (`Nice driving, but looks like you missed your destination.`)
        discardButton.removeEventListener("click", discardCard);
        discardButton.removeEventListener("click", playCard)
    }
    
}