const questions = [
  {
    question: 'What is the name the operation that assigns a value to a variable?',
    choices: ['=', '==', '===', ':='],
    correctAnswer: '='
  },
  {
    question: 'What is the name of the method that converts a string to an array of characters?',
    choices: ['split()', 'join()', 'slice()', 'splice()'],
    correctAnswer: 'split()'
  },
  {
    question: 'What is the name of the keyword that declares a block-scoped variable?',
    choices: ['var', 'let', 'const', 'val'],
    correctAnswer: 'let'
  },
  {
    question: 'what is name of the dta type that represents a true or false value?',
    choices: ['Boolean', 'binary', 'bit', 'logic'],
    correctAnswer: 'Boolean'
  },
  {
    question: 'What is the name of the operator that preforms a logical AND operation?',
    choices: ['&', '&&', 'and', '$='],
    correctAnswer: '&&'
  },
  
  // Add more questions here
];
// creating a variable to connect needed html elements 
const quizContainer = document.getElementById('quizContainer');
const startButton = document.getElementById('startButton');
const nextButton = document.getElementById('nextButton');
const questionElement = document.getElementById('question');
const choicesElement = document.getElementById('choices');
const resultContainer = document.getElementById('result');
const scoreElement = document.getElementById('score');
const initialsInput = document.getElementById('initials');
const saveScoreButton = document.getElementById('saveScore');
const highScoresList = document.getElementById('highScoresList');
const highScoresContainer = document.getElementById('highScores');
const clearScoresButton = document.getElementById('clearScores');
const quizTitle = document.getElementById('quizTitle');


let currentQuestionIndex = 0;
let timer;
let score = 0;
//adding a click evet and a function to the needed elements 
startButton.addEventListener('click', startQuiz);
nextButton.addEventListener('click', showNextQuestion);
saveScoreButton.addEventListener('click', saveScore);
clearScoresButton.addEventListener('click', clearScores);

function startQuiz() {
  startButton.classList.add('hidden');
  quizContainer.classList.remove('hidden');
  timer = setInterval(updateTimer, 1000);
  showNextQuestion();

}

function showNextQuestion() {
  resetQuizState();
  if (currentQuestionIndex < questions.length) {
    const question = questions[currentQuestionIndex];
    questionElement.innerText = question.question;

    question.choices.forEach((choice, index) => {
      const choiceItem = document.createElement('li');
      choiceItem.innerText = `${index + 1}. ${choice}`;
      choicesElement.appendChild(choiceItem);

      choiceItem.addEventListener('click', () => {
        if (choice === question.correctAnswer) {
          score++;
        } else {
          // minus time for incorrect answer
          clearInterval(timer);
          timer = setInterval(updateTimer, 1000);
        }

        currentQuestionIndex++;
        showNextQuestion();
      });
    });
  } else {
    endQuiz();
  }
}

function resetQuizState() {
  while (choicesElement.firstChild) {
    choicesElement.removeChild(choicesElement.firstChild);
  }
}
//updates the countdown timer and stops when user is done or time runs out
function updateTimer() {
  const timerElement = document.getElementById('timer');
  const timeLeft = parseInt(timerElement.textContent);
  if (timeLeft > 0) {
    timerElement.textContent = timeLeft - 1; // Corrected line
  } else {
    endQuiz();
  }
}

function endQuiz() {
  clearInterval(timer);
  quizContainer.classList.add('hidden');
  resultContainer.classList.remove('hidden');
  scoreElement.innerText = score;
}

function saveScore() {
  const initials = initialsInput.value;
  if (initials && score > 0) {
    const scoreItem = document.createElement('li');
    scoreItem.innerText = `${initials}: ${score}`;
    highScoresList.appendChild(scoreItem);
    highScoresContainer.classList.remove('hidden');
  }
}
//
function clearScores() {
  while (highScoresList.firstChild) {
    highScoresList.removeChild(highScoresList.firstChild);
  }
  highScoresContainer.classList.add('hidden');
  length; -8
}
//allows the title to take user back to lading page
quizTitle.addEventListener('click', () => {
  window.location.href = 'html.html';
});