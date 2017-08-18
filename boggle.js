//current word
var currentString = "";

// game score
var sum = 0;

// for knowing legal moves
var prevcube;

//boggle dice setup
var cube1 = new Array('A', 'A', 'A', 'F', 'R', 'S');
var cube2 = new Array('A', 'A', 'E', 'E', 'E', 'E');
var cube3 = new Array('A', 'A', 'F', 'I', 'R', 'S');
var cube4 = new Array('A', 'D', 'E', 'N', 'N', 'N');
var cube5 = new Array('A', 'E', 'E', 'E', 'E', 'M');
var cube6 = new Array('A', 'E', 'E', 'G', 'M', 'U');
var cube7 = new Array('A', 'E', 'G', 'M', 'N', 'N');
var cube8 = new Array('A', 'F', 'I', 'R', 'S', 'Y');
var cube9 = new Array('A', 'E', 'G', 'M', 'N', 'N');
var cube10 = new Array('B', 'J', 'K', 'Q', 'X', 'Z');
var cube11 = new Array('C', 'C', 'E', 'N', 'S', 'T');
var cube12 = new Array('C', 'E', 'I', 'I', 'L', 'T');
var cube13 = new Array('C', 'E', 'I', 'L', 'P', 'T');
var cube14 = new Array('C', 'E', 'I', 'P', 'S', 'T');
var cube15 = new Array('D', 'D', 'H', 'N', 'O', 'T');
var cube16 = new Array('D', 'H', 'H', 'L', 'O', 'R');
var cube17 = new Array('D', 'H', 'L', 'N', 'O', 'R');
var cube18 = new Array('E', 'I', 'I', 'I', 'T', 'T');
var cube19 = new Array('E', 'M', 'O', 'T', 'T', 'T');
var cube20 = new Array('E', 'N', 'S', 'S', 'S', 'U');
var cube21 = new Array('F', 'I', 'P', 'R', 'S', 'Y');
var cube22 = new Array('G', 'O', 'R', 'R', 'V', 'W');
var cube23 = new Array('I', 'P', 'R', 'R', 'R', 'Y');
var cube24 = new Array('N', 'O', 'O', 'T', 'U', 'W');
var cube25 = new Array('O', 'O', 'O', 'T', 'T', 'U');

var grid = new Array(cube1, cube2, cube3, cube4, cube5, cube6, cube7, cube8, cube9, cube10, cube11, cube12, cube13, cube14, cube15, cube16, cube17, cube18, cube19, cube20, cube21, cube22, cube23, cube24, cube25);

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
	for (var i = 1; i < grid.length+1; i++){
		stringOfI = "cube"+i.toString();
		var letter = chooseLetter(grid[i-1]);
		if (letter == 'Q'){letter = "Qu";}
		document.getElementById(stringOfI).textContent = letter;
	}
}

// called when mouse press over unactivated cube --> start of a word
function buildWord(event){
	var cube = event.target;
	if (cube.style.backgroundColor != "#ACCEEC"){
		cube.style.backgroundColor = "#ACCEEC";
		currentString = currentString.concat(cube.textContent);
		console.log(currentString);
		prevcube = Number(cube.id.substr(4, cube.id.length-1));
		if (mousedown == 0){mousedown++;}
	}
}

// while in the process of building a word
function buildingWord(event){
	if (mousedown == 1){
		var cube = event.target;
		if (cube.style.backgroundColor != "orange"){
			var currentcube = Number(cube.id.substr(4, cube.id.length-1));
			//if next cube touched is not immediately by last cube, don't do anything
			if (currentcube < prevcube-5 || currentcube > prevcube+5 ||
				currentcube == prevcube-2 || currentcube == prevcube+2 ||
				(prevcube%4 == 0 && currentcube == prevcube-3)||
				((prevcube-1)%4 == 0 && currentcube == prevcube+3)){
				return;
			}
			cube.style.backgroundColor = "orange";
			currentString = currentString.concat(cube.textContent);
			prevcube = currentcube;
			console.log(currentString);
		if (mousedown == 0){mousedown=1;}
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
