console.log("JS loaded");

var game = {
    letters : ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
                "a", "s", "d", "f", "g", "h", "j", "k", "l",
                "z", "x", "c", "v", "b", "n", "m"],

    messages : {
        "correct" : ["You got a letter right!", "Good job, you got a letter right!", "Correct! Guess again.", "Right again!"],
        "incorrect" : ["That didn't work. Try another letter.", "Oops! You guessed a wrong letter!", "Nope. Guess again.", "Wrong!", "One more piece of the hangman!"],
        "win" : ["Congratulations! You win!", "You guessed the word!", "You saved the hangman!", "Winner winner, chicken dinner!", "A WINNER IS YOU", "Victory Royale!"],
        "lose" : ["Too bad, you lose.", "RIP, the stick figure is hung.", "Too bad, maybe next time.", "You just lost the game!", "Take this L."],
        "error" : ["Invalid letter. To guess a letter, press a letter key with Caps Lock off."],
        "welcome" : ["Welcome To Hangman. Press Any Letter Key to Begin.", "Welcome back to Hangman."]
    },

    gameActive : false,
    lettersGuessed : [],
    wrongGuesses : [],
    wordToGuess : [],
    wordGuessingArea : [],
    category: "All",
    wordLists : {
        "YouTubers" : ["pewdiepie", "jacksfilms", "markiplier", "grandayy", "emplemon", "idubbbztv"],
        "Chemical Elements": ["gold", "iron", "oxygen", "hydrogen", "nitrogen", "uranium", "neon"],
        "NFL Teams" : ["chiefs", "saints", "patriots", "chargers", "steelers", "rams", "cowboys"],
        "Web Development Tools" : ["html", "css", "bootstrap", "javascript", "jquery", "sql"],
        "All" : []
    },
    wordList : [],
    categories : ["All", "YouTubers", "Chemical Elements", "NFL Teams", "Web Development Tools"],

    mainMenu : function() {
        this.gameActive = false;
        this.wordLists["All"] = [];
        this.wordLists["All"] = this.wordLists["All"].concat(this.wordLists["YouTubers"], this.wordLists["Chemical Elements"], this.wordLists["NFL Teams"], this.wordLists["Web Development Tools"]);
        document.getElementById("main-menu").style.display = "block";
        document.getElementById("game").style.display = "none";
    },

    displayMessage : function(messageType) {
        this.messages[messageType].push(this.messages[messageType].splice(Math.floor(Math.random() * (this.messages[messageType].length - 1)) , 1 ));
        document.getElementById("message").innerHTML = this.messages[messageType][this.messages[messageType].length - 1];
    },

    runGame : function() {
        this.lettersGuessed = [];
        this.wordToGuess = [];
        this.wrongGuesses = [];
        this.wordList = this.wordLists[this.category];
        this.wordGuessingArea = ["_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_"];
        document.getElementById("game").style.display = "block";
        document.getElementById("main-menu").style.display = "none";
        this.wordToGuess = this.wordList[Math.floor(Math.random() * this.wordList.length)].split("");
        this.wordGuessingArea.length = this.wordToGuess.length;
        document.getElementById("word").innerHTML = this.wordGuessingArea.join(" ");
        document.getElementById("wrong").innerHTML = "";
        console.log("Word: " + this.wordToGuess.join(""));
        this.gameActive = true;
        document.getElementById("hangman").src = "assets/images/0.jpg";
        this.displayMessage("welcome");
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
                    this.wordGuessingArea = this.wordToGuess;
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

game.mainMenu();

onkeyup = function() {
    console.log("Key Pressed: " + this.event.key);
    if (game.gameActive) {
        game.checkLetter(event.key);
    }
}

document.getElementById("play-button").onclick = function () {
    game.runGame();
}

document.getElementById("restart-button").onclick = function() {
    game.runGame();
}

document.getElementById("menu-button").onclick = function() {
    game.mainMenu();
}

document.getElementById("category-button").onclick = function() {
    game.category = game.categories[(game.categories.indexOf(game.category) + 1) % game.categories.length];
    this.innerHTML = "Select Category: " + game.category;
}