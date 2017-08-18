//current word
var currentString = "";

// game score
var sum = 0;

// for knowing legal moves
var prevcube;

//Current boggle dice letter for the current game
var boggle_curr = new Array();

//Store the index of the current word
var curr_word = new Array();
var curr_index;
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

var grid = new Array(cube0, cube1, cube2, cube3, cube4, cube5, cube6, cube7, cube8, cube9, cube10, cube11, cube12, cube13, cube14, cube15, cube16, cube17, cube18, cube19, cube20, cube21, cube22, cube23, cube24);

// returns a random letter from the cube
function chooseLetter(cube){
	 return cube[Math.floor((Math.random()*6))];
}

// returns a random ordering of cubes in the grid, using the Knuth Shuffle from:
// http://www.htmlblog.us/random-javascript-array
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


// randomizes board and resets
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
  console.log(boggle_curr);
}

// build the word
function buildWord(event){
	var cube = event.target;
  curr_index = Number(cube.id.slice(4));
  prev_index = curr_word[curr_word.length-1];
  console.log("The current word array:", curr_word);
  console.log("The current index is:",curr_index);
  console.log("The prev index is:",prev_index);

  if(curr_word.length == 0){
    cube.style.backgroundColor = "#ACCEEC";
    prev_index = Number(cube.id.slice(4));
    curr_word.push(prev_index);
    currentString = currentString.concat(cube.textContent);
    console.log("I am in the first check");
    console.log("The current word array:", curr_word);
    console.log("The current string is:",currentString);
    document.getElementById("boggleword").textContent = currentString;
    return;
  }
  else if(curr_index == prev_index){
    cube.style.backgroundColor = "white";
    if(curr_word.length>2){
      console.log("I am in the second a check");
      prev_index = curr_word[curr_word.length-2];
    }
    curr_word.pop();
    currentString = currentString.slice(0,-1);
    console.log("I am in the second b check");
    console.log("The current word array:", curr_word);
    console.log("The current string is:",currentString);
    document.getElementById("boggleword").textContent = currentString;
    return;
  }

  for (var x = 0; x<curr_word.length; x++){
    if(curr_word[x] == curr_index){
      console.log("I am in the third check");
      console.log("The current string is:",currentString);
      document.getElementById("boggleword").textContent = currentString;
      return;
    }
  }


  if( curr_index == prev_index - 6 || curr_index == prev_index - 5 || curr_index == prev_index - 4 || curr_index == prev_index - 1 || curr_index == prev_index + 1 || curr_index == prev_index + 4 || curr_index == prev_index + 5 || curr_index == prev_index + 6){
    if (cube.style.backgroundColor != "#ACCEEC"){
  		cube.style.backgroundColor = "#ACCEEC";
      prev_index = Number(cube.id.slice(4));
      curr_word.push(prev_index);
  		currentString = currentString.concat(cube.textContent);
      console.log("I am in the fourth check");
      console.log("The current word array:", curr_word);
      console.log("The current string is:",currentString);
      document.getElementById("boggleword").textContent = currentString;
      return;
  	}
  }
}



function submitWord(event){
	if (mousedown == 1){
		// if the word is long enough, add it to the word list
		if (currentString.length >= 3){
			boggleWords.push(currentString);
			var wl = document.getElementById("wordList");
			updateList(boggleWords, wl);
		}
		clearBoard();
	}
}

function clearBoard(){
	var grid = document.getElementById("boggleGrid");
	var cubes = grid.getElementsByTagName("div");
	for (var i=0; i<cubes.length; i++)
	{
     	if (cubes[i].style.backgroundColor != "white"){
     		cubes[i].style.backgroundColor = "white";
     	}
	}
	currentString = "";
	mousedown = 0;
	return;
}

// reset array of played words and clear displayed table of words
function clearlist(){
	boggleWords.length = 0; //empty word list
	var wl = document.getElementById("wordList");
	while (document.getElementById("wordList").hasChildNodes()){
		document.getElementById("wordList").removeChild(document.getElementById("wordList").firstChild);
	}
}

shuffleBoggleGrid();
