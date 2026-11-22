
// ======================================
// QUIZNOVA - QUIZ APPLICATION
// ======================================


// HTML ELEMENTS

const startScreen = document.getElementById("start-screen");
const startBtn = document.getElementById("start-btn");

const quizSection = document.getElementById("quiz-section");
const quizForm = document.getElementById("quiz-form");

const timerDisplay = document.getElementById("timer");
const progressBar = document.getElementById("progress-bar");

const resultSection = document.getElementById("result");
const finalScore = document.getElementById("final-score");
const resultMessage = document.getElementById("result-message");
const resultDetails = document.getElementById("result-details");

const restartBtn = document.getElementById("restart-btn");


// QUIZ SETTINGS

const totalQuestions = 20;
const totalTime = 10 * 60;

let timeLeft = totalTime;
let timerInterval = null;

let quizStarted = false;
let quizSubmitted = false;


// CORRECT ANSWERS

const correctAnswers = {
    q1: "Mars",
    q2: "Albert Einstein",
    q3: "Pacific Ocean",
    q4: "Gold",
    q5: "Canberra",
    q6: "Carbon dioxide",
    q7: "Seven",
    q8: "Blue Whale",
    q9: "China",
    q10: "Diamond",
    q11: "Heart",
    q12: "2",
    q13: "HTML",
    q14: "Turkey",
    q15: "H2O",
    q16: "Leonardo da Vinci",
    q17: "Cheetah",
    q18: "Central Processing Unit",
    q19: "Sahara Desert",
    q20: "1971"
};


// ======================================
// START QUIZ
// ======================================

startBtn.addEventListener("click", function () {

    if (quizStarted) return;

    quizStarted = true;

    startScreen.style.display = "none";
    quizSection.style.display = "block";

    startTimer();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


// ======================================
// START TIMER
// ======================================

function startTimer() {

    updateTimer();

    timerInterval = setInterval(function () {

        timeLeft--;

        updateTimer();

        if (timeLeft <= 0) {

            clearInterval(timerInterval);

            submitQuiz(true);

        }

    }, 1000);

}


// ======================================
// UPDATE TIMER
// ======================================

function updateTimer() {

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");

    timerDisplay.textContent =
        `${formattedMinutes}:${formattedSeconds}`;

    const progress = (timeLeft / totalTime) * 100;

    progressBar.style.width = `${progress}%`;

    if (timeLeft <= 60) {

        timerDisplay.style.color = "#EF4444";
        progressBar.style.background = "#EF4444";

    }

}


// ======================================
// SUBMIT QUIZ
// ======================================

quizForm.addEventListener("submit", function (event) {

    event.preventDefault();

    submitQuiz(false);

});


function submitQuiz(autoSubmitted) {

    if (!quizStarted || quizSubmitted) return;

    quizSubmitted = true;

    clearInterval(timerInterval);

    let correct = 0;
    let wrong = 0;
    let unanswered = 0;


    // CHECK ANSWERS

    for (let question in correctAnswers) {

        const selectedAnswer = quizForm.querySelector(
            `input[name="${question}"]:checked`
        );

        if (selectedAnswer === null) {

            unanswered++;

        } else if (selectedAnswer.value === correctAnswers[question]) {

            correct++;

        } else {

            wrong++;

        }

    }


    // CALCULATE RESULT

    const percentage = Math.round(
        (correct / totalQuestions) * 100
    );


    // SHOW RESULT

    quizSection.style.display = "none";
    resultSection.style.display = "block";

    finalScore.textContent = `${correct}/${totalQuestions}`;


    // RESULT MESSAGE

    if (percentage >= 80) {

        resultMessage.textContent = "Excellent! Outstanding performance!";

    } else if (percentage >= 60) {

        resultMessage.textContent = "Great job! Keep improving!";

    } else if (percentage >= 40) {

        resultMessage.textContent = "Good effort! Practice makes perfect.";

    } else {

        resultMessage.textContent = "Keep learning! You can do better.";

    }


    // RESULT DETAILS

    resultDetails.innerHTML = `
        <div>
            <span>Correct Answers</span>
            <strong>${correct}</strong>
        </div>

        <div>
            <span>Wrong Answers</span>
            <strong>${wrong}</strong>
        </div>

        <div>
            <span>Unanswered</span>
            <strong>${unanswered}</strong>
        </div>

        <div>
            <span>Percentage</span>
            <strong>${percentage}%</strong>
        </div>
    `;


    // AUTO SUBMIT MESSAGE

    if (autoSubmitted) {

        resultMessage.textContent =
            "Time is up! Here is your final result.";

    }


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// ======================================
// RESTART QUIZ
// ======================================

restartBtn.addEventListener("click", function () {

    clearInterval(timerInterval);

    // Reset form
    quizForm.reset();

    // Reset timer
    timeLeft = totalTime;

    // Reset quiz status
    quizStarted = false;
    quizSubmitted = false;

    // Reset timer appearance
    timerDisplay.style.color = "#0D9488";
    progressBar.style.background = "#0D9488";

    updateTimer();

    // Hide result and quiz
    resultSection.style.display = "none";
    quizSection.style.display = "none";

    // Show start screen
    startScreen.style.display = "block";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});
