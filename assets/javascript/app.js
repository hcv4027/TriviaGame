var currentQuestion; //Question that is occupying the screen when game starts
var correctAnswer; //The right answer counter
var incorrectAnswer;//The wrong answer counter
var unanswered;//The unanswered  question counter
var seconds; //The unit of time to measure each question
var time; //The amount of time alloted to answer each question
var answered; //Counter that tracks how many questions have been answered so far
var userSelect; //The player's answer choice selected during n game pl

/* The following is an array of trivia question objects, which consist of the question being asked, an array of possible answers, and the index of the corret answer from the array of answers. */
var triviaQuestions = [{
	question: "What is Peter Parker's alter ego?",
	answerList: ["A) Pied Piper", "B) The Amazing Spider-Man", "C) Peter Pumpkineater", "D) The Terminator"],
	answer: 1
},{
	question: "What does Superman's chest emblem stand for?",
	answerList: ["A) Justice", "B) Stupendous", "C) Superman", "D) Hope (In Kryptonese)"],
	answer: 3
},{
	question: "The Fantastic Four work out of what building in New York?",
	answerList: ["A) Trump Tower", "B) Madison Square Gardens", "C) Baxter Building", "D) Empire State Building"],
	answer: 2
},{
	question: "What is the name of the rope that Wonder Woman carries?",
	answerList: ["A) Lasso of Truth", "B) Rope of Hope", "C) Strength Lasso", "D)Capture Rope"],
	answer: 0
},{
	question: "In his first transformation, the Incredible Hulk was what color?",
	answerList: ["A) Green", "B) White", "C) Gray", "D) Blue"],
	answer: 2
},{
	question: "What is the name of the force that grants the Flash his speed?",
	answerList: ["A) Edge", "B) Speed Force", "C) Gravity", "D) Centrifugal Force"],
	answer: 1
},{
	question: "What is the name of the country that the Black Panther is king of?",
	answerList: ["A) T'challaLand", "B) Pantherville", "C) Wakanda", "D) South Africa"],
	answer: 2
},{
	question: "What is the name of the Bruce Wayne's company?",
	answerList: ["A) Batman, Inc.", "B) Bruce Industries", "C) Wayne Entertprises", "D) Cave Foundation"],
	answer: 2
},{
	question: "Iron Man originally created his armor to...?",
	answerList: ["A) Heal his heart", "B) Get rid of a cold", "C) Increase his strength", "D) To fly"],
	answer: 0
},{
	question: "What is the name of the planet where Green Lantern's ring comes from?",
	answerList: ["A) Mars", "B) Jupiter", "C) Andromeda", "D) Oa"],
	answer: 3
},{
	question: "What is ther name of Thor's hammer?",
	answerList: ["A) MC Hammer", "B) Ajax", "C) Mjolnir", "D) Black & Decker"],
	answer: 2
},{
	question: "Aquaman is the ruler of what underwater kingdom?",
	answerList: ["A) Bohemia", "B) Atlantis", "C) Marianis Trench", "D) Pacific Ocean"],
	answer: 1
},{
	question: "Deadpool's primary power is....?",
	answerList: ["A) Marksmanship", "B) Insensitivity", "C) Healing Factor", "D) Throwing his voice"],
	answer: 2
},{
	question: "What is the word Billy Batson uses to transform into a superhero?",
	answerList: ["A) Shazam!", "B) Elementary!", "C) Yessir!", "D) Caw"],
	answer: 0
},{
	question: "What are Wolverine's claws made of?",
	answerList: ["A) Steel", "B) Adamantium", "C) Vibranium", "D) Titanium"],
	answer: 1
}];

//The following array is used to display animated gifs of the screen for the subject of each question.
var gifArray = ['question001', //Spider-Man
				'question002', //Superman
				'question003', //Fantastic Four
				'question004', //Wonder Woman
				'question005', //Incredible Hulk
				'question006', //Flash
				'question007', //Black Panther
				'question008', //Batman
				'question009', //Iron Man
				'question010', //Green Lantern
				'question011', //Thor
				'question012', //Aquaman
				'question013', //Deadpool
				'question014', //Shazam
				'question015']; //Wolverine

				
//The message object sends a visible nessage to the player after they answer a question.
var messages = {
	correct: "YOU GOT IT RIGHT!",
	incorrect: "Awww, you missed this one. Try the next question!",
	endTime: "Oops!  Time ran out!",
	finished: "Game Completed! Here is your score:"
}

//This function hides the Game Start button after it has been clicked.
$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});

//This function allows the player to play the game again
$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});

//This function resets all variable values, and empties the text from the divs onscreen when the player chooses
// to play the trivia ame again.
function newGame(){
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

//This function resets the screen for each new question.
function newQuestion()
{
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();
	answered = true;
	
	//Sets up each new question and the question's associated list of answers.
	$('#currentQuestion').html('Question # '+(currentQuestion+1)+' of '+triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();

	//When the player chooses an answer the time will pause and setup the answerDisplay
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

//This function performs the countdown on each question
function countdown(){
	seconds = 20;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	//Ticks the timer down by the second
	time = setInterval(showCountdown, 1000);
}

//This function displays the time as it counts down, second-by-second
function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

//This function clears the question from the display, checks answers for correctness and adjusts the values of the
//results of the answers.
function answerPage()
{
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); 
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	$('#gif').html('<img src = "assets/images/'+ gifArray[currentQuestion] +'.gif" width = "300px">');
	
	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: <br/><strong>' + rightAnswerText+"</strong>");
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 5000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 5000);
	}	
}

//This function clears the screen of all previous text and displays the final score of this game pklay session.
function scoreboard()
{
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
};