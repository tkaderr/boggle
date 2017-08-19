// array of played words
var boggleWords = new Array();

//current word
var currentString = "";

// game score
var sum_score = 0;

// for knowing legal moves
var prevcube;

//Current boggle dice letters for the current game grid
var boggle_curr = new Array();

//Store the indices of the current word being built
var curr_word = new Array();

//Store the index of the current letter
var curr_index;

//Store the index of the prev letter
var prev_index;

//boggle dice setup
var cube0 = new Array('A', 'A', 'A', 'F', 'R', 'S');
var cube1 = new Array('A', 'A', 'E', 'E', 'E', 'E');
var cube2 = new Array('A', 'A', 'F', 'I', 'R', 'S');
var cube3 = new Array('A', 'D', 'E', 'N', 'N', 'N');
var cube4 = new Array('A', 'E', 'E', 'E', 'E', 'M');
var cube5 = new Array('A', 'E', 'E', 'G', 'M', 'U');
var cube6 = new Array('A', 'E', 'G', 'M', 'N', 'N');
var cube7 = new Array('A', 'F', 'I', 'R', 'S', 'Y');
var cube8 = new Array('A', 'E', 'G', 'M', 'N', 'N');
var cube9 = new Array('B', 'J', 'K', 'Q', 'X', 'Z');
var cube10 = new Array('C', 'C', 'E', 'N', 'S', 'T');
var cube11 = new Array('C', 'E', 'I', 'I', 'L', 'T');
var cube12 = new Array('C', 'E', 'I', 'L', 'P', 'T');
var cube13 = new Array('C', 'E', 'I', 'P', 'S', 'T');
var cube14 = new Array('D', 'D', 'H', 'N', 'O', 'T');
var cube15 = new Array('D', 'H', 'H', 'L', 'O', 'R');
var cube16 = new Array('D', 'H', 'L', 'N', 'O', 'R');
var cube17 = new Array('E', 'I', 'I', 'I', 'T', 'T');
var cube18 = new Array('E', 'M', 'O', 'T', 'T', 'T');
var cube19 = new Array('E', 'N', 'S', 'S', 'S', 'U');
var cube20 = new Array('F', 'I', 'P', 'R', 'S', 'Y');
var cube21 = new Array('G', 'O', 'R', 'R', 'V', 'W');
var cube22 = new Array('I', 'P', 'R', 'R', 'R', 'Y');
var cube23 = new Array('N', 'O', 'O', 'T', 'U', 'W');
var cube24 = new Array('O', 'O', 'O', 'T', 'T', 'U');

//the grid
var grid = new Array(cube0, cube1, cube2, cube3, cube4, cube5, cube6, cube7, cube8, cube9, cube10, cube11, cube12, cube13, cube14, cube15, cube16, cube17, cube18, cube19, cube20, cube21, cube22, cube23, cube24);

// returns a random letter from the cube
function chooseLetter(cube){
	 return cube[Math.floor((Math.random()*6))];
}

// Randomize the cubes position on the grid and return new grid
Array.prototype.randomize = function(){
	var i = this.length;
	var j;
	var temp;
	while (--i)
	{
		j = Math.floor( Math.random() * (i - 1));
		temp = this[i];
		this[i] = this[j];
		this[j] = temp;
	}
}


// randomizes and initialize the board
function shuffleBoggleGrid(){
  grid.randomize();
	var stringOfI;
	for (var i = 0; i < grid.length; i++){
		stringOfI = "cube"+i.toString();
		var letter = chooseLetter(grid[i]);
		if (letter == 'Q'){letter = "Qu";}
    boggle_curr.push(letter);
		document.getElementById(stringOfI).textContent = letter;
	}
  var data = "<tr class='table_header'><th>Word</th><th>Score</th></tr><tr class= 'total_row'><td>Total:</td><td>"+sum_score+"</td></tr>";
  document.getElementById("word_list").innerHTML = data;
}

// build the word function
function buildWord(event){
	var cube = event.target;
  curr_index = Number(cube.id.slice(4));
  prev_index = curr_word[curr_word.length-1];

//If there are no letters chosen- brand new string
  if(curr_word.length == 0){
    cube.style.backgroundColor = "#ACCEEC";
    prev_index = Number(cube.id.slice(4));
    curr_word.push(prev_index);
    currentString = currentString.concat(cube.textContent);
    document.getElementById("boggleword").textContent = currentString.toUpperCase();
    return;
  }
  //If the same letter is chosen
  else if(curr_index == prev_index){
    cube.style.backgroundColor = "white";
    if(curr_word.length>2){
      prev_index = curr_word[curr_word.length-2];
    }
    if(boggle_curr[curr_word[curr_word.length-1]] == "Qu" ){
      currentString = currentString.slice(0,-2);
    }
    else{
      currentString = currentString.slice(0,-1);
    }
    curr_word.pop();
    document.getElementById("boggleword").textContent = currentString.toUpperCase();
    return;
  }
//avoid selecting the same letter twice
  for (var x = 0; x<curr_word.length; x++){
    if(curr_word[x] == curr_index){
      document.getElementById("boggleword").textContent = currentString.toUpperCase();
      return;
    }
  }

//Checking to see if the next letter selected is a valid selection based on relative index position
  if( curr_index == prev_index - 6 || curr_index == prev_index - 5 || curr_index == prev_index - 4 || curr_index == prev_index - 1 || curr_index == prev_index + 1 || curr_index == prev_index + 4 || curr_index == prev_index + 5 || curr_index == prev_index + 6){
    if (cube.style.backgroundColor != "#ACCEEC"){
  		cube.style.backgroundColor = "#ACCEEC";
      prev_index = Number(cube.id.slice(4));
      curr_word.push(prev_index);
  		currentString = currentString.concat(cube.textContent);
      document.getElementById("boggleword").textContent = currentString.toUpperCase();
      return;
  	}
  }
}

//Checks to see if the word is already submitted
function checklist(boggleWords, currentString){
  for (var i = 0; i<boggleWords.length; i++){
    if (boggleWords[i][0] == currentString){
      return true;
    }
  }
  return false;
}

//Once the submit button is clicked
//There are checks to see if the word is already picked, how big the word is, etc.
function submitWord(event){
    currentString = currentString.toLowerCase();
    var curr_len= currentString.length;
    if(curr_len == 0) {
      return;
    }
    var score=0;
    var check = checklist(boggleWords, currentString);
    if(check == true){
      return;
    }
    else if (check == false){
      var curr_arr = [];
      curr_arr.push(currentString);

      if(curr_len <= 2){
        score = 0;
      }
      else if(curr_len <= 4 ){
        score = 1;
      }
      else if(curr_len == 5){
        score = 2;
      }
      else if(curr_len == 6){
        score = 3;
      }
      else if(curr_len == 7){
        score = 5;
      }
      else if(curr_len >=8 ){
        score = 11;
      }
      sum_score += score;
      curr_arr.push(score);
    }
    boggleWords.push(curr_arr);
    data = "<tr class='table_header'><th>Word</th><th>Score</th></tr>";
    //creating the string to insert at the respective DOM element
    for (var y = 0; y < boggleWords.length; y++){
        data += "<tr class= 'word_list'><td>"+ boggleWords[y][0] +"</td><td>"+ boggleWords[y][1] +"</td></tr>";
    }
    data += "<tr class= 'total_row'><td>Total:</td><td>"+sum_score+"</td></tr>"
    document.getElementById("word_list").innerHTML = data;
    clearBoard();
}

//Clears the background color and resets the board
function clearBoard(){
	var grid = document.getElementById("boggle_grid");
	var cubes = grid.getElementsByTagName("div");
	for (var i=0; i<cubes.length; i++)
	{
     	if (cubes[i].style.backgroundColor != "white"){
     		cubes[i].style.backgroundColor = "white";
     	}
	}
	currentString = "";
  document.getElementById("boggleword").textContent = currentString;
	curr_word =[];
  prev_index = -1;
  curr_index = -1;
	return;
}

//Instantiate the boggle board
shuffleBoggleGrid();
