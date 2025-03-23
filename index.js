//+needs modify: 1 has 11 score. >10 has 10 score. make changes
//+a new place to showcase all the money left after loss and wins


let x = [] //array of cards. it is universal. so any reassignment or modification is saved here.
let sum = 0  //to show sum of cards
let betAmount = 0
let hasBlackJack = false //initially, false, if 21, it changes
let isAlive = false //once game starts, it becomes alive
let message = "" //a message based on if cards are < , > or === 21
let player = {
    title : 'Your chips',
   // chips: 455  
}

let playerEl = document.getElementById('player-el')
playerEl.textContent = `${player.title}: `  //initial bet screen
let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")
let betEl = document.getElementById('bet-el')

//change bet screen after bet is placed:
function placeBet(){
    playerEl.textContent = `${player.title}: `
    betAmount = +(betEl.value)
    playerEl.textContent += `${betAmount}$` //parseInt() or Number()
}
//makes a random number between 1 to 13(incl):
function getRandomInt(){   //to get a random cards number
   return Math.floor(Math.random()*(13-1)+1);
}
//runs when play is clicked:
function startGame() {
    placeBet()      
    isAlive = true
    x = [getRandomInt(),getRandomInt()]  //x array is reassigned. from [] to having 2 numbers
    renderGame()
}
//runs when new game is clicked:
function newCard(){   
    if (isAlive===true && hasBlackJack===false){
        let card = getRandomInt() //get a random card
        x.push(card); //x array modified. from 2 numbers to 3 numbers 
        renderGame()
    }
    else if (isAlive===false){
        messageEl.textContent = 'Sorry. Game over. Start over!'
    }
    else if(hasBlackJack===true) {
        messageEl.textContent = 'You already won! So start over!'
    }
}

//core function
function renderGame() {

   let sum = x.reduce((a,b) => a+b,0);  //sum x array's items
// cards initial text:
    cardsEl.textContent = `Cards: ` 
//cards' text updates with x:
    for (let i = 0; i < x.length; i++){
        cardsEl.textContent += `${x[i]} `
    }
//sum text  
   sumEl.textContent = `Sum: ${sum}` 
//message text  
   if (sum <= 20) {
       message = "Do you want to draw a new card?"
   } else if (sum === 21) {
       message = "You've got Blackjack!"
       hasBlackJack = true
       player.chips += player.chips 
       playerEl.textContent = `${player.title}: ${betAmount*2}$ `
   } else {
       message = "You're out of the game!"
       isAlive = false
       player.chips -= player.chips 
       playerEl.textContent = `${player.title}: ${betAmount-betAmount}$ `
   }
   messageEl.textContent = message
}