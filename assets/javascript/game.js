console.log("JS loaded");

var game = {
    letters : ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
                "a", "s", "d", "f", "g", "h", "j", "k", "l",
                "z", "x", "c", "v", "b", "n", "m"],

    messages : {
        "correct" : ["You got a letter right!", "Good job, you got a letter right!", "Correct! Guess again.", "Right again!"],
        "incorrect" : ["That didn't work. Try another letter.", "Oops! You guessed a wrong letter!", "Nope. Guess again.", "Wrong!", "One more piece of the hangman!"],
        "win" : ["Congratulations! You win!", "You guessed the word!", "You saved the hangman!", "Winner winner, chicken dinner!", "A WINNER IS YOU", "Victory Royale!"],
        "lose" : ["Too bad, you lose.", "RIP, the stick figure is hung.", "Too bad, maybe next time.", "Take this L.", "You just lost the game!"],
        "error" : ["Invalid letter. To guess a letter, press a letter key with Caps Lock off."]
    },

    gameActive : false,
    lettersGuessed : [],
    wrongGuesses : [],
    wordToGuess : [],
    wordGuessingArea : [],
    wordList : ["pewdiepie", "jacksfilms", "markiplier", "grandayy", "emplemon", "idubbbztv"],

    displayMessage : function(messageType) {
        this.messages[messageType].push(this.messages[messageType].splice(Math.floor(Math.random() * (this.messages[messageType].length - 1)) , 1 ));
        document.getElementById("message").innerHTML = this.messages[messageType][this.messages[messageType].length - 1];
    },

    runGame : function() {
        this.lettersGuessed = [];
        this.wordToGuess = [];
        this.wrongGuesses = [];
        this.wordGuessingArea = ["_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_"];
        document.getElementById("game").style.display = "block";
        this.wordToGuess = this.wordList[Math.floor(Math.random() * this.wordList.length)].split("");
        this.wordGuessingArea.length = this.wordToGuess.length;
        document.getElementById("word").innerHTML = this.wordGuessingArea.join(" ");
        console.log("Word: " + this.wordToGuess.join(""))
        this.gameActive = true;
        document.getElementById("hangman").src = "assets/images/0.jpg";
    },

    checkLetter : function(keyPressed) {
        console.log("checkLetter called");
        if (this.lettersGuessed.indexOf(keyPressed) == -1) {
            this.lettersGuessed.push(keyPressed);
            var wasWrong = true;
            for (var i = 0; i < this.wordToGuess.length; i++){
                if (this.wordToGuess[i] == keyPressed) {
                    this.wordGuessingArea[i] = keyPressed;
                    wasWrong = false;
                }
            }
            if (this.letters.indexOf(keyPressed) == -1) {
                wasWrong = false;
                this.displayMessage("error");
            } else if (wasWrong) {
                this.wrongGuesses.push(keyPressed);
                if (this.wrongGuesses.length != 6) {
                    this.displayMessage("incorrect");
                } else {
                    this.displayMessage("lose");
                    this.gameActive = false;
                }
            } else {
                console.log(this.wordToGuess);
                console.log(this.wordGuessingArea);
                if (this.wordGuessingArea.join() == this.wordToGuess.join()) {
                    this.displayMessage("win");
                    this.gameActive = false;
                } else {
                    this.displayMessage("correct");
                }
            }
        }
        document.getElementById("wrong").innerHTML = this.wrongGuesses.join(", ");
        document.getElementById("word").innerHTML = this.wordGuessingArea.join(" ");
        document.getElementById("hangman").src = "assets/images/" + this.wrongGuesses.length + ".jpg";
    }
}

game.runGame();

onkeyup = function() {
    console.log("Key Pressed: " + this.event.key);
    if (game.gameActive) {
        game.checkLetter(event.key);
    }
}