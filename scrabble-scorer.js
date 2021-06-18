// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   let user = input.question(`Let's play some scrabble!\nEnter a word: `);
   return user
};

let simpleScore = function(word){
  return word.length
};


let vowelBonusScore = function(word){
  word = word.toUpperCase()
  let vowels = ['A', 'E', 'I', 'O', 'U'];
  let score = 0; 
  for (let i = 0; i < word.length; i++){

    if (vowels.includes(word[i])){
      score+=3
    }else {
      score+=1
    };
  };

  return score; 
};
console.log(vowelBonusScore("name"));

let scrabbleScore = function (word){
  word = word.toLowerCase();
  let score = 0;
  for (let i = 0; i < word.length; i++){
    score+= newPointStructure[word[i]]
  }
  return score;
};

const scoringAlgorithms = [{
 name: "Simple Score: " ,
 description: " Each letter is worth 1 point." ,
 scoringFunction: simpleScore ,
},{
 name: "Bonus Vowels: " ,
 description: " Vowels are 3 pts, consonants are 1 pt." ,
 scoringFunction: vowelBonusScore ,
},{
 name:"Scrabble: " ,
 description: " The traditional scoring algorithm." ,
 scoringFunction: scrabbleScore
}];

function scorerPrompt() {
   console.log(`Which scoring algorithm would you like to use?\n`)
   for (let i = 0; i < scoringAlgorithms.length; i++){
     let whichScore = scoringAlgorithms[i];
     console.log(i + "-" + whichScore["name"] + whichScore.description);
   }
   let choice = Number (input.question(`Enter 0, 1, or 2: `)); 
   return scoringAlgorithms[choice]
}
 

function transform(structure) {
let newObject = {}
for (const item in structure){
  let letters = structure[item];
  for (let i = 0; i < letters.length; i++){
  newObject[letters[i].toLowerCase()] = Number(item)
  }
};
return newObject
};

let newPointStructure = transform(oldPointStructure);


function runProgram() {
   let word1 = initialPrompt();
   let scoreSomething = scorerPrompt().scoringFunction 
   let finalScore = scoreSomething(word1);
   console.log(`Score for ${word1}: ${finalScore}`);
};

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

