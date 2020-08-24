let game_over;

let rows,columns,amount_of_box_wanted,treshold_wanted;
let column_number,row_number;
let amount_of_turns_played;
let actual_treshold = 0;
let player = "x";

function start_over() {
	if (confirm("This will delete the ongoing game, are you sure?")) {
		board()
	}
}

function board() {
	grid_html = document.getElementById("full_grid")
	for (var i = grid_html.getElementsByClassName("case").length - 1; i >= 0; i--) {
		remove_box = grid_html.getElementsByClassName("case")[i]
		remove_box.remove()
	}
	document.getElementById("full_grid").style.backgroundColor = "rgb(0, 0, 0,0.7)"
	game_over = false
	rows = Number(document.getElementById("rows_wanted").value)
    document.getElementById("full_grid").style.gridTemplateRows += "1fr 1fr 1fr"; // default is 3
	for (var i = 0; i < rows-3; i++) {
		//console.log("+1")
    	document.getElementById("full_grid").style.gridTemplateRows += " 1fr"; // add one for >3
    	//console.log(document.getElementById("full_grid").style.gridTemplateRows)
	}

	columns = Number(document.getElementById("columns_wanted").value)
    document.getElementById("full_grid").style.gridTemplateColumns += "1fr 1fr 1fr";
	for (var i = 0; i < columns-3; i++) {
		//console.log("+1")
    	document.getElementById("full_grid").style.gridTemplateColumns += " 1fr";
    	//console.log(document.getElementById("full_grid").style.gridTemplateColumns)
	}
	amount_of_box_wanted = columns*rows;
	amount_of_turns_played = 0;
	boxes = new Array(rows)
	for (var i = boxes.length - 1; i >= 0; i--) {
		boxes[i] = new Array(columns)
	}

	treshold_wanted = Number(document.getElementById("threshold_wanted").value)

	for (number = 1; number <= amount_of_box_wanted; number++) {
		let box_creation = document.createElement('div');
		let paragraph_creation = document.createElement('p')
		//console.log(paragraph_creation)
		box_creation.name = number
		box_creation.className = "case"
		box_creation.addEventListener("click", play)
		box_creation.innerText = ""
		// then add a DIV to the DOM
		document.getElementById("full_grid").appendChild(box_creation);
	}
}

function play(e) {
  let element_html = e.target
	if (game_over==true) {
		alert("The game is over, refresh to replay")
		return
	}
	//console.log(element_html)
	if ((element_html.innerText !== "")&&(element_html.innerText !== undefined)) {
		//console.log("Invalid data")
		//console.log(element_html)
		alert("This case is already used. Please pick a case that isn't used.")
	} else {
		number = element_html.name
		if (player == "x") {
			document.getElementById('whose_turn').innerText = "X is currently playing"
			player = "o";
		} else {
			document.getElementById('whose_turn').innerText = "O is currently playing"
			player = "x";
		}
		row_number = 0;
		column_number = number - 1;
		while (column_number >= columns) {
			column_number = column_number - columns;
			row_number = row_number + 1;
		}
		//console.log(row_number)
		//console.log(column_number)
		boxes[row_number][column_number] = player; // changing on the variables
		element_html.innerText = player // changing on the grid
		amount_of_turns_played++ // for tie check
	 }
	 //console.log(typeof(row_number),typeof(actual_treshold),typeof(row_number+actual_treshold))
	 if (win_conditions()==true) {
	 	//console.log("Game over")
		document.getElementById("full_grid").style.backgroundColor = "rgb(100, 0, 0,0.5)"
		document.getElementById('whose_turn').innerText = "The game is over!"
		game_over = true
	 }
}


function win_conditions() {
	//horizental
	for (row_number = 0; row_number <= boxes.length - 1; row_number++) { // for each row
		//console.log(boxes[row_number])
		for (column_number = 0; column_number <= boxes.length - 1; column_number++) { // for each box
			//console.log(boxes[row_number][column_number])
			actual_treshold = 0
			interrupted = false
			while ((treshold_wanted>actual_treshold)&&(interrupted==false)) { // we want to hit a certain treshold given
				if ((boxes[row_number][column_number]==boxes[row_number][column_number+actual_treshold])&&(boxes[row_number][column_number]!==undefined)) 
				{
					actual_treshold++
					//console.log("treshold is now = "+ actual_treshold)
				} else {
					interrupted = true
					//console.log("Treshold interrupted")
				}
			if ((interrupted==false)&&(treshold_wanted<=actual_treshold)) {
				alert("Player " + boxes[row_number][column_number] + " won")
				return true
				}
			}
		}
	}
	//diagonal from left to right
	for (row_number = 0; row_number <= boxes.length - 1; row_number++) { // for each row
		for (column_number = 0; column_number <= boxes.length - 1; column_number++) { // for each box
			//console.log(" ")
			//console.log("We are checking the box number "+ (row_number*columns+column_number))
			//console.log(boxes[row_number][column_number])
			actual_treshold = 0
			interrupted = false
			if ((boxes[row_number][column_number]==undefined)) {
					//console.log("This case is undefined")
				} else {
				while ((treshold_wanted>actual_treshold)&&(interrupted==false)&&boxes[row_number+actual_treshold]!==undefined) { 
					if ((boxes[row_number][column_number]==boxes[row_number+actual_treshold][column_number+actual_treshold])) // first time has to always be true, second time will be one to the right, then 2 to the right, etc
					{
						actual_treshold++
						//console.log("treshold is now = "+ actual_treshold)
					} else {
						interrupted = true
						//console.log("Treshold interrupted")
					}
				}
				if ((interrupted==false)&&(treshold_wanted<=actual_treshold)) {
				alert("Player " + boxes[row_number][column_number] + " won")
				return true
				}
			}
		}
	}
	//diagonal from right to left
	for (row_number = 0; row_number <= boxes.length - 1; row_number++) { // for each row
		for (column_number = 0; column_number <= boxes.length - 1; column_number++) { // for each box
			//console.log(" ")
			//console.log("We are checking the box number "+ (row_number*columns+column_number))
			//console.log(boxes[row_number][column_number])
			actual_treshold = 0
			interrupted = false
			if ((boxes[row_number][column_number]==undefined)) {
					//console.log("This case is undefined")
				} else {
				while ((treshold_wanted>actual_treshold)&&(interrupted==false)&&boxes[row_number+actual_treshold]!==undefined) { 
					if ((boxes[row_number][column_number]==boxes[row_number+actual_treshold][column_number-actual_treshold])) // first time has to always be true, second time will be one to the right, then 2 to the right, etc
					{
						actual_treshold++
						//console.log("treshold is now = "+ actual_treshold)
					} else {
						interrupted = true
						//console.log("Treshold interrupted")
					}
				}
				if ((interrupted==false)&&(treshold_wanted<=actual_treshold)) {
				alert("Player " + boxes[row_number][column_number] + " won")
				return true
				}
			}
		}
	}
	//vertical
	for (row_number = 0; row_number <= boxes.length - 1; row_number++) { // for each row
		for (column_number = 0; column_number <= boxes.length - 1; column_number++) { // for each box
			//console.log(" ")
			//console.log("We are checking the box number "+ (row_number*columns+column_number))
			//console.log(boxes[row_number][column_number])
			actual_treshold = 0
			interrupted = false
			if ((boxes[row_number][column_number]==undefined)) {
					//console.log("This case is undefined")
				} else {
				while ((treshold_wanted>actual_treshold)&&(interrupted==false)&&boxes[row_number+actual_treshold]!==undefined) { 
					if ((boxes[row_number][column_number]==boxes[row_number+actual_treshold][column_number])) // first time has to always be true, second time will be one to the right, then 2 to the right, etc
					{
						actual_treshold++
						//console.log("treshold is now = "+ actual_treshold)
					} else {
						interrupted = true
						//console.log("Treshold interrupted")
					}
				}
				if ((interrupted==false)&&(treshold_wanted<=actual_treshold)) {
				alert("Player " + boxes[row_number][column_number] + " won")
				return true
				}
			}
		}
	}
	// tie
	if (amount_of_box_wanted==amount_of_turns_played) {
		alert("It's a tie, all boxes are occupied but nobody won!")
		return true
	}
}

