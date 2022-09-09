const Game = (props) => {

    const currentUser = props.currentUser;

    return(
        <>
        <h1>Current Player : {currentUser}</h1>
        <hr></hr>
        <div class="guess-container">
            <input type="text" class="grid-item"></input>
            <input type="text" class="grid-item"></input>
            <input type="text" class="grid-item"></input>
            <input type="text" class="grid-item"></input>
            <input type="text" class="grid-item"></input>
            <input type="text" class="grid-item"></input>
            <input type="text" class="grid-item"></input>
            <input type="text" class="grid-item"></input>
            <input type="text" class="grid-item"></input>
            <input type="text" class="grid-item"></input>
            <input type="text" class="grid-item"></input>
            <input type="text" class="grid-item"></input>
            <input type="text" class="grid-item"></input>
            <input type="text" class="grid-item"></input>
            <input type="text" class="grid-item"></input>
            <input type="text" class="grid-item"></input>
            <input type="text" class="grid-item"></input>
            <input type="text" class="grid-item"></input>
            <input type="text" class="grid-item"></input>
            <input type="text" class="grid-item"></input>
            <input type="text" class="grid-item"></input>
            <input type="text" class="grid-item"></input>
            <input type="text" class="grid-item"></input>
            <input type="text" class="grid-item"></input>
            <input type="text" class="grid-item"></input>
            <input type="text" class="grid-item"></input>
            <input type="text" class="grid-item"></input>
            <input type="text" class="grid-item"></input>
            <input type="text" class="grid-item"></input>
            <input type="text" class="grid-item"></input>
        </div>

        </>

    )

}

export default Game;