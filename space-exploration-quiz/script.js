const questions = [
    {
        question: "What planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        answer: 1
    },
    {
        question: "Which planet is closest to the Sun?",
        options: ["Venus", "Earth", "Mercury", "Mars"],
        answer: 2
    },
    {
        question: "What is the largest planet in our solar system?",
        options: ["Earth", "Jupiter", "Saturn", "Neptune"],
        answer: 1
    },
    {
        question: "Which planet has the most moons?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        answer: 2
    },
    {
        question: "What is the name of our galaxy?",
        options: ["Andromeda", "Milky Way", "Sombrero", "Whirlpool"],
        answer: 1
    },
    {
        question: "Which planet is known for its rings?",
        options: ["Jupiter", "Saturn", "Uranus", "Neptune"],
        answer: 1
    },
    {
        question: "What is the hottest planet in our solar system?",
        options: ["Mercury", "Venus", "Mars", "Jupiter"],
        answer: 1
    },
    {
        question: "Which planet is known as the Earth's twin?",
        options: ["Mars", "Venus", "Mercury", "Saturn"],
        answer: 1
    },
    {
        question: "What is the name of the first human to travel into space?",
        options: ["Neil Armstrong", "Yuri Gagarin", "Buzz Aldrin", "John Glenn"],
        answer: 1
    },
    {
        question: "What is the term for a moon that is full of craters?",
        options: ["Cratery", "Lunar", "Asteroid", "Meteor"],
        answer: 1
    }
];

let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const progressBar = document.getElementById('progress-bar');
const scoreCounter = document.getElementById('score');
const resultScreen = document.getElementById('result-screen');
const resultMessage = document.getElementById('result-message');
const emojiReaction = document.getElementById('emoji-reaction');

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;
    optionsElement.innerHTML = '';
    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.innerText = option;
        button.classList.add('option-button');
        button.addEventListener('click', () => selectAnswer(index));
        optionsElement.appendChild(button);
    });
    updateProgressBar();
}

function selectAnswer(selectedIndex) {
    const correctIndex = questions[currentQuestionIndex].answer;
    if (selectedIndex === correctIndex) {
        score++;
        showFeedback(true);
    } else {
        showFeedback(false);
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

function showFeedback(isCorrect) {
    const feedbackElement = document.createElement('div');
    feedbackElement.classList.add('feedback');
    feedbackElement.innerText = isCorrect ? 'Correct!' : 'Wrong!';
    feedbackElement.style.color = isCorrect ? 'green' : 'red';
    document.body.appendChild(feedbackElement);
    if (!isCorrect) {
        feedbackElement.classList.add('shake');
    }
    setTimeout(() => {
        feedbackElement.remove();
    }, 1000);
}

function updateProgressBar() {
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBar.style.width = progress + '%';
}

function showResults() {
    questionElement.style.display = 'none';
    optionsElement.style.display = 'none';
    progressBar.style.display = 'none';
    scoreCounter.innerText = `Your score: ${score} out of ${questions.length}`;
    resultScreen.style.display = 'block';
    emojiReaction.innerText = score >= questions.length / 2 ? '🎉' : '😢';
}

loadQuestion();