import { useEffect } from "react";

const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
let currentWord = "";
const Game = (props) => {

    const currentUser = props.currentUser;
    const currentRow = props.currentRow;
    const currentLetter = props.currentLetter;
    const setCurrentLetter = props.setCurrentLetter;

    let badLetterArray = [];
    let twoDArray =  new Array(2);
    let letterToCheck = '';
    
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
            //elements[i].addEventListener('keyup', moveCursor(1));
            //elements[i].addEventListener('input', moveCursor(1));
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


    }, []);

    const checkLetter = async (id) => {

        //let letter = "";
        
        letterToCheck = document.getElementById(id).value;
        document.getElementById(id).value = letterToCheck.toUpperCase();
               
        if (!letterToCheck) {
            //remain on this input control until a letter is entered
            document.getElementById(id).focus();
        } else {
            //set focus on the next tab item
            let i = Number(id);
            i++;
            document.getElementById(i).focus();
            console.log("about to call setCurrentLetter");
            await setCurrentLetter(letterToCheck);
            console.log("Current Letter is :", currentLetter);
        }
    }

    const isSolved = (begin, end) => {

        for (let i = begin; i <= end; i++) {
            if (document.getElementById(i).style.backgroundColor !== "rgb(0, 255, 0)") {
                console.log("We are not solved yet ", document.getElementById(i).style.backgroundColor);
                return false;
            }
        }
        return true;

    }

    const changeColor = (begin, end) => {

        let num_occurrences = 0;

        console.log("In changeColor and CURRENT WORD:", currentWord);

        for (let i = begin; i <= end; i++) {
            //I need to put the next 2 statements in a for loop to change the background color
            //to green for a correct letter in a correct spot and yellow for a correct letter in
            //a wrong spot.
            let letter = document.getElementById(i).value.toUpperCase();
            console.log("Inside changeColor and Letter is ", letter);

            //What if the letter occurs twice in a word?
            //How do we retrieve the other indexOf?

            //Let's see how many times the letter occurs in the word
            //for (i = 0; i < 5; i++) {
                //if (currentWord[i] === letter) {
                    //num_occurrences++;
                //}
            //}

            console.log ("Letter " + letter + " occurs " + num_occurrences + " times.");

            let index = currentWord.indexOf(letter);
            let index2 = currentWord.lastIndexOf(letter);
            let indexStr = "";
            let idx;

            console.log("Index is " + index + " index2 is " +  index2);
            
            if (index !== -1) {
                if (index === (i - begin)) {
                    console.log("The letter exists and it's in the right place");
                    idx = alphabet.indexOf(letter.toLowerCase());
                    indexStr = "b" + (idx + 1)
                    document.getElementById(i).style.backgroundColor = "#00FF00";
                    document.getElementById(indexStr).style.backgroundColor = "#66FF00";
                } else if (index2 !== -1 && index2 !== index) {
                    if (index2 === (i - begin)) {
                        console.log("The letter exists and it's in the right place");
                        idx = alphabet.indexOf(letter.toLowerCase());
                        indexStr = "b" + (idx + 1)
                        document.getElementById(i).style.backgroundColor = "#00FF00";
                        document.getElementById(indexStr).style.backgroundColor = "#66FF00";
                    }
                } else {
                    console.log("The letter exists but it's not in the right place");
                    document.getElementById(i).style.backgroundColor = "#FFFF00";
                }
            } else {
                console.log("The letter does not exist");
                //We need to keep track of these letters to display to the user
                //what not to play.
                badLetterArray.push(letter);
                //console.log("Bad letters are ", badLetterArray);
                idx = alphabet.indexOf(letter.toLowerCase());
                indexStr = "b" + (idx + 1);
                console.log("Index Str is :", indexStr);
                document.getElementById(indexStr).style.backgroundColor = "gray";
            }
        }
    }

    const moveCursor = (index) => {

        console.log("Tab Index for this element is ", document.activeElement.tabindex);
        index++;
        console.log("inside moveCursor");
        document.getElementById(index).style.autofocus;

    }

    const checkGuess = async(begin, end) => {

        let letter = document.getElementById(end).value;
        document.getElementById(end).value = letter.toUpperCase();
        
        //First change colors of squares based on correct letters, incorrect letters, and correct letters in the right place
        changeColor(begin, end);
        //I will have to pass in a string built from the squares in the firstguess row
        if (!isSolved(begin, end)) {
            for (let i = (begin + 5); i <= (end + 5); i++) {
                document.getElementById(i).disabled = false;
            }
            document.getElementById(begin + 5).focus();
        } else {
            for (i = begin; i < end; i++) {
                document.getElementById(i).style.backgroundColor = "#00FF00";
            }
            alert("Great job " + currentUser + " you solved the puzzle!");
        }
    }

    return(
        <>
        <h1>Current Player : {currentUser}</h1>
        <hr></hr>
        <form className="guess-container">
            <input id="1" type="text" className="grid-item" maxLength="1" onChange={() => checkLetter("1")}></input>
            <input id="2" type="text" className="grid-item" maxLength="1" onChange={() => checkLetter("2")}></input>
            <input id="3" type="text" className="grid-item" maxLength="1" onChange={() => checkLetter("3")}></input>
            <input id="4" type="text" className="grid-item" maxLength="1" onChange={() => checkLetter("4")}></input>
            <input id="5" type="text" className="grid-item" maxLength="1" onChange={() => checkGuess(1, 5)}></input>
            <input id="6" type="text" className="grid-item" maxLength="1" onChange={() => checkLetter("6")}></input>
            <input id="7" type="text" className="grid-item" maxLength="1" onChange={() => checkLetter("7")}></input>
            <input id="8" type="text" className="grid-item" maxLength="1" onChange={() => checkLetter("8")}></input>
            <input id="9" type="text" className="grid-item" maxLength="1" onChange={() => checkLetter("9")}></input>
            <input id="10" type="text" className="grid-item" maxLength="1" onChange={() => checkGuess(6, 10)}></input>
            <input id="11" type="text" className="grid-item" maxLength="1" onChange={() => checkLetter("11")}></input>
            <input id="12" type="text" className="grid-item" maxLength="1" onChange={() => checkLetter("12")}></input>
            <input id="13" type="text" className="grid-item" maxLength="1" onChange={() => checkLetter("13")}></input>
            <input id="14" type="text" className="grid-item" maxLength="1" onChange={() => checkLetter("14")}></input>
            <input id="15" type="text" className="grid-item" maxLength="1" onChange={() => checkGuess(11, 15)}></input>
            <input id="16" type="text" className="grid-item" maxLength="1" onChange={() => checkLetter("16")}></input>
            <input id="17" type="text" className="grid-item" maxLength="1" onChange={() => checkLetter("17")} ></input>
            <input id="18" type="text" className="grid-item" maxLength="1" onChange={() => checkLetter("18")}></input>
            <input id="19" type="text" className="grid-item" maxLength="1" onChange={() => checkLetter("19")}></input>
            <input id="20" type="text" className="grid-item" maxLength="1" onChange={() => checkGuess(16, 20)}></input>
            <input id="21" type="text" className="grid-item" maxLength="1" onChange={() => checkLetter("21")}></input>
            <input id="22" type="text" className="grid-item" maxLength="1" onChange={() => checkLetter("22")}></input>
            <input id="23" type="text" className="grid-item" maxLength="1" onChange={() => checkLetter("23")}></input>
            <input id="24" type="text" className="grid-item" maxLength="1" onChange={() => checkLetter("24")}></input>
            <input id="25" type="text" className="grid-item" maxLength="1" onChange={() => checkGuess(21, 25)}></input>
            <input id="26" type="text" className="grid-item" maxLength="1" onChange={() => checkLetter("26")} ></input>
            <input id="27" type="text" className="grid-item" maxLength="1" onChange={() => checkLetter("27")} ></input>
            <input id="28" type="text" className="grid-item" maxLength="1" onChange={() => checkLetter("28")}></input>
            <input id="29" type="text" className="grid-item" maxLength="1" onChange={() => checkLetter("29")}></input>
            <input id="30" type="text" className="grid-item" maxLength="1" onChange={() => checkGuess(26, 30)}></input>
        </form>
        <label id="badLetterLabel"></label>
        <container className="bad-letters-container">
            <input id="b1" tabindex="-1" type="text" className="badletter" maxLength="1"></input>
            <input id="b2" tabindex="-1" type="text" className="badletter" maxLength="1"></input>
            <input id="b3" tabindex="-1" type="text" className="badletter" maxLength="1"></input>
            <input id="b4" tabindex="-1" type="text" className="badletter" maxLength="1"></input>
            <input id="b5" tabindex="-1" type="text" className="badletter" maxLength="1"></input>
            <input id="b6" tabindex="-1" type="text" className="badletter" maxLength="1"></input>
            <input id="b7" tabindex="-1" type="text" className="badletter" maxLength="1"></input>
            <input id="b8" tabindex="-1" type="text" className="badletter" maxLength="1"></input>
            <input id="b9" tabindex="-1" type="text" className="badletter" maxLength="1"></input>
            <input id="b10" tabindex="-1" type="text" className="badletter" maxLength="1"></input>
            <input id="b11" tabindex="-1" type="text" className="badletter" maxLength="1"></input>
            <input id="b12" tabindex="-1" type="text" className="badletter" maxLength="1"></input>
            <input id="b13" tabindex="-1" type="text" className="badletter" maxLength="1"></input>
            <input id="b14" tabindex="-1" type="text" className="badletter" maxLength="1"></input>
            <input id="b15" tabindex="-1" type="text" className="badletter" maxLength="1"></input>
            <input id="b16" tabindex="-1" type="text" className="badletter" maxLength="1"></input>
            <input id="b17" tabindex="-1" type="text" className="badletter" maxLength="1"></input>
            <input id="b18" tabindex="-1" type="text" className="badletter" maxLength="1"></input>
            <input id="b19" tabindex="-1" type="text" className="badletter" maxLength="1"></input>
            <input id="b20" tabindex="-1" type="text" className="badletter" maxLength="1"></input>
            <input id="b21" tabindex="-1" type="text" className="badletter" maxLength="1"></input>
            <input id="b22" tabindex="-1" type="text" className="badletter" maxLength="1"></input>
            <input id="b23" tabindex="-1" type="text" className="badletter" maxLength="1"></input>
            <input id="b24" tabindex="-1" type="text" className="badletter" maxLength="1"></input>
            <input id="b25" tabindex="-1" type="text" className="badletter" maxLength="1"></input>
            <input id="b26" tabindex="-1" type="text" className="badletter" maxLength="1"></input>
        </container>
        </>
    )  
}

export default Game;
