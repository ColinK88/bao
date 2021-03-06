//bao1 - just print things into the canvas for now

/*	our board is represented by two arrays, one for player1's half of the board
	and another for player2's half of the board.

	Each half is represented as a 1 dimentional array of 1 dimentional arrays 
	(where the size of the inner array is the number of balls in that pit)

	the indecies of the pits are arranged as follows

	 0  1  2  3  4  5  6  7
	15 14 13 12 11 10  9  8 

	for each player.  The whole board is therefore arranged as follows

	15 14 13 12 11 10  9  8 
	 0  1  2  3  4  5  6  7
	 0  1  2  3  4  5  6  7
	15 14 13 12 11 10  9  8 

	where the upper numbers refer to the indicies of player2's half of the board.
*/

// Initialize canvas and required variables 
var canvas;
var width = 800;
var height = 400;
var cellWidth = width / 8;
var cellHeight = height / 4;
var ctx;

// Initialize board arrrays and player
var player1Board = [];
var player2Board = [];
var currentPlayer = 1;

// Initialize variables to do with pit choice
var firstPitChoice; 
var secondPitChoice;
var startPitChosen = false;
var directionPitChosen = false;
var pit_index;

//the flag is used to make the second player only take one turn at a time
var flag = false;

//when the window loads this function is called
window.onload = function () 
{
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    canvas.width = width;
    canvas.height = height;

    // When mouse click events are recievedm onCanvasClick will be called
    canvas.onclick = onCanvasClick;

    // Draw game board when the window loads
    // drawGameBoard() called within initBoard()
    initBoard();

    // setInterval(computerMove, 5000);
};

//this just draws out the board
function drawGameBoard() 
{
	var i = 0;

	//This makes the board and sets its background colour for the board
	ctx.beginPath();    
	ctx.stroke();
	ctx.fillStyle = "#d08a47";
	ctx.fillRect(0, 0, 800, 400);
	ctx.closePath();
 
 	//draw vertical lines
    for (i = 1; i < 8; i++)
    {
    
	    ctx.beginPath();
	    ctx.moveTo(cellWidth * i, 0);
	    ctx.lineTo(cellWidth * i, height);
	    ctx.stroke();

	}
  
    // Drawing horizontal lines
     for (i = 1; i < 4; i++)
    {
	    ctx.beginPath();
 	   	ctx.moveTo(0, cellHeight * i);
 	  	ctx.lineTo(width, cellHeight * i);
 	  	if (i === 2)
 	  	{
 	  		ctx.lineWidth = 5;
 	   	}
 	   	else 
 	   	{
 	   		ctx.lineWidth = 1;
 	   	}
 	   	ctx.stroke();
	}
}

// this resets variables and gives each pit two balls
function initBoard()
{
	//these values are included so that reseting after a win works properly
	currentPlayer = 1;
	flag = false;
	firstPitChoice = undefined;
	secondPitChoice = undefined;
	startPitChosen = false;
	directionPitChosen = false;
	player1Board = [];
	player2Board = [];

	var i =0;

	//place two balls into each pit
	for (i = 0; i < 16; i++)
	{
		player1Board.push([]);
		for (var j = 0; j < 2; j++)
		{}
		player1Board[i].push(1);
		player1Board[i].push(1);

		player2Board.push([]);
		player2Board[i].push(1);
		player2Board[i].push(1);
	}
		
	drawBalls();
}

//Draws all pits and all balls
function drawBalls()
{
	ctx.clearRect ( 0 , 0 , canvas.width, canvas.height );
	drawGameBoard();


	var i = 0;
	var j = 0;
	var cellMiddleHeight = cellHeight /2;
	ctx.font="40px Arial";
	var coordsX = [ 0, 20, -25, -15, 25, 5]; //higher number is more to the left
	var coordsY = [25, 15, 0, 15, 0, 7]; //higher number is lower


	//draw player1's front row
	for (i = 0; i < 8; i++)
	{
		ctx.fillStyle="#fed09e";
		ctx.beginPath();
		var frontBalls = player1Board[i].length;
		var pit = ctx.arc(cellMiddleHeight + (cellHeight * i), (cellWidth * 3) - (cellWidth / 2), 40, 0, Math.PI*2, true); 
		ctx.closePath();
		ctx.fill();

		for (j = 0; j < frontBalls; j++){

			if (j <= 6)
			{ 	//Looping creating balls
				ctx.fillStyle = "black"; // balls colour
				ctx.beginPath();
				ctx.arc(cellMiddleHeight + (cellHeight * i - coordsX[j]),(cellWidth * 3) - (cellWidth / 2 - coordsY[j]),7,0,2*Math.PI),true;
				ctx.closePath();
				ctx.fill();
				ctx.closePath();
			}

			if (j < 65 ){ //a pit can have absolute max of 65 balls
				ctx.beginPath();
				ctx.fillStyle = "#1947D1"; //"#0099FF"; //inside of text colour
				ctx.textAlign="center"; 
				ctx.fillText("" + frontBalls,cellMiddleHeight + (cellHeight * i),(cellWidth * 3) - (cellWidth / 2));
				ctx.fill ();
				ctx.closePath();
			}
			
		}
		
	}
 
	//draw player1's back row
	for (i = 8; i < 16; i++)
	{
		ctx.fillStyle="#fed09e";
		ctx.beginPath();
		var backBalls = player1Board[23 - i].length;
		ctx.arc(cellMiddleHeight + (cellHeight * (i- 8)), (cellWidth * 4) - (cellWidth / 2), 40, 0, Math.PI*2, true); 
		ctx.closePath();
		ctx.fill();

			for (j = 0; j < backBalls; j++){

			if (j <= 6)
			{ //Looping creating balls
				ctx.fillStyle = "black"; // balls colour
				ctx.beginPath();
				ctx.arc(cellMiddleHeight + (cellHeight * (i-8) - coordsX[j]),(cellWidth * 4) - (cellWidth / 2 - coordsY[j]),7,0,2*Math.PI),true;
				ctx.closePath();
				ctx.fill();
				ctx.closePath();
			}

			if (j < 65 ){ 
				ctx.beginPath();
				ctx.fillStyle = "#1947D1"; //inside of text colour
				ctx.textAlign="center"; 
				ctx.fillText("" + backBalls,cellMiddleHeight + (cellHeight * (i- 8)),(cellWidth * 4) - (cellWidth / 2));
				ctx.fill ();
				ctx.closePath();
			}
	
		}

	}

	//draw player2's front row
	for (i = 0; i < 8; i++)
	{
		ctx.fillStyle="#fed09e";
		ctx.beginPath();
		var frontBalls = player2Board[i].length;
		ctx.arc(cellMiddleHeight + (cellHeight * i), (cellWidth * 2) - (cellWidth / 2), 40, 0, Math.PI*2, true); 
		ctx.closePath();
		ctx.fill();
		
		
		for (j = 0; j < frontBalls; j++){

			if (j <= 6){ //Looping creating balls
			ctx.fillStyle = "black"; 
			ctx.beginPath();
			ctx.arc(cellMiddleHeight + (cellHeight * i - coordsX[j]),(cellWidth * 2) - (cellWidth / 2 - coordsY[j]),7,0,2*Math.PI),true;
			ctx.closePath();
			ctx.fill();
		}

			if (j < 65){ 
				ctx.fillStyle = "#FF3399"; 
				ctx.fillText("" + frontBalls,cellMiddleHeight + (cellHeight * i),(cellWidth * 2) - (cellWidth / 2));
			}

		}

	}

	//draw player2's back row
	for (i = 8; i < 16; i++)
	{
		ctx.fillStyle="#fed09e";
		ctx.beginPath();
		var backBalls = player2Board[23 - i].length;
		ctx.arc(cellMiddleHeight + (cellHeight * (i- 8)), (cellWidth) - (cellWidth / 2), 40, 0, Math.PI*2, true); 
		ctx.closePath();
		ctx.fill();
		ctx.fillStyle = "black"; 

		for (j = 0; j < backBalls; j++){

			if (j <= 6){	//Looping creating balls
			ctx.fillStyle = "black"; 
			ctx.beginPath();
			ctx.arc(cellMiddleHeight + (cellHeight * (i-8) - coordsX[j]),(cellWidth) - (cellWidth / 2 - coordsY[j]),7,0,2*Math.PI),true;
			ctx.closePath();
			ctx.fill();
		}

			if (j < 65){ 
				ctx.fillStyle = "#FF3399"; 
				ctx.fillText("" + backBalls,cellMiddleHeight + (cellHeight * (i- 8)),(cellWidth) - (cellWidth / 2));
			}

		}

	}
}

function onCanvasClick(e) {
    var mCoordinate = getMouseLocation(e);

    //if the player has not yet chosen a starting pit
    if (!startPitChosen)
    {

    	//get the pit coordinate of the first choice pit
    	firstPitChoice = getPitFromLocation(mCoordinate);

    	//get the index of the pit, pit_index is undefined if the player clicks on the opponent's half
    	pit_index = processPitClick(firstPitChoice);


    	//if the pit index isn't undefined, set startPitChosen to true
    	if (pit_index !== undefined)
    	{
    		//check if the pit is full enough to admit a move
    		var pitFullEnough = checkPitIsFullEnough(pit_index);

    		//if the pit is full enough (that is it contains at least 2 balls) set startPitChosen to true
    		if (pitFullEnough)
    		{
    			startPitChosen = true;
    	   		//Send the start pit coordinates to set the start pit colour choice. True means the colour should be special. //SARA
    			startPitColour(startPitChosen, firstPitChoice.x, firstPitChoice.y);
    		}
    	   	
    	}
    }
    else //if the first pit is chosen, let the user choose the second
    {
    	secondPitChoice = getPitFromLocation(mCoordinate);

    	//if the second choice is the same as the first, reset values to start again
    	if (secondPitChoice.x === firstPitChoice.x && secondPitChoice.y === firstPitChoice.y)
    	{

    		firstPitChoice = undefined;
    		startPitChosen = false;
    		console.log("that was the same pit");
    		drawGameBoard(); //This is done in order to delete the circle that shows what pit has been as the first pit 
    		drawBalls();
    	
	    	
    	}
    	else // if the second choice is different to the first, set directionPitChosen to true
    	{
    		directionPitChosen = true;
    	}
    }

    

    //only process moves from the current player 
    if (pit_index !== undefined && directionPitChosen) 	
    {
    	//get the index of second choice pit
    	var directionIndex = processPitClick(secondPitChoice);
    	//get if we should go left or right
    	var direction = directionChoice(pit_index, directionIndex);
    	//make a move
    	makeMove(pit_index, direction);
    }
   
}

//This function changes the startPitColour based on whether it's selected
function startPitColour(booleanParam, xParam, yParam){					
	var cellMiddleHeight = cellHeight /2;
	if (booleanParam == true){
		ctx.beginPath();
		ctx.lineWidth = 7;
		if (xParam < 8 && yParam == 2){ //first player, front row
			ctx.arc(cellMiddleHeight + (cellHeight * xParam), (cellWidth * 3) - (cellWidth / 2), 45, 0, Math.PI*2, true);  
			console.log("FIRST");
		}
		if (xParam < 8 && yParam == 3){ //first player, back row
			ctx.arc(cellMiddleHeight + (cellHeight * xParam), (cellWidth * 4) - (cellWidth / 2), 45, 0, Math.PI*2, true);
			console.log("SECOND");
		}
		if (xParam < 8 && yParam == 1){ //second player, front row
			ctx.arc(cellMiddleHeight + (cellHeight * xParam), (cellWidth * 2) - (cellWidth / 2), 45, 0, Math.PI*2, true); 
			console.log("THIRD");
		}
		if (xParam < 8 && yParam == 0){ //second player, back row
			ctx.arc(cellMiddleHeight + (cellHeight * (xParam)), (cellWidth) - (cellWidth / 2), 45, 0, Math.PI*2, true); 
			console.log("FOURTH");
		}
		ctx.stroke();
		ctx.closePath();
	}

}
 
// Getting mouse x,y coordinate on a click event relative to the canvas and the body
function getMouseLocation(e) {

	var sideBarWidth = $("#side_block").outerWidth();
	var headerBarWidth = $("#header").outerHeight();
	console.log("sideBarWidth = " + sideBarWidth + " header = " + headerBarWidth);
 
    var mouseX = e.pageX - canvas.offsetLeft - sideBarWidth;

    var mouseY = e.pageY - canvas.offsetTop - headerBarWidth;

    console.log("Canvas offset: " + canvas.offsetLeft + "," + canvas.offsetTop);
 
 	console.log("X coord: " + mouseX + " Y coord: " + mouseY);
    return { x: mouseX, y: mouseY };
}
 
// Get the pit corresponding to a mouse location
function getPitFromLocation(mCoordinate) {
    var pitCoordinate = { x: 0, y: 0 };
 
    if (mCoordinate.x < cellWidth) 
    {
    	pitCoordinate.x = 0;
    }
    else if (mCoordinate.x > cellWidth && mCoordinate.x < (cellWidth * 2)) 
    {
    	pitCoordinate.x = 1;
	}
    else if (mCoordinate.x > (cellWidth * 2) && mCoordinate.x < (cellWidth * 3)) 
	{
    	pitCoordinate.x = 2;
	}
	else if (mCoordinate.x > (cellWidth * 3) && mCoordinate.x < (cellWidth * 4)) 
	{
    	pitCoordinate.x = 3;
	}
	else if (mCoordinate.x > (cellWidth * 4) && mCoordinate.x < (cellWidth * 5)) 
	{
    	pitCoordinate.x = 4;
	}
	else if (mCoordinate.x > (cellWidth * 5) && mCoordinate.x < (cellWidth * 6)) 
	{
    	pitCoordinate.x = 5;
	}
	else if (mCoordinate.x > (cellWidth * 6) && mCoordinate.x < (cellWidth * 7)) 
	{
    	pitCoordinate.x = 6;
	}
	else if (mCoordinate.x > (cellWidth * 7) && mCoordinate.x < (cellWidth * 8)) 
	{
    	pitCoordinate.x = 7;
	}

if (mCoordinate.y < cellWidth) 
    {
    	pitCoordinate.y = 0;
    }
    else if (mCoordinate.y > cellWidth && mCoordinate.y < (cellWidth * 2)) 
    {
    	pitCoordinate.y = 1;
	}
    else if (mCoordinate.y > (cellWidth * 2) && mCoordinate.y < (cellWidth * 3)) 
	{
    	pitCoordinate.y = 2;
	}
	else if (mCoordinate.y > (cellWidth * 3) && mCoordinate.y < (cellWidth * 4)) 
	{
    	pitCoordinate.y = 3;
	}

 	console.log("Pit coord: " + pitCoordinate.x + "," + pitCoordinate.y);
    return pitCoordinate;
}

// gets the index of the pit
function processPitClick(pit)
{	
	var pit_i;
	var i;

	//get the starting pit
	if (currentPlayer === 1)
	{
		if (pit.y === 2)
		{

			//the starting pit on the front row is just the x coordinate of the pit
			pit_i = pit.x;
		}
		if (pit.y === 3)
		{

			pit_i = 15 - pit.x;
		}
	}
	else
	{
		if (pit.y === 0)
		{

			pit_i = 15 - pit.x;
		}
		if (pit.y === 1)
		{
			//the starting pit on the front row is just the x coordinate of the pit
			pit_i = pit.x;

		}
	}

	return pit_i;
}

//the game logic goes in here! makes moves that obey all rules, apart from the "you must steal if you can" rule
function makeMove(pit_i, dir)
{
	var endPitEmpty = false;
	var startPit;
	var endPit;
	var direction = dir;

	//get the pit from which to start, only take moves
	if (currentPlayer === 1)
	{
		console.log("Starting from player 1");
		startPit = player1Board[pit_i];
	}
	else
	{
			console.log("Starting from player 2");
		startPit = player2Board[pit_i];
	}

	//keep going until the move ends in an empty pit
	while (!endPitEmpty)
	{
		//first, check if the pit this part of the move ends on
		//is empty or not

		var endPitIndex;

		if (direction)
		{
			endPitIndex = ((pit_i + startPit.length)%16);
		}
		else
		{
			endPitIndex = ((pit_i - startPit.length)%16);
		}

		if (endPitIndex < 0)
		{
			endPitIndex = endPitIndex + 16;
		}

		if (currentPlayer === 1)
		{
			
			endPit = player1Board[endPitIndex];
		}
		else
		{
			endPit = player2Board[endPitIndex];
		}

		if (endPit.length === 0)
		{
			endPitEmpty = true;
		}

		//move the balls from the start pit into each of the next
		//pits, up to end pit
		while (startPit.length > 0)
		{
			if (direction)
			{
				pit_i++;
			}
			else
			{
				pit_i--;
			}

			if (direction)
			{
				if (pit_i === 16)
				{
					pit_i = 0;
				}
			}
			else
			{
				if (pit_i === -1)
				{
					pit_i = 15;
				}
			}			

			if (currentPlayer === 1)
			{
				player1Board[pit_i].push(startPit.pop());
			}
			else 
			{
				player2Board[pit_i].push(startPit.pop());	
			}

			drawBalls();
			
		}

		//only continue the move if the previous part of the move didn't end
		// in an empty pit
		if(!endPitEmpty)
		{
			//get the pit from which to continue
			if (currentPlayer === 1)
			{
				startPit = player1Board[pit_i];
			}
			else
			{
				startPit = player2Board[pit_i];
			}

			//steal from the other player if their pit wasn't empty
			if (pit_i < 8)
			{
				if (currentPlayer ===1) 
				{
					while (player2Board[pit_i].length > 0)
					{
						player1Board[pit_i].push(player2Board[pit_i].pop());
					}
				}
				else
				{
					while (player1Board[pit_i].length > 0)
					{
						player2Board[pit_i].push(player1Board[pit_i].pop());
					}
				}
			}
		}

	}

	checkForWinner();

	if (currentPlayer ===1)
	{
		currentPlayer = 2;
	}
	else
	{
		currentPlayer = 1;
		flag = false;
	}

	//reset values so that a new mouse click can be obtained
	firstPitChoice = undefined;
	secondPitChoice = undefined;
	startPitChosen = false;
	directionPitChosen = false;
}

function computerMove()
{
	//indicies for loops
	var i = 0;
	var j = 0;

	//temporary start direction and index
	var startDirection;
	var startIndex;

	//best start direction and index
	var bestStartDirection;
	var bestStartIndex;
	var mostBallsTaken = 0;

	if (currentPlayer === 2 && !flag)
	{
		flag = true;

		// for all pits in player2's board
		for (i = 0; i < 16; i++)
		{
			var pit_i = i;
			//can only start moves from pits which have at least 2 balls
			if (player2Board[i].length > 1)
			{
				//for both directions
				for (j = 0; j < 2; j++)
				{
					//copy the boards
					var tempPlayer1Board = jQuery.extend(true, {}, player1Board);
					var tempPlayer2Board = jQuery.extend(true, {}, player2Board);

					if (j === 0)
					{
						startDirection = false;
					}
					else
					{
						startDirection = true;
					}

					//variables needed for the move
					var startPit;
					var endPit;
					var endPitEmpty = false;

					//get the start pit
					startPit = tempPlayer2Board[i];

					while (!endPitEmpty)
					{
						//first, check if the pit this part of the move ends on
						//is empty or not
						var endPitIndex;

						if (startDirection)
						{
							endPitIndex = ((i + startPit.length)%16);
						}
						else
						{
							endPitIndex = ((i - startPit.length)%16);
						}

						if (endPitIndex < 0)
						{
							endPitIndex = endPitIndex + 16;
						}

						endPit = tempPlayer2Board[endPitIndex];
						
						if (endPit.length === 0)
						{
							endPitEmpty = true;
						}

						//move the balls from the start pit into each of the next
						//pits, up to end pit
						while (startPit.length > 0)
						{
							if (startDirection)
							{
								pit_i++;
							}
							else
							{
								pit_i--;
							}

							if (startDirection)
							{
								if (pit_i === 16)
								{
									pit_i = 0;
								}
							}
							else
							{
								if (pit_i === -1)
								{
									pit_i = 15;
								}
							}			

							tempPlayer2Board[pit_i].push(startPit.pop());	
							
							drawBalls();
						
						}

						//only continue the move if the previous part of the move didn't end
						// in an empty pit
						if(!endPitEmpty)
						{
							//get the pit from which to continue
							startPit = tempPlayer2Board[pit_i];
						}

						//steal from the other player if their pit wasn't empty
						if (pit_i < 8)
						{
							while (tempPlayer1Board[pit_i].length > 0)
							{
								tempPlayer2Board[pit_i].push(tempPlayer1Board[pit_i].pop());
							}
						}
							
					}

					var ballsThisMove = 0;

					for (var k = 0; k < 16; k++)
					{
						ballsThisMove = ballsThisMove + tempPlayer2Board[i].length;
					}

					if (ballsThisMove >= mostBallsTaken)
					{
						console.log("Got past the best move condition");
						mostBallsTaken = ballsThisMove;
						bestStartIndex = i;
						bestStartDirection = startDirection;
					}
				}
			}
		}

		console.log("Computer says, move from " + bestStartIndex + " " + bestStartDirection);
		makeMove(bestStartIndex, bestStartDirection);
	}
	
}

function checkPitIsFullEnough(pit_i)
{
	var isItFull = false;

	if (currentPlayer === 1 && player1Board[pit_i].length >= 2)
	{
		isItFull = true;
	}
	else if (currentPlayer === 2 && player2Board[pit_i].length >=2)
	{
		isItFull = true;
	}

	return isItFull;
}

//false is left, true is right
function directionChoice(pit_i, directionPit_i)
{
	var direction;

	console.log("I'm going from " + pit_i + " to " + directionPit_i);

	if (pit_i === 0 && directionPit_i === 15)
	{
		console.log("pit_i === 0 && directionPit_i === 15")
		direction = false;
	}
	else if (pit_i === 15 && directionPit_i === 0)
	{
		direction = true;
	}
	else
	{
		if (pit_i < directionPit_i)
		{
			direction = true;
		}
		else
		{
			console.log("pit_i < directionPit_i");
			direction = false;
		}
	}
	return direction;
}

function checkForWinner() 
{
	var i = 0;
	var frontRow1 = 0;
	var frontRow2 = 0;
	var player1AllSingles = true;
	var player2AllSingles = true;

	//add up the front rows and check if they're empty
	for (i = 0; i < 8; i++)
	{
		frontRow1 = frontRow1 + player1Board[i].length;
		frontRow2 = frontRow2 + player2Board[i].length;
	}

	//check that all the don't contain 1 or less balls
	for (i = 0; i < 16; i++)
	{
		if (player1Board[i].length > 1)
		{
			player1AllSingles = false;
		}

		if (player2Board[i].length > 1)
		{
			player2AllSingles = false;
		}
	}


	//if there is a win, print it to the console
	//we'll have to make this reset the game
	
	if (frontRow1 === 0 || player1AllSingles)
	{
		winMessage("Player2");
		initBoard();
	}
	else if (frontRow2 === 0 )
	{
		winMessage("Player1");
		initBoard();

	}
}

function winMessage(player){
	alert(player + " wins. Awesome!")
}

