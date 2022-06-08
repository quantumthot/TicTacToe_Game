// This variable keeps track of whose turn it is.
let activePlayer = 'X';
// This array stores an array of moves. Use this to determine win condition.
let selectedSquares = [];

// This function  is for placeing an x or an o in the square.
function placeXOrO(squareNumber) {
// This condiotion ensures a square hasn't been selected already
// The .some() method is used to check each element of selectedSquare array
// to see if it contains the square number clicked on.
    if (!selectedSquares.some(element => element.includes(squareNumber))) {
        // This variable retrieves the html element id that was clicked.
        let select = document.getElementById(squareNumber);
        // This condition checks whos turn it is
        if (activePlayer === 'X') {
            // If activePlayer is equal to X the x.png is placed in html
            select.style.backgroundImage = 'url("images/cat.png")';
            // Active player may only be X or O so, if not X, it must be O
        } else {
            // If active player is equal to O, the O.png is placed in html
            select.style.backgroundImage = 'url("images/dog.png")';
        }
        // squareNumber and activePlayer are cancatenated together and added to array
        selectedSquares.push(squareNumber + activePlayer);
        // This calls a function to check for any win conditions
        checkWinConditions();
        // This condtion is for changing the active player.
        if (activePlayer === 'X') {
            // If active player is X change to O
            activePlayer = 'O'
            // If active player is anything othewr than X
        } else {
            activePlayer = 'X';
        }
        //This function plays placement sound.
        audio('./media/bell.wav');
        // This checks to see if its computers turn.
        if(activePlayer === 'O') {
            //Function disables clicking for choices
            disableClick();
            //Function waits 1 second before computer places an image and enables click
            setTimeout(function () { computersTurn(); }, 1000)
        }
        //Returning true is needed for computersTurn() to work.
        return true;
    }
    //This function results in a random square being selected.
    function computersTurn() {
        //This boolean i needed for our while loop.
        let success = false;
        // This variable stores a random number 0-8
        let pickASquare;
        // This condition allows our while loop to keep trying if a square is already selected
        while(!success) {
            // A random number between 0 and 8 is selected
            pickASquare = String(Math.floor(Math.random() * 9));
            // If the random number evaluated returns true, the square hasn't been selected yet
            if (placeXOrO(pickASquare)) {
                // This line calls the function.
                placeXOrO(pickASquare);
                // This changes our boolean and ends the loop
                success = true;
            };
        }
    }
}

// This function parses the selectedSquares array to search for wind conditions.
//drawWinLine function is also called to draw line if condition is met.
function checkWinConditions() {
    // X 0, 1, 2 condition.
    if      (arrayIncludes('0X', '1X', '2X')) { drawWinLine(50, 100, 558, 100) }
    // X 3, 4, 5 condition
    else if (arrayIncludes('3X', '4X', '5X')) { drawWinLine(50, 304, 558, 304) }
    // X 6, 7, 8 condition
    else if (arrayIncludes('6X', '7X', '8X')) { drawWinLine(50, 508, 558, 508) }
    // X 0, 3, 6 condition
    else if (arrayIncludes('0X', '3X', '6X')) { drawWinLine(100, 50, 100, 558) }
    // X 1, 4, 7condition
    else if (arrayIncludes('1X', '4X', '7X')) { drawWinLine(304, 50, 304, 558) }
    // X 2, 5, 8 condition
    else if (arrayIncludes('2X', '5X', '8X')) { drawWinLine(508, 50, 508, 558) }
    // X 6, 4, 2 condition
    else if (arrayIncludes('6X', '4X', '2X')) { drawWinLine(100, 508, 510, 90) }
    // X 0, 4, 8 condition
    else if (arrayIncludes('0X', '4X', '8X')) { drawWinLine(100, 100, 520, 520) }
    // O 1, 2, 3 condition
    else if (arrayIncludes('0O', '1O', '2O')) { drawWinLine(50, 100, 558, 100) }
    // O 3, 4, 5 condition
    else if (arrayIncludes('3O', '4O', '5O')) { drawWinLine(50, 304, 558, 304) }
    // O 6, 7, 8 condition
    else if (arrayIncludes('6O', '7O', '8O')) { drawWinLine(50, 508, 558, 508) }
    // O 0, 3, 6 condition
    else if (arrayIncludes('0O', '3O', '6O')) { drawWinLine(100, 50, 100, 558) }
    // O 1, 4, 7condition
    else if (arrayIncludes('1O', '4O', '7O')) { drawWinLine(304, 50, 304, 558) }
    // O 2, 5, 8 condition
    else if (arrayIncludes('2O', '5O', '8O')) { drawWinLine(508, 50, 508, 558) }
    // O 6, 4, 2 condition
    else if (arrayIncludes('6O', '4O', '2O')) { drawWinLine(100, 508, 510, 90) }
    // O 0, 4, 8 condition
    else if (arrayIncludes('0O', '4O', '8O')) { drawWinLine(100, 100, 520, 520) }
    // This condition checvks for a tie. If none of the above conditions register and 9
    //squares are selected the code executes.
    else if (selectedSquares.length >= 9) {
        //This function plays the tie game sound.
        audio('./media/Honk.wav');
        // This audio function sets a .3 second timer before the resetGame is called.
        setTimeout(function () { resetGame(); }, 1000);
    }
    // This function checks if an array includes 3 strings. 
    //It is used to check for each win condition.
    function arrayIncludes(squareA, squareB, squareC) {
        // These 3 variables will be used to check for 3 in a row.
        const a = selectedSquares.includes(squareA)
        const b = selectedSquares.includes(squareB)
        const c = selectedSquares.includes(squareC)
        // If the 3 variables we pass are all included in our array true is
        //returned and our else if condition executes the drawLine function.
        if (a === true && b === true && c === true) { return true }
    }

}

//THis function makes our body element temporary unclickable
function disableClick() {
    //This makes our body unclickable.
    body.style.pointerEvents = 'none';
    //This makes our body clickable again after 1 second.
    setTimeout(function() {body.style.pointerEvents = 'auto';}, 1000);
}

//This function takes a string perameter of the path you set eralier for
//placement sound. place.mp3
function audio(audioURL) {
    //We create a new audio object and we pass the path as a perameter.
    let audio = new Audio(audioURL);
    //Play ethod plays our audio sound
    audio.play();
}

//This function utilizes html canvas to draw win lines.
function drawWinLine(coordX1, coordY1, coordX2, coordY2) {
    // This line accesses our html canvas element.
    const canvas = document.getElementById('win-lines')
    //This line can give us access to methods and properties to use on canvas.
    const c = canvas.getContext('2d');
    //This line indicates where the start of a lines x axis is.
    let x1 = coordX1,
        // This line indicates where the atart of lines y axis is.
        y1 = coordY1,
        //This line indicates where the end of line x axis is.
        x2 = coordX2,
        //This line iindicates where the end of line y axis is.
        y2 = coordY2,
        //This variable stores temp x axis data we update in our animation loop.
        x = x1,
        //This variable stores temp y axis data we update in our animation loop.
        y = y1;
    //This function interacts with the canvas.
    function amnimateLineDrawing() {
        //This varable creates a loop.
        const animationLoop = requestAnimationFrame(amnimateLineDrawing);
        //This methos clears content from last loop iteration.
        c.clearRect(0, 0, 608, 608)
        //This methos starts a new path
        c.beginPath();
        //This method moves us to a starting point for our line.
        c.moveTo(x1, y1)
        //thismethod indicates the end point in our line.
        c.lineTo(x, y)
        //This methos sets the width of our lines
        c.lineWidth = 10;
        //This methos sets the color of the line.
        c.strokeStyle = 'rgba(70, 255, 33, 0.8)';
        //This methos draws everything we laid out above.
        c.stroke();
        //This condition checks to see if we've reached the endpoint.
        if (x1 <= x2 && y1 <= y2) {
            //This condition adds 10 the the previous end x point.
            if (x < x2) { x += 10; }
            //This condition adds 10 the the previous end y point.
            if (y < y2) { y += 10; }
            //This condition cancels our animation loop if we've reached the endpoint.
            if (x >= x2 && y >=y2) { cancelAnimationFrame(animationLoop); }
        }
        //This condition is similar to the one above
        //This is neccessary for the 6, 4, 2 win condition
        if (x1 <= x2 && y1 >= y2) {
            if (x < x2) { x += 10; }
            if (y > y2) { y -= 10; }
            if (x >= x2 && y <= y2) { cancelAnimationFrame(animationLoop); }
        }
    }
    //This function clears out the canvas after the win line is drawn
    function clear() {
        //This line starts the animation loop.
        const animationLoop = requestAnimationFrame(clear);
        //This line clears out canvas.
        c.clearRect(0, 0, 608, 608);
        //This line stops the animation loop.
        cancelAnimationFrame(animationLoop);
    }
    //This line disallows clicking while the win sound is playing
    disableClick();
    //This line plays the win sound.
    audio('./media/LetsGo.wav');
    //This line calls the main animation loop.
    amnimateLineDrawing() ;
    //This line waits 1 second. then, clears canvas, resets game, and allows clicking again.
    setTimeout(function () { clear(); resetGame(); }, 1000);
}

//This function resets the game in the event of a tie or win.
function resetGame() {
    //This for loop iterates through each HTML square element.
    for (let i = 0; i < 9; i++) {
        //This variable gets the element of i.
        let square = document.getElementById(String(i))
        //This removes the backround image
        square.style.backgroundImage = ''
    }
    // This resets our array so it is empty and we can start over.
    selectedSquares = [];
}