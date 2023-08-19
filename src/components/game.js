import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { storeCurrentPlayer, clearCurrentPlayer, getCurrentPlayer } from '../auth/utility';


const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
let currentWord = "";
let colorArray = [5];
let currentIndex = 0;
let totalGames = 0;
let successRate = 0;
let userData = [];
let oneguess, twoguess, threeguess, fourguess, fiveguess, sixguess, failedguess;



const Game = (props) => {

    let badLetterArray = [];
    let twoDArray =  new Array(2);
    let letterToCheck = '';
    
    let currentPlayer = getCurrentPlayer();
    let navigate = useNavigate();

    const path = "http://localhost:4000/api";

    useEffect(() => {

        //On the first time in I need to disable all rows except for the first row.
        //As a player finishes a row, only the next row gets enabled.
        for (let i = 6; i <= 30; i++) {
            document.getElementById(i).disabled = true;
        }
        document.getElementById(1).focus();
        let elements = document.getElementsByClassName("grid-item");
        for (let i = 0; i < elements.length; i++) {
            elements[i].tabindex = i + 1;
            elements[i].addEventListener('keypress', moveCursor(1));
        }

        for (let i = 0; i < alphabet.length; i++) {
            let indexStr = "b" + (i + 1);
            document.getElementById(indexStr).value = alphabet[i];
        }

       
        //Now let's grab a random 5 letter word
        //First let's check to see if the word entered is a real word
        const grabWord = async() => {
            let rand = Math.floor(Math.random() * 99);
            const response = await fetch("https://api.datamuse.com/words?sp=?????");
            const result = await response.json();
            currentWord = result[rand].word.toUpperCase();
            console.log("The current word is ", currentWord);
        }
        
        grabWord();
        document.getElementById("statsButton").disabled = true;
        //currentWord = "ANGLE";


    }, []);

    const moveCursor = (index) => {

        //console.log("Tab Index for this element is ", document.activeElement.tabindex);
        index++;
        //console.log("inside moveCursor");
        document.getElementById(index).style.autofocus;

    }

    const nextLetter = (id) => {

        let letterToCheck = document.getElementById(id).value;
        document.getElementById(id).value = letterToCheck.toUpperCase();
        
        if (!letterToCheck) {
            //remain on this input control until a letter is entered
            //console.log("No letter entered");
            document.getElementById(id).focus();
        } else {
            //currentIndex = id;
            //set focus on the next tab item
            if (id <= 30) {
                let i = Number(id);
                //console.log("Inside nextLetter and i is ", i);
                if (i < 30 && i % 5 != 0) {
                    document.getElementById(i+1).focus();
                    currentIndex = i + 2;
                }
            }
        }

    }

    const setColors = async (end, subtractor) => {

        //console.log("In setColors and end is ", end, " and subtractor is ", subtractor);
        let idx;
        let indexStr = " ";

        for (let i = end - 4; i <= end; i++) {

            let letter = document.getElementById(i).value.toUpperCase();

            let c = colorArray[i - subtractor];
            switch(c) {

                case "G":
                    //console.log("Position ", i, " is Green");
                    idx = alphabet.indexOf(letter.toLowerCase());
                    indexStr = "b" + (idx + 1)
                    document.getElementById(i).style.backgroundColor = "#00FF00";
                    document.getElementById(indexStr).style.backgroundColor = "#66FF00";
                    break;
                case "B":
                    //console.log("Postion ", i, " is Black");
                    badLetterArray.push(letter);
                    idx = alphabet.indexOf(letter.toLowerCase());
                    indexStr = "b" + (idx + 1);
                    //console.log("Index Str is :", indexStr);
                    document.getElementById(indexStr).style.backgroundColor = "gray";
                    break;
                case "Y":
                    //console.log("Postion ", i, " is Yellow");
                    badLetterArray.push(letter);
                    idx = alphabet.indexOf(letter.toLowerCase());
                    indexStr = "b" + (idx + 1);
                    //console.log("Index Str is :", indexStr);
                    document.getElementById(i).style.backgroundColor = "yellow";
                    document.getElementById(indexStr).style.backgroundColor = "yellow";
                    break;
                default:
                    //console.log("Position ", i, " is default");
                    break;
            }
        }

    }

    const isSolved = (begin, end) => {

        console.log("Inside isSolved and begin is ", begin, " and end is ", end);
        for (let i = begin; i <= end; i++) {
            if (document.getElementById(i).style.backgroundColor !== "rgb(0, 255, 0)") {
                console.log("We are not solved yet ", document.getElementById(i).style.backgroundColor);
                colorArray.length = 0;
                return false;
            }
        }
        return true;

    }

    const occursMultipleTimes = (letter) => {

        let count = 0;

        for (let i = 0; i < 5; i++) {
            if (currentWord[i] == letter ) {
                count++;
            }
        }
        return count;
    }

    const letterFoundPreviously = (index, char, guess) => {

        for (let i = 0; i < 5; i++) {
            if (i != index) {
                if (char == guess[i]) {
                    if (colorArray[i] == "Y" || colorArray[i] == "G") {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    const buildColorArray = (guessWord) => {

        //Let's figure out who is gray, green, or yellow
        let char;
        let retVal = 0;

        //console.log("Guess word is ", guessWord);
        //First we will check to see if any of the letters are correct
        //We already know since we are here that the guess wasn't 100% correct
        for (let i = 0; i < 5; i++) {
            char = currentWord.charAt(i);
            retVal = occursMultipleTimes(guessWord[i]);
            
            //console.log("char is ", char, " and char to check is ", guessWord[i]);
            if (char == guessWord[i]) {
                console.log("Setting Green for color array ", i);
                colorArray[i] = "G";
            } else if (currentWord.indexOf(guessWord[i]) == -1) {
                colorArray[i] = "B";
            } else if (retVal == 1 && letterFoundPreviously(i, guessWord[i], guessWord)) {
                console.log("Letter found previously");
                colorArray[i] = "B";
            } else if (retVal == 1 && !letterFoundPreviously(i, guessWord[i], guessWord)) {
                console.log("Letter NOT found previously");
                colorArray[i] = "Y";
            } else if (retVal > 1) {
                colorArray[i] = "Y";
            } else {
                console.log("WHAT OTHER OPTION EXISTS");
            }
        }
        
    }

    const determineWinningGuess = (end) => {

        console.log("END IS ", end);
        switch (Number(end)) {

            case 5:
                return "oneguess";
                
            case 10:
                return "twoguess";
                
            case 15:
                return "threesguess";
                
            case 20:
                return "fourguess";
                
            case 25:
                return "fiveguess";
                
            case 30:
                return "sixguess";
                
            default:
                return "failedguess";
        }

    }
    const checkGuess = async(end, subtractor) => {

        let letterToCheck = document.getElementById(end).value;
        document.getElementById(end).value = letterToCheck.toUpperCase();

        let guessWord = buildGuessWord(end);
        
        //Get the easy case over with...
        //console.log("Current Word is", currentWord, "and guess is", guessWord);
        if (guessWord == currentWord) {
            for (let i = 0; i < 5; i++) {
                colorArray[i] = "G";
            }
        } else {
            //More logic to build color array if guess was not perfect
            buildColorArray(guessWord);
        }

        //This function actually sets the colors of the guess inputs
        console.log("Color Array is ", colorArray);
        await setColors(end, subtractor);

        if (!isSolved(end - 4, end)) {
            
            for (let i = Number(end) + 1; i <= Number(end) + 5; i++) {
                document.getElementById(i).disabled = false;
            }
            document.getElementById(Number(end) + 1).focus();
        } else {
            for (let i = 1; i <= 30; i++) {
                //document.getElementById(i).style.backgroundColor = "gray";
                document.getElementById(i).disabled = true;
            }
            //Post game to games database for this player
            document.getElementById("statsButton").disabled = false;
            let winningGuess = determineWinningGuess(end);
            const response = await fetch(`${path}/stats/${winningGuess}`, {
                method: "PATCH",
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                  {
                    username: currentPlayer
                    //password: document.getElementById("password").value
                  }
                )
            });
        }
    }

    const buildGuessWord = (end) => {

        let guessWord = "";
        for (let i = end - 4; i <= end; i++) {
            guessWord += document.getElementById(i).value;
        }

        return guessWord;
    }
    
    const backUp = () => {

        console.log("Inside back up and current Index is ", currentIndex);
        if (currentIndex > 0 || currentIndex < 31) {
            document.getElementById(currentIndex).value = "";
            currentIndex--;

            switch (currentIndex) {
                
                case 0:
                    currentIndex = 1;
                    break;
                case 5:
                    currentIndex = 6;
                    break;
                case 10:
                    currentIndex = 11;
                    break;
                case 15:
                    currentIndex = 16;
                    break;
                case 20:
                    currentIndex = 21;
                    break;
                case 25:
                    currentIndex = 26;
                    break;
                default:
                    console.log("No such index to delete");
            }
            document.getElementById(currentIndex).focus();
        }
    }

    const viewStats = () => {

        navigate('/profile');

    }

    return(
        <>

        <h1>Current Player : {currentPlayer}</h1>
        <hr></hr>
        <form className="guess-container">
            <input id="1" type="text" className="grid-item" maxLength="1" onChange={() => nextLetter(1)}></input>
            <input id="2" type="text" className="grid-item" maxLength="1" onChange={() => nextLetter(2)}></input>
            <input id="3" type="text" className="grid-item" maxLength="1" onChange={() => nextLetter(3)}></input>
            <input id="4" type="text" className="grid-item" maxLength="1" onChange={() => nextLetter(4)}></input>
            <input id="5" type="text" className="grid-item" maxLength="1" onChange={() => checkGuess("5", 1)}></input>
            <input id="6" type="text" className="grid-item" maxLength="1" onChange={() => nextLetter(6)}></input>
            <input id="7" type="text" className="grid-item" maxLength="1" onChange={() => nextLetter(7)}></input>
            <input id="8" type="text" className="grid-item" maxLength="1" onChange={() => nextLetter(8)}></input>
            <input id="9" type="text" className="grid-item" maxLength="1" onChange={() => nextLetter(9)}></input>
            <input id="10" type="text" className="grid-item" maxLength="1" onChange={() => checkGuess("10", 6)}></input>
            <input id="11" type="text" className="grid-item" maxLength="1" onChange={() => nextLetter(11)}></input>
            <input id="12" type="text" className="grid-item" maxLength="1" onChange={() => nextLetter(12)} ></input>
            <input id="13" type="text" className="grid-item" maxLength="1" onChange={() => nextLetter(13)}></input>
            <input id="14" type="text" className="grid-item" maxLength="1" onChange={() => nextLetter(14)}></input>
            <input id="15" type="text" className="grid-item" maxLength="1" onChange={() => checkGuess("15", 11)}></input>
            <input id="16" type="text" className="grid-item" maxLength="1" onChange={() => nextLetter(16)}></input>
            <input id="17" type="text" className="grid-item" maxLength="1" onChange={() => nextLetter(17)} ></input>
            <input id="18" type="text" className="grid-item" maxLength="1" onChange={() => nextLetter(18)} ></input>
            <input id="19" type="text" className="grid-item" maxLength="1" onChange={() => nextLetter(19)}></input>
            <input id="20" type="text" className="grid-item" maxLength="1" onChange={() => checkGuess("20", 16)}></input>
            <input id="21" type="text" className="grid-item" maxLength="1" onChange={() => nextLetter(21)}></input>
            <input id="22" type="text" className="grid-item" maxLength="1" onChange={() => nextLetter(22)}></input>
            <input id="23" type="text" className="grid-item" maxLength="1" onChange={() => nextLetter(23)}></input>
            <input id="24" type="text" className="grid-item" maxLength="1" onChange={() => nextLetter(24)}></input>
            <input id="25" type="text" className="grid-item" maxLength="1" onChange={() => checkGuess("25", 21)}></input>
            <input id="26" type="text" className="grid-item" maxLength="1" onChange={() => nextLetter(26)}></input>
            <input id="27" type="text" className="grid-item" maxLength="1" onChange={() => nextLetter(27)}></input>
            <input id="28" type="text" className="grid-item" maxLength="1" onChange={() => nextLetter(28)}></input>
            <input id="29" type="text" className="grid-item" maxLength="1" onChange={() => nextLetter(29)}></input>
            <input id="30" type="text" className="grid-item" maxLength="1" onChange={() => checkGuess("30", 26)}></input>
        </form>

        
        <div className="bad-letters-container">
            <input id="b1" tabIndex="-1" type="text" className="badletter" maxLength="1"></input>
            <input id="b2" tabIndex="-1" type="text" className="badletter" maxLength="1"></input>
            <input id="b3" tabIndex="-1" type="text" className="badletter" maxLength="1"></input>
            <input id="b4" tabIndex="-1" type="text" className="badletter" maxLength="1"></input>
            <input id="b5" tabIndex="-1" type="text" className="badletter" maxLength="1"></input>
            <input id="b6" tabIndex="-1" type="text" className="badletter" maxLength="1"></input>
            <input id="b7" tabIndex="-1" type="text" className="badletter" maxLength="1"></input>
            <input id="b8" tabIndex="-1" type="text" className="badletter" maxLength="1"></input>
            <input id="b9" tabIndex="-1" type="text" className="badletter" maxLength="1"></input>
            <input id="b10" tabIndex="-1" type="text" className="badletter" maxLength="1"></input>
            <input id="b11" tabIndex="-1" type="text" className="badletter" maxLength="1"></input>
            <input id="b12" tabIndex="-1" type="text" className="badletter" maxLength="1"></input>
            <input id="b13" tabIndex="-1" type="text" className="badletter" maxLength="1"></input>
            <input id="b14" tabIndex="-1" type="text" className="badletter" maxLength="1"></input>
            <input id="b15" tabIndex="-1" type="text" className="badletter" maxLength="1"></input>
            <input id="b16" tabIndex="-1" type="text" className="badletter" maxLength="1"></input>
            <input id="b17" tabIndex="-1" type="text" className="badletter" maxLength="1"></input>
            <input id="b18" tabIndex="-1" type="text" className="badletter" maxLength="1"></input>
            <input id="b19" tabIndex="-1" type="text" className="badletter" maxLength="1"></input>
            <input id="b20" tabIndex="-1" type="text" className="badletter" maxLength="1"></input>
            <input id="b21" tabIndex="-1" type="text" className="badletter" maxLength="1"></input>
            <i className="fa fa-sign-in icon" backgroundcolor="white" onClick={() => submitGuess()}></i> 
            <input id="b22" tabIndex="-1" type="text" className="badletter" maxLength="1"></input>
            <input id="b23" tabIndex="-1" type="text" className="badletter" maxLength="1"></input>
            <input id="b24" tabIndex="-1" type="text" className="badletter" maxLength="1"></input>
            <input id="b25" tabIndex="-1" type="text" className="badletter" maxLength="1"></input>
            <input id="b26" tabIndex="-1" type="text" className="badletter" maxLength="1"></input>
            <i className="fa-solid fa-delete-left icon" onClick={() => backUp()}></i>
        </div>

        <div>
            <button id="statsButton" onClick={viewStats}>View Stats</button>    
        </div>

        </>
    )  
}

export default Game;
export {totalGames, successRate, userData};
