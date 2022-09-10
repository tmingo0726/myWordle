import { useEffect } from "react";

const Game = (props) => {

    const currentUser = props.currentUser;
    const currentRow = props.currentRow;

    const currentWord = "TESTY";
    let badLetterArray = [];

    useEffect(() => {

        //On the first time in I need to disable all rows except for the first row.
        //As a player finishes a row, only the next row gets enabled.
        for (let i = 6; i <= 30; i++) {
            document.getElementById(i).disabled = true;
        }

    }, []);

    const checkLetter = (id) => {

        const letter = document.getElementById(id).value;
       
        if (!letter) {
            //remain on this input control until a letter is entered
            document.getElementById(id).focus();
        } else {
            //set focus on the next tab item
            let i = Number(id);
            i++;
            document.getElementById(i).focus();
        }
    }

    const isSolved = () => {

        return false;

    }

    const changeColor = (begin, end) => {

        for (let i = begin; i <= end; i++) {
            //I need to put the next 2 statements in a for loop to change the background color
            //to green for a correct letter in a correct spot and yellow for a correct letter in
            //a wrong spot.
            let letter = document.getElementById(i).value;
            console.log("Letter is ", letter);

            //What if the letter occurs twice in a word?
            //How do we retrieve the other indexOf?
            let index = currentWord.indexOf(letter);
            let index2 = currentWord.lastIndexOf(letter);
            console.log("Index is " + index + " index2 is " +  index2);
            
            if (index !== -1) {
                if (index === (i - begin)) {
                    console.log("The letter exists and it's in the right place");
                    document.getElementById(i).style.backgroundColor = "#00FF00";
                } else if (index2 !== -1 && index2 !== index) {
                    if (index2 === (i - begin)) {
                        console.log("The letter exists and it's in the right place");
                        document.getElementById(i).style.backgroundColor = "#00FF00";
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
                console.log("Bad letters are ", badLetterArray);
                document.getElementById("badLetterLabel").innerHTML = badLetterArray;

            }
        }
    }

    const checkGuess = (begin, end) => {

        let solved = false;

        //First change colors of squares based on correct letters, incorrect letters, and correct letters in the right place
        changeColor(begin, end);
        //I will have to pass in a string built from the squares in the firstguess row
        solved = isSolved();
        if (!solved) {
            for (let i = (begin + 5); i <= (end + 5); i++) {
                document.getElementById(i).disabled = false;
            }
        }
    }

    return(
        <>
        <h1>Current Player : {currentUser}</h1>
        <hr></hr>
        <form className="guess-container">
            <input id="1" type="text" className="grid-item" maxLength="1" onBlur={() => checkLetter("1")}></input>
            <input id="2" type="text" className="grid-item" maxLength="1" onBlur={() => checkLetter("2")}></input>
            <input id="3" type="text" className="grid-item" maxLength="1" onBlur={() => checkLetter("3")}></input>
            <input id="4" type="text" className="grid-item" maxLength="1" onBlur={() => checkLetter("4")}></input>
            <input id="5" type="text" className="grid-item" maxLength="1" onBlur={() => checkGuess(1, 5)}></input>
            <input id="6" type="text" className="grid-item" maxLength="1" onBlur={() => checkLetter("6")}></input>
            <input id="7" type="text" className="grid-item" maxLength="1" onBlur={() => checkLetter("7")}></input>
            <input id="8" type="text" className="grid-item" maxLength="1" onBlur={() => checkLetter("8")}></input>
            <input id="9" type="text" className="grid-item" maxLength="1" onBlur={() => checkLetter("9")}></input>
            <input id="10" type="text" className="grid-item" maxLength="1" onBlur={() => checkGuess(6, 10)}></input>
            <input id="11" type="text" class="grid-item" maxLength="1" onBlur={() => checkLetter("11")}></input>
            <input id="12" type="text" class="grid-item" maxLength="1" onBlur={() => checkLetter("12")}></input>
            <input id="13" type="text" class="grid-item" maxLength="1" onBlur={() => checkLetter("13")}></input>
            <input id="14" type="text" class="grid-item" maxLength="1" onBlur={() => checkLetter("14")}></input>
            <input id="15" type="text" class="grid-item" maxLength="1" onBlur={() => checkGuess(11, 15)}></input>
            <input id="16" type="text" class="grid-item" maxLength="1" onBlur={() => checkLetter("16")}></input>
            <input id="17" type="text" class="grid-item" maxLength="1" onBlur={() => checkLetter("17")} ></input>
            <input id="18" type="text" class="grid-item" maxLength="1" onBlur={() => checkLetter("18")}></input>
            <input id="19" type="text" class="grid-item" maxLength="1" onBlur={() => checkLetter("19")}></input>
            <input id="20" type="text" class="grid-item" maxLength="1" onBlur={() => checkGuess(16, 20)}></input>
            <input id="21" type="text" class="grid-item" maxLength="1" onBlur={() => checkLetter("21")}></input>
            <input id="22" type="text" class="grid-item" maxLength="1" onBlur={() => checkLetter("22")}></input>
            <input id="23" type="text" class="grid-item" maxLength="1" onBlur={() => checkLetter("23")}></input>
            <input id="24" type="text" class="grid-item" maxLength="1" onBlur={() => checkLetter("24")}></input>
            <input id="25" type="text" class="grid-item" maxLength="1" onBlur={() => checkGuess(21, 25)}></input>
            <input id="26" type="text" class="grid-item" maxLength="1" onBlur={() => checkLetter("26")} ></input>
            <input id="27" type="text" class="grid-item" maxLength="1" onBlur={() => checkLetter("27")} ></input>
            <input id="28" type="text" class="grid-item" maxLength="1" onBlur={() => checkLetter("28")}></input>
            <input id="29" type="text" class="grid-item" maxLength="1" onBlur={() => checkLetter("29")}></input>
            <input id="30" type="text" class="grid-item" maxLength="1" onBlur={() => checkGuess(26, 30)}></input>
        </form>
        <label id="badLetterLabel">Bad Letters</label>
        </>

    )

}

export default Game;
