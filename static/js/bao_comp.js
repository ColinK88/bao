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
var firstPitChoice; 
var secondPitChoice;
var startPitChosen = false;
var directionPitChosen = false;
var pit_index;

var flag = false;

window.onload = function () 
{
	// console.log("Got into the js.")

    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    canvas.width = width;
    canvas.height = height;

    // When mouse click events are recievedm onCanvasClick will be called
    canvas.onclick = onCanvasClick;

    // Draw game board when the window loads
    // drawGameBoard();
    initBoard();

    setInterval(computerMove, 5000);

    // setTimeout(timeoutCheck, 10000);



    // drawPlayerMoves();
};

function timeoutCheck()
{
	console.log("setTimeout");
}

function drawGameBoard() 
{
	var i = 0;

	//This makes the background colour for the board
	ctx.beginPath();    
    //ctx.rect(0, 0, 0, 0);
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

function initBoard()
{
	currentPlayer = 1;
	flag = false;
	firstPitChoice = undefined;
	secondPitChoice = undefined;
	startPitChosen = false;
	directionPitChosen = false;

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

	// console.log(player1Board);
	// console.log(player2Board);
}

//just have this draw how many balls are in each position 
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
		// ctx.fillText("" + i,cellMiddleHeight + (cellHeight * i),(cellWidth * 3) - (cellWidth / 2));
		var pit = ctx.arc(cellMiddleHeight + (cellHeight * i), (cellWidth * 3) - (cellWidth / 2), 40, 0, Math.PI*2, true); 
		ctx.closePath();
		ctx.fill();
		//ctx.fillStyle = "black"; // font color to write the text with
		//ctx.fillText("" + frontBalls,cellMiddleHeight + (cellHeight * i),(cellWidth * 3) - (cellWidth / 2));

		for (j = 0; j < frontBalls; j++){

			if (j <= 6){ //Looping creating balls
			ctx.fillStyle = "black"; // balls colour
			ctx.beginPath();
			ctx.arc(cellMiddleHeight + (cellHeight * i - coordsX[j]),(cellWidth * 3) - (cellWidth / 2 - coordsY[j]),7,0,2*Math.PI),true;
			ctx.closePath();
			ctx.fill();
			ctx.closePath();
			}

			if (j < 300 ){ //this loop prints out now all the numbers, it will be modified only to print larger numbers later
				ctx.beginPath();
				ctx.fillStyle = "#1947D1"; //"#0099FF"; //inside of text colour
				//tx.strokeStyle = "black";
				ctx.textAlign="center"; 
				ctx.fillText("" + frontBalls,cellMiddleHeight + (cellHeight * i),(cellWidth * 3) - (cellWidth / 2));
				//ctx.strokeText("" + frontBalls,cellMiddleHeight + (cellHeight * i),(cellWidth * 3) - (cellWidth / 2));
				//ctx.stroke();
				ctx.fill ();
				ctx.closePath();
			}
	
		}
		
		//ctx.stroke();
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
		
		// ctx.fillText("" + (23 - i),cellMiddleHeight + (cellHeight * (i- 8)),(cellWidth * 4) - (cellWidth / 2));
		//ctx.fillText("" + backBalls,cellMiddleHeight + (cellHeight * (i- 8)),(cellWidth * 4) - (cellWidth / 2));

			for (j = 0; j < backBalls; j++){

			if (j <= 6){ //Looping creating balls
			ctx.fillStyle = "black"; // balls colour
			ctx.beginPath();
			ctx.arc(cellMiddleHeight + (cellHeight * (i-8) - coordsX[j]),(cellWidth * 4) - (cellWidth / 2 - coordsY[j]),7,0,2*Math.PI),true;
			ctx.closePath();
			ctx.fill();
			ctx.closePath();
			}

			if (j < 300 ){ //this loop prints out now all the numbers, it will be modified only to print larger numbers later
				ctx.beginPath();
				ctx.fillStyle = "#1947D1";//"#0099FF"; //inside of text colour
				//ctx.strokeStyle = "black";
				ctx.textAlign="center"; 
				ctx.fillText("" + backBalls,cellMiddleHeight + (cellHeight * (i- 8)),(cellWidth * 4) - (cellWidth / 2));
				//ctx.strokeText("" + backBalls,cellMiddleHeight + (cellHeight * (i- 8)),(cellWidth * 4) - (cellWidth / 2));
				//ctx.stroke();
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
		
		// ctx.fillText("" + i,cellMiddleHeight + (cellHeight * i),(cellWidth * 2) - (cellWidth / 2));
		//ctx.fillText("" + frontBalls,cellMiddleHeight + (cellHeight * i),(cellWidth * 2) - (cellWidth / 2));
	

		for (j = 0; j < frontBalls; j++){

			if (j <= 6){ //Looping creating balls
			ctx.fillStyle = "black"; 
			ctx.beginPath();
			ctx.arc(cellMiddleHeight + (cellHeight * i - coordsX[j]),(cellWidth * 2) - (cellWidth / 2 - coordsY[j]),7,0,2*Math.PI),true;
			ctx.closePath();
			ctx.fill();
		}
			//ctx.closePath();

			if (j < 500){ //this loop prints out now all the numbers, it will be modified only to print larger numbers later
				ctx.fillStyle = "#FF3399"; 
				//ctx.beginPath();
				ctx.fillText("" + frontBalls,cellMiddleHeight + (cellHeight * i),(cellWidth * 2) - (cellWidth / 2));
				//ctx.closePath();
				//console.log("HAPPENED");
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

		// ctx.fillText("" + (23 - i),cellMiddleHeight + (cellHeight * (i- 8)),(cellWidth) - (cellWidth / 2));
		//ctx.fillText("" + backBalls,cellMiddleHeight + (cellHeight * (i- 8)),(cellWidth) - (cellWidth / 2));

			for (j = 0; j < backBalls; j++){

			if (j <= 6){	//Looping creating balls
			ctx.fillStyle = "black"; 
			ctx.beginPath();
			ctx.arc(cellMiddleHeight + (cellHeight * (i-8) - coordsX[j]),(cellWidth) - (cellWidth / 2 - coordsY[j]),7,0,2*Math.PI),true;
			ctx.closePath();
			ctx.fill();
		}
			//ctx.closePath();

			if (j < 500){ //this loop prints out now all the numbers, it will be modified only to print larger numbers later
				ctx.fillStyle = "#FF3399"; 
				//ctx.beginPath();
				ctx.fillText("" + backBalls,cellMiddleHeight + (cellHeight * (i- 8)),(cellWidth) - (cellWidth / 2));
				//ctx.closePath();
				//console.log("HAPPENED");
			}

		}

	}
}

//SARA YOUR CODE FOR TURNING COLOURS ON SHOULD BE CALLED FROM THIS FUNCTION, BUT PROBABLY DO THE WORK IN HELPER FUNCTIONS.
//DON'T MANIPULATE MY INSTANCE VARIABLES... BAD THINGS HAPPEN WHEN YOU DO THAT!	
function onCanvasClick(e) {
	//get the coordinate of the mouse click on the canvas

	// var player1Wins = prompt("Should player1 win");

	// //if this is left on and anyone finds it annoying, just pressing enter each time acts like it isn't there
	// if (player1Wins === "y")
	// {
	// 	//Colin, just make your code happen in here... if we put the same code in the win condition it'll work fine.
	// 	//I know that if finds winners when it should, so its safe to test here and then run it with your code in the 
	// 	//actual win condition place...
	// 	console.log("player1Wins = y");
	// }
	// else
	// {
    var mCoordinate = getMouseLocation(e);
    console.log("Mouse coord is " + mCoordinate.x + "," + mCoordinate.y);

    //if the player has not yet chosen a starting pit
    if (!startPitChosen)
    {
    	// console.log("Got into the !startPitChosen bit")

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
    	   		// console.log("Start pit has been chosen");
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
    		//startPitColour(startPitChosen, firstPitChoice.x, firstPitChoice.y);
    		console.log("that was the same pit");
    		drawGameBoard(); //This is done in order to delete the circle that shows what pit has been as the first pit //SARA
    		drawBalls();
    	
	    	
    	}
    	else // if the second choice is different to the first, set directionPitChosen to true
    	{
    		// console.log("Direction pit has been chosen")
    		directionPitChosen = true;
    	}
    }

    

    //only process moves from the current player 
    if (pit_index !== undefined && directionPitChosen) // && !startPitChosen && (secondPitChoice !== firstPitChoice))	
    {
    	//get the index of second choice pit
    	var directionIndex = processPitClick(secondPitChoice);
    	// console.log("Inputing pit_index " + pit_index + " and direction index " + directionIndex);
    	//get if we should go left or right
    	var direction = directionChoice(pit_index, directionIndex);
    	// console.log("Got in the move bit");
    	//make a move
    	makeMove(pit_index, direction);
        // console.log(pit_index);	
    }
    else
    {
    	console.log("I'm not making a move! " + pit_index);
    	// firstPitChoice = undefined;
    	// startPitChosen = undefined;
    }
    // console.log(pit_index);
	// }
}

//This function changes the startPitColour based on whether it's selected
function startPitColour(booleanParam, xParam, yParam){					
	var cellMiddleHeight = cellHeight /2;
	if (booleanParam == true){
		ctx.beginPath();
		//ctx.strokeStyle="green";
		ctx.lineWidth = 7;
		//ctx.arc(20, 20, 45, 0, Math.PI*2, true); 
		if (xParam < 8 && yParam == 2){ //first player, front row
			ctx.arc(cellMiddleHeight + (cellHeight * xParam), (cellWidth * 3) - (cellWidth / 2), 45, 0, Math.PI*2, true);  
			//ctx.rect(cellMiddleHeight + (cellHeight * xParam), (cellWidth * 3) - (cellWidth / 2), 50, 150);
			console.log("FIRST");
		}
		if (xParam < 8 && yParam == 3){ //first player, back row
			//ctx.arc(cellMiddleHeight + (cellHeight * (xParam- 8)), (cellWidth * 4) - (cellWidth / 2), 45, 0, Math.PI*2, true); 
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
		//ctx.fill();
		ctx.stroke();
		ctx.closePath();
	}

}
 
// Getting mouse x,y coordinate on a click event relative to the canvas
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
	//lazily change the player when testing
	// currentPlayer = 1;

	var pit_i;
	var i;

	//get the starting pit
	if (currentPlayer === 1)
	{
		if (pit.y === 2)
		{
			// console.log("We're on the front row for player1");

			//the starting pit on the front row is just the x coordinate of the pit
			pit_i = pit.x;
		}
		if (pit.y === 3)
		{
			// console.log("We're on the back row for player1");

			//
			pit_i = 15 - pit.x;
		}
	}
	else
	{
		if (pit.y === 0)
		{
			// console.log("We're on the back row for player2");

			pit_i = 15 - pit.x;
		}
		if (pit.y === 1)
		{
			// console.log("We're on the front row for player2");

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

	// if (direction)
	// {
	// 	console.log("Let's go right and dir = " + dir);
	// }
	// else
	// {
	// 	console.log("Let's go left and dir = " + dir);
	// }
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

			// var stop = prompt("Stop");
			drawBalls();
			// setTimeout(drawBalls, 1000);
			
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
						// setTimeout(drawBalls(), 1500);
					}
				}
				else
				{
					while (player1Board[pit_i].length > 0)
					{
						player2Board[pit_i].push(player1Board[pit_i].pop());
						// setTimeout(drawBalls(), 1500);
					}
				}
			}
		}

		// for (i = pit_i + 1; i = pit_ i + startPit.length; i++)
		// {
		// 	if (i === 16)
		// 	{
		// 		i = 0;
		// 	}

		// 	if (currentPlayer === 1)
		// 	{
		// 		player1Board[i]
		// 	}
		// }
		
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

//this needs refactored!!
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
		console.log("PLAYER 2");

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
							console.log("Set end pit to empty")
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
							

							// var stop = prompt("Stop");
							drawBalls();
							// setTimeout(drawBalls, 1000);
							
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
								// setTimeout(drawBalls(), 1500);
							}
						}
							
					}

						// for (i = pit_i + 1; i = pit_ i + startPit.length; i++)
						// {
						// 	if (i === 16)
						// 	{
						// 		i = 0;
						// 	}

						// 	if (currentPlayer === 1)
						// 	{
						// 		player1Board[i]
						// 	}
						// }
						
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
	//SARA we could display a big message?s
	if (frontRow1 === 0 || player1AllSingles)
	{
		console.log("player2 wins!");
		winMessage("Player2");
	}
	else if (frontRow2 === 0 )
	{
		console.log("player1 wins!");
		winMessage("Player1");

	}
}

function winMessage(player){
	ctx.beginPath(); 
	ctx.font="50px Verdana";
	ctx.fillStyle="orange";
	ctx.StrokeStyle="black";
	var message = player + " wins. AWESOME!" 
	ctx.textAlign="center"; 
	ctx.strokeText(message, 200, 200);
	ctx.stroke();
	ctx.fill();
	ctx.closePath();

}


/*

have the function that takes the pit coordinate do the checking if the pit is the same.
This will let clicks on the other player's half be easily discounted.

Have pits with 1 or fewer balls be disallowed for a first pit pick.

Not this, have a check direction function that returns a boolean!

Have the move function take a tuple, (first pit, second pit)
If first pit < second pit, go one direction
If first pit > second pit, go the other direction
Special case if 0 and 15

The computer's moves will just try each direction for every pit that has 2 or more
copy the arrays so we don't ruin things

Implement the "steal if you can move" by checking if the end pit in this direction is 0-7 and faces a full pit.
*/

