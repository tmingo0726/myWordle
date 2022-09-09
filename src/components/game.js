import { useEffect } from "react";

const Game = (props) => {

    const currentUser = props.currentUser;
    const currentRow = props.currentRow;

    const currentWord = "TESTY";

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
        }
    }

    const isSolved = () => {

        return false;

    }

    const changeColor = (row) => {

        switch(row) {
            case "row1":
                for (let i = 1; i <= 5; i++) {
                    //I need to put the next 2 statements in a for loop to change the background color
                    //to green for a correct letter in a correct spot and yellow for a correct letter in
                    //a wrong spot.
                    let letter = document.getElementById(i).value;
                    console.log("Letter is ", letter);
                    let index = currentWord.indexOf(letter);
                    if (index !== -1) {
                        if (index === (i - 1)) {
                            console.log("The letter exists and it's in the right place");
                            document.getElementById(index).backgroundColor = "#00FF00";
                        } else {
                            console.log("The letter exists but it's not in the right place");
                            document.getElementById(index).backgroundColor = "#FFFF00";
                        }
                    } else {
                        console.log("The letter does not exist");
                    }
                }
                break;
            }
    }

    const checkGuess = (row) => {

        let solved = false;

        switch(row) {
            case "firstguess":
                //First change colors of squares based on correct letters, incorrect letters, and correct letters in the right place
                changeColor("row1");
                //I will have to pass in a string built from the squares in the firstguess row
                solved = isSolved();
                if (!solved) {
                    for (let i = 6; i <= 10; i++) {
                        document.getElementById(i).disabled = false;
                    }
                }
                break;
            case "secondguess":
                break;
            case "thirdguess":
                break;
            case "fourthguess":
                break;
            case "fifthguess":
                break;
            case "sixthguess":
                break;
            default:
                break;
        }
        
        /*
        if (index !== -1) {
            console.log("Index is " + index + " and i is " + id);
            if (index === (id - 1)) {
                console.log("The letter exists and it's in the right place");
            } else {
                console.log("The letter exists but it's not in the right place");
            }
        } else {
            console.log("The letter does NOT exist");
            document.getElementById(id).background = "#ff0000";
        }*/

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
            <input id="5" type="text" className="grid-item" maxLength="1" onBlur={() => checkGuess("firstguess")}></input>
            <input id="6" type="text" className="grid-item" maxLength="1" onBlur={() => checkLetter("6")}></input>
            <input id="7" type="text" className="grid-item" maxLength="1" onBlur={() => checkLetter("7")}></input>
            <input id="8" type="text" className="grid-item" maxLength="1" onBlur={() => checkLetter("8")}></input>
            <input id="9" type="text" className="grid-item" maxLength="1" onBlur={() => checkLetter("9")}></input>
            <input id="10" type="text" className="grid-item" maxLength="1" onBlur={() => checkGuess("secondguess")}></input>
            <input id="11" type="text" class="grid-item" maxLength="1" ></input>
            <input id="12" type="text" class="grid-item" maxLength="1"></input>
            <input id="13" type="text" class="grid-item" maxLength="1"></input>
            <input id="14" type="text" class="grid-item" maxLength="1"></input>
            <input id="15" type="text" class="grid-item" maxLength="1"></input>
            <input id="16" type="text" class="grid-item" maxLength="1"></input>
            <input id="17" type="text" class="grid-item" maxLength="1"></input>
            <input id="18" type="text" class="grid-item" maxLength="1"></input>
            <input id="19" type="text" class="grid-item" maxLength="1"></input>
            <input id="20" type="text" class="grid-item" maxLength="1"></input>
            <input id="21" type="text" class="grid-item" maxLength="1"></input>
            <input id="22" type="text" class="grid-item" maxLength="1"></input>
            <input id="23" type="text" class="grid-item" maxLength="1"></input>
            <input id="24" type="text" class="grid-item" maxLength="1"></input>
            <input id="25" type="text" class="grid-item" maxLength="1"></input>
            <input id="26" type="text" class="grid-item" maxLength="1"></input>
            <input id="27" type="text" class="grid-item" maxLength="1"></input>
            <input id="28" type="text" class="grid-item" maxLength="1"></input>
            <input id="29" type="text" class="grid-item" maxLength="1"></input>
            <input id="30" type="text" class="grid-item" maxLength="1"></input>
        </form>

        </>

    )

}

export default Game;
