// JavaScript Document
// Yup
function question(question,a,b,c,d,correctAnswer)
{
this.question = question;
this.a = a;
this.b = b;
this.c = c;
this.d = d;
this.correctAnswer = correctAnswer;
}

question.prototype.toString = function questionToString()
{
	var stringToReturn = "<table border = \"1\" class = \"centerThisShit\"> <tr> <th>" + this.question + "</th> </tr>";
		stringToReturn += "<tr><td id = \"answerA\" class = \"standard\" "  +
								"onmouseover = \"this.className = 'highlighted'\" " +
								"onmouseout = \"this.className = 'standard'\" " +
								"onclick = \"checkAnswer('a')\">" + this.a + "</td> </tr>";
		stringToReturn += "<tr><td id = \"answerB\" class = \"standard\" "  +
								"onmouseover = \"this.className = 'highlighted'\" " +
								"onmouseout = \"this.className = 'standard'\" " +
								"onclick = \"checkAnswer('b')\">" + this.b + "</td> </tr>";
		stringToReturn += "<tr><td id = \"answerC\" class = \"standard\" "  +
								"onmouseover = \"this.className = 'highlighted'\" " +
								"onmouseout = \"this.className = 'standard'\" " +
								"onclick = \"checkAnswer('c')\">" + this.c + "</td> </tr>";
		stringToReturn += "<tr><td id = \"answerD\" class = \"standard\" "  +
								"onmouseover = \"this.className = 'highlighted'\" " +
								"onmouseout = \"this.className = 'standard'\" " +
								"onclick = \"checkAnswer('d')\">" + this.d + "</td> </tr>";
	
	stringToReturn += "</table>";
	return stringToReturn;
}

var yourHealth = 100;
var enemyHealth = 100;

var goodGuyRestSrc = "leftguyresting.png";
var goodGuyAttackSrc = "leftguyattack.png";

var badGuyRestSrc = "rightguyresting.png";
var badGuyAttackSrc = "rightguyattack.png";

var startingTime = 10;
var currentTime = 10;
var timerOn = false;

var currentChain = 0;
var tempChain = 0;

var badChain = 0;
var badTempChain = 0;

var questionList = new Array();
var currentQuestionIndex = 0;
var maxQuestionIndex = 4;


questionList[0] = new question("Who is a ninja?", "Landon", "Josh", "KT", "All of the above", 'd');
questionList[1] = new question("Who is green?", "Landon", "Josh", "George", "All of the above", 'a');
questionList[2] = new question("Who is blue?", "Landon", "Josh", "Steve", "All of the above", 'b');
questionList[3] = new question("Best day?", "Fri", "Sat", "Sun", "Mon", 'b');
questionList[4] = new question("What is a towel?", "Teleporting Device", "Something you dry yourself with", 
									"Ultimate weapon", "Too many things to count", 'd');
function beginChain()
{
	hideActionBar();
	startingTime = 10;
	currentTime = 10;
	
	
	startCountDown();
	startChain();
}

function startChain()
{
	document.getElementById("middleBox").innerHTML = "" + questionList[currentQuestionIndex];
}

function continueChain()
{
	currentChain ++;
	document.getElementById("chainNumber").innerHTML = currentChain;
	currentTime += 10 - currentChain;
	if(currentQuestionIndex === maxQuestionIndex){
		currentQuestionIndex = 0;
	}
	else{
		currentQuestionIndex ++;
	}
	document.getElementById("middleBox").innerHTML = "" + questionList[currentQuestionIndex];
}

function endChain(endingReason)
{
	
	timerOn = false;
	document.getElementById("middleBox").innerHTML = "";
	currentTime = 0;
	
	if(currentQuestionIndex === maxQuestionIndex){
		currentQuestionIndex = 0;
	}
	else{
		currentQuestionIndex ++;
	}
	
	document.getElementById("countdownNumber").innerHTML = currentTime;
	var damageDone = calculateDamage("good", currentChain);
	
	document.getElementById("middleBox").innerHTML = "<p> Time is up! </p>"
												+ "<p> You performed a " + currentChain
												+ " chain attack for " + damageDone + " damage!</p>";
	performGoodAttack();
	
	var newEnemyHealth = enemyHealth - damageDone;
	if(newEnemyHealth <= 0){
		document.getElementById("badGuyHealthNumber").innerHTML = "0";
		enemyHealth = 0;
		setTimeout("alert(\"You win!\")",2000 + currentChain * 700);
	}
	else{
		document.getElementById("badGuyHealthNumber").innerHTML = newEnemyHealth;
		enemyHealth = newEnemyHealth;
	}
	
	setTimeout("performBadAttack()", 2000 + currentChain * 750 );
	currentChain = 0;
	document.getElementById("chainNumber").innerHTML = currentChain;
}

function calculateDamage(attacker,chain)
{
	return chain * 5;
}

function checkAnswer(answer)
{
	if(answer === questionList[currentQuestionIndex].correctAnswer){
		continueChain();
	}
	else{
		endChain("wrongAnswer");
	}
}

function startCountDown()
{
	document.getElementById("countdownNumber").innerHTML = startingTime;
	timerOn = true;
	continueCountDown();
}

function continueCountDown()
{
	if(currentTime > 0)
	{
		document.getElementById("countdownNumber").innerHTML = currentTime;
		currentTime--;
		setTimeout("continueCountDown()",1000);
	}
	else
	{
		if(timerOn){
			document.getElementById("countdownNumber").innerHTML = currentTime;
			endChain("timeUp");
		}
	}
}

function showActionBar()
{
	var htmlToInsert = "<img src=\"bar_01.png\" width=\"73\" height=\"42\" alt=\"Attack\" onclick = \"beginChain()\" " +
							"onmouseover = \"this.src = 'bargreen_01.png'\" " +
							"onmouseout = \"this.src = 'bar_01.png'\"/> " +
						  "<img src=\"bargrey_02.png\" width=\"73\" height=\"42\" alt=\"Magic\" /> " +
						  "<img src=\"bargrey_03.png\" width=\"74\" height=\"42\" alt=\"Special\" /> " +
						  "<img src=\"bargrey_04.png\" width=\"72\" height=\"42\" alt=\"Items\" /> "; 
	document.getElementById("actionbar").innerHTML = htmlToInsert;
}

function hideActionBar()
{
	document.getElementById("actionbar").innerHTML = "";
}

function performGoodAttack()
{
	tempChain = currentChain;
	setTimeout("changeGoodGuyToAttack()", 700);
}

function changeGoodGuyToAttack()
{
	document.getElementById("leftguypic").src = "leftguyattack.png";
	setTimeout("changeGoodGuyToResting()",170);
}

function changeGoodGuyToResting()
{
	document.getElementById("leftguypic").src = "leftguyresting.png";
	tempChain--;
	if(tempChain > 0){
		setTimeout("changeGoodGuyToAttack()",550);
	}
}

function performBadAttack()
{
	document.getElementById("middleBox").innerHTML = "";
	
	badChain = Math.floor(Math.random()*11) + Math.floor(Math.random()*3);
	badTempChain = badChain;
	
	var damageDone = calculateDamage("bad", badChain);
	
	document.getElementById("middleBox").innerHTML = "<p> Bad guy attacks! </p>"
												+ "<p> He performs a " + badChain
												+ " chain attack for " + damageDone + " damage!</p>";
	
	changeBadGuyToAttack();
	
	var newYourHealth = yourHealth - damageDone;
	if(newYourHealth <= 0){
		document.getElementById("yourHealthNumber").innerHTML = "0";
		yourHealth = 0;
		setTimeout("alert(\"You are destroyed!\")",2000 + badChain * 700);
	}
	else{
		document.getElementById("yourHealthNumber").innerHTML = newYourHealth;
		yourHealth = newYourHealth;
	}
	
	showActionBar();
	// setTimeout("performBadAttack()", 2000 + currentChain * 750 );
	// currentChain = 0;
	// document.getElementById("chainNumber").innerHTML = currentChain;


}

function changeBadGuyToAttack()
{
	document.getElementById("rightguypic").src = "rightguyattack.png";
	setTimeout("changeBadGuyToResting()",170);
}

function changeBadGuyToResting()
{
	document.getElementById("rightguypic").src = "rightguyresting.png";
	badTempChain--;
	if(badTempChain > 0){
		setTimeout("changeBadGuyToAttack()",550);
	}
}


//function endGame(var youWon)
//{

//}

//function resetGame()
//{

//}









