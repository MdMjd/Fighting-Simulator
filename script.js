// ** Grabs elements from the DOM and stores them into variables **
let playButton = document.getElementById('play')
let resultDiv = document.getElementById('result')
let p1NameDiv = document.getElementById('p1Name')
let p2NameDiv = document.getElementById('p2Name')
let p1HealthDiv = document.getElementById('p1Health')
let p2HealthDiv = document.getElementById('p2Health')

const skills = document.querySelectorAll('.box')
console.log(skills);

// ** Check if either players health is  0 and if it is, then update isOver to true **
const updateGame = (p1, p2, gameState) => {
  // Update the DOM with the names and the latest health of players
  p1NameDiv.innerText = p1.name
  p2NameDiv.innerText = p2.name
  p1HealthDiv.innerText = p1.health
  p2HealthDiv.innerText = p2.health

  // Condition IF either player health is <= 0 then set isOver to true and declareWinner
  if (p1.health <= 0 || p2.health <= 0) {
    game.isOver = true;
    gameState = game.isOver
    resultDiv.innerText = game.declareWinner(game.isOver, p1, p2)
    return gameState
  }
}

class Player {
  constructor(name, health, attackDamage) {
    this.name = name;
    this.health = health;
    this.attackDmg = attackDamage;
  }
  // ** Attack an enemy with a random number from 0 to YOUR attackDmg bonus **
  strike(player, enemy, attackDmg) {

    // Get random number between 15 - 45 and that is damageAmount
    let damageAmount = Math.floor((Math.random() * attackDmg) + attackDmg / 2)

    // Subtract the enemy health with the damageAmount
    enemy.health -= damageAmount

    //  Update the game and DOM with updateGame()
    updateGame(p1, p2, gameState)

    //  Return a message of 'player name attacks enemy name for damageAmount'
    console.log(`${player.name} attacks ${enemy.name} for ${damageAmount}`)
  }
  // ** Heal the player for random number from  1 to 5 **
  heal(player) {

    // Get random number between 1 - 5 and store that in hpAmount
    let hpAmount = Math.ceil(Math.random() * 15)
    // Add hpAmount to players health
    player.health += hpAmount
    //  Update the game and DOM with updateGame()
    updateGame(p1, p2, gameState)

    //  Return a message of 'player name heals for hpAmount HP'
    console.log(`${player.name} heals for ${hpAmount} HP!`)
  }

  warriorSkillA(player, enemy, attackDmg) {
    //
    let damageAmount = attackDmg * 2
    skillCounter -= 1
    this.strike(player, enemy, damageAmount)

    //  Update the game and DOM with updateGame()
    updateGame(p1, p2, gameState)

    //console.log(`${player.name} attacks ${enemy.name} for ${damageAmount}`)
  }
}

// ** Create the Game class with all it's attributes and methods to run a match **
// game = new Game()
// game.isOver 👉 false
class Game {
  constructor() {
    this.isOver = false;
  }

  // ** If the game is over and a player has 0 health declare the winner! **
  declareWinner(isOver, p1, p2) {
    let message
    // Create a message variable that will hold a message based on the condition
    if (isOver == true && p1.health <= 0) {
      message = `${p2.name} WINS!`;
    }
    // If isOver is true AND p1 health is <= 0 then update message variable  to 'p1 WINS!'
    else if (isOver == true && p2.health <= 0) {
      message = `${p1.name} WINS!`
    }
    return message

    // Else if isOver is true AND p2 health is <= 0 then update message variable  to 'p2 WINS!'
    // Play victory sound

    // Return message variable

  }

  // ** Reset the players health back to it's original state and isOver to FALSE **
  reset(p1, p2) {
    p1.health = 100
    p2.health = 100
    this.isOver = false
    resultDiv.innerText = ''
    updateGame(p1, p2)
  }

  // ** Simulates the whole match untill one player runs out of health **
  play(p1, p2) {
    // Reset to make sure player health is back to full before starting
    this.reset(p1, p2);
    // Make sure the players take turns untill isOver is TRUE
    while (!this.isOver) {
      //Make sure both players get strike() and heal() once each loop
      p1.strike(p1, p2, p1.attackDmg)
      p2.strike(p2, p1, p2.attackDmg)
      //Healing cause some issues.
    }
    // Once isOver is TRUE run the declareWinner() method
    return this.declareWinner(this.isOver, p1, p2);
  }

}

// ** Create 2 players using the player class **
const player1 = new Player('Player 1', 100, 30)
const player2 = new Player('Player 2', 100, 30)

// ** Save original Player Data into a variable in order to reset **
let p1 = player1;
let p2 = player2;

// ** Create the game object from the Game class **
let game = new Game();

// ** Intialize the game by calling updateGame() **
updateGame(p1, p2)

// ** Save intial isOver from the game object inside this variable **
let gameState = game.isOver


// ** Add a click listener to the simulate button that runs the play() method on click and pass in the players **
play.onclick = () => result.innerText = game.play(p1, p2);


// New Functionality
skillCounter = 1

// ** Player 1 Controls **
document.addEventListener('keydown', function(e) {
  // if you press Q AND the enemy health is greater than 0 AND isOver is still false then strike()
  if (e.key == "q" && p2.health > 0 && game.isOver == false) {
    p1.strike(p1, p2, p1.attackDmg)
    // After striking then play attack sound
    //document.getElementById('p1attack').play();
  }
});

document.addEventListener('keydown', function(e) {
  // if you press a AND the player health is greater than 0 AND isOver is still false then strike()
  if (e.key == "a" && p2.health > 0) {
    p1.heal(p1)
    // After healing then play heal sound
    //document.getElementById('p1heal').play();
  }
});

// ** Player 2 Controls **
document.addEventListener('keydown', function(e) {
  // if you press p AND enemy health is greater than 0 AND isOver is still false then stike()
  if (e.key == "p" && p1.health > 0 && game.isOver == false) {
    p2.strike(p2, p1, p2.attackDmg)
    // After striking then play attack sound
    //document.getElementById('p2attack').play();
  }
});

document.addEventListener('keydown', function(e) {
  // if you press l AND the player health is greater than 0 AND isOver is still false then heal()
  if (e.key == "l" && p2.health > 0) {
    // After healing then play heal sound
    player2.heal(p2)
    //document.getElementById('p2heal').play();
  }
});

document.addEventListener('keydown', function(e) {
  // Warrior Skill A
  if (e.key == "1" && p2.health > 0 && skillCounter >= 1) {
    p1.warriorSkillA(p1, p2, p1.attackDmg)
  }
});
