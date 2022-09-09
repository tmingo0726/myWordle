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
        const index = currentWord.indexOf(letter);

        console.log("Index is ", index);
        
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
        }


    }

    return(
        <>
        <h1>Current Player : {currentUser}</h1>
        <hr></hr>
        <form className="guess-container">
            <input id="1" type="text" className="grid-item" maxLength="1" onBlur={() => checkLetter("1")}></input>
            <input id="2" type="text" className="grid-item" maxLength="1" onBlur={() => checkLetter("2")}></input>
            <input id="3" type="text" className="grid-item" maxLength="1"></input>
            <input id="4" type="text" class="grid-item" maxLength="1"></input>
            <input id="5" type="text" class="grid-item" maxLength="1" onBlur={() => checkGuess("firstguess")}></input>
            <input id="6" type="text" class="grid-item" maxLength="1"></input>
            <input id="7" type="text" class="grid-item" maxLength="1"></input>
            <input id="8" type="text" class="grid-item" maxLength="1"></input>
            <input id="9" type="text" class="grid-item" maxLength="1"></input>
            <input id="10" type="text" class="grid-item" maxLength="1"></input>
            <input id="11" type="text" class="grid-item" maxLength="1"></input>
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
