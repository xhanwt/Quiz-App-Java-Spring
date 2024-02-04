const questions = [
    {
        question: "1. What does CSS stand for in web development?",
        options: ["Cascading Style Sheets", "Computer Style Sheets", "Creative Style Sheets", "Colorful Style Sheets"],
        correctAnswer: "Cascading Style Sheets"
    },
    {
        question: "2. In JavaScript, what is a closure?",
        options: ["A special syntax for function declarations", "A way to create private variables", "An HTML element", "A type of loop"],
        correctAnswer: "A way to create private variables"
    },
    {
        question: "3. What is the purpose of the 'this' keyword in JavaScript?",
        options: ["Refers to the current file", "Refers to the parent function", "Refers to the current object or context", "Refers to a specific HTML element"],
        correctAnswer: "Refers to the current object or context"
    },
    {
        question: "4. Which sorting algorithm has an average and worst-case time complexity of O(n log n)?",
        options: ["Bubble Sort", "Quick Sort", "Insertion Sort", "Selection Sort"],
        correctAnswer: "Quick Sort"
    },
    {
        question: "5. What is the purpose of the 'git clone' command in Git?",
        options: ["To create a new branch", "To delete a repository", "To copy a repository from a remote source", "To merge branches"],
        correctAnswer: "To copy a repository from a remote source"
    },
    {
        question: "6. Which of the following is NOT a primitive data type in JavaScript?",
        options: ["String", "Boolean", "Object", "Number"],
        correctAnswer: "Object"
    },
    {
        question: "7. What does API stand for?",
        options: ["Application Programming Interface", "Advanced Programming Interface", "Automated Programming Interface", "Application Processing Interface"],
        correctAnswer: "Application Programming Interface"
    },
    {
        question: "8. In Python, what does the 'self' keyword refer to in a class method?",
        options: ["The class itself", "A reference to the current object", "A reserved keyword", "A built-in module"],
        correctAnswer: "A reference to the current object"
    },
    {
        question: "9. What is the purpose of the 'npm' command in Node.js?",
        options: ["Node Package Manager", "New Project Manager", "Node Project Module", "Node Package Module"],
        correctAnswer: "Node Package Manager"
    },
    {
        question: "10. What is the difference between 'let' and 'const' in JavaScript?",
        options: ["'let' is used for constants, and 'const' is used for variables", "'let' is block-scoped, and 'const' is function-scoped", "'let' allows reassignment, and 'const' does not", "'let' is used for numbers, and 'const' is used for strings"],
        correctAnswer: "'let' allows reassignment, and 'const' does not"
    }
];



let currentQuestionIndex = 0;
let userAnswers = []; // Save user answers as an array

// Initialize the quiz
function initQuiz() {
    showQuestion();
}

// Start the quiz
function startQuiz() {
    document.getElementById("intro-container").classList.add("hidden"); // remove intro section

    // add quiz sections
    document.getElementById("quiz-container").classList.remove("hidden");
    document.getElementById("navigation-container").classList.remove("hidden");
    document.getElementById("progress-container").classList.remove("hidden"); 
    initQuiz();
}

// Function to display the current question and options
function showQuestion() {
    const quizContainer = document.getElementById("quiz-container");
    const progressContainer = document.getElementById("progress-container");
    const nextButton = document.getElementById("next-btn"); 
    const prevButton = document.getElementById("prev-btn");
   
    const question = questions[currentQuestionIndex];

    let optionsHtml = "";
    for (let i = 0; i < question.options.length; i++) {

        // Multiple Choice
        optionsHtml += `<label>
                            <input type="radio" name="answer" value="${question.options[i]}">
                            ${question.options[i]}
                        </label><br>`;

    }

    quizContainer.innerHTML = `<h3>${question.question}</h3>${optionsHtml}`;


    restoreUserAnswers();
    updateProgressBar();

    // Check if it's the last question and hide the "Next" button
    if (currentQuestionIndex === questions.length - 1) {
        nextButton.style.display = "none";
    } else {
        nextButton.style.display = "inline"; 
    }

    // Check if it's the first question and hide the "Previous" button
    if (currentQuestionIndex === 0) {
        prevButton.style.display = "none";
    } else {
        prevButton.style.display = "inline"; 
    }
}

// Update progress bar
function updateProgressBar() {
    const progressContainer = document.getElementById("progress-container");

    const totalQuestions = questions.length;


    progressContainer.innerHTML = `<p>${currentQuestionIndex + 1} / ${totalQuestions}</p>`;

}

// Next question button
function nextQuestion() {
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');

    if (selectedAnswer) {
        userAnswers[currentQuestionIndex] = selectedAnswer.value;
        currentQuestionIndex++;

        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            showResults();
        }
    } else {
        alert("Please select an answer before moving to the next question.");
    }
}

// Previous question button
function prevQuestion() {

    const selectedAnswer = document.querySelector('input[name="answer"]:checked');

    if (selectedAnswer) {
        userAnswers[currentQuestionIndex] = selectedAnswer.value;
    }



    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion();
    } else {
        alert("This is the very first question.");
    }
}

// Function to restore user answers when navigating back to previous questions
function restoreUserAnswers() {
    const selectedAnswer = userAnswers[currentQuestionIndex];
    if (selectedAnswer) {
        const radioInput = document.querySelector(`input[name="answer"][value="${selectedAnswer}"]`);
        if (radioInput) {
            radioInput.checked = true;
        }
    }
}

// Submission
function submitQuiz() {
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');

    if (selectedAnswer && currentQuestionIndex + 1 === questions.length) {
        userAnswers[currentQuestionIndex] = selectedAnswer.value;
        showResults();
    } else {
        alert("Please answer all questions before submitting the quiz.");
    }
}

// Function to display quiz results
function showResults() {
    const resultsContainer = document.getElementById("results-container");
    const resultScoreElement = document.getElementById("user-score");
    const resultList = document.getElementById("result-list");

    let correctAnswersCount = 0;

    for (let i = 0; i < questions.length; i++) {
        const correctAnswer = questions[i].correctAnswer;
        const userAnswer = userAnswers[i];

        const listItem = document.createElement("li");

        // Check if the user's answer is correct
        const isCorrect = userAnswer === correctAnswer;

        // Apply CSS classes based on correctness
        listItem.classList.add(isCorrect ? "correct-answer" : "incorrect-answer");

        listItem.innerHTML = `<strong>Q${questions[i].question} </strong>
                              <br> Your Answer: ${userAnswer || 'Not answered'}
                              <br> Correct Answer: ${correctAnswer}`;
        resultList.appendChild(listItem);

        if (isCorrect) {
            correctAnswersCount++;
        }
    }

    resultScoreElement.textContent = correctAnswersCount + " / " + questions.length;
    resultsContainer.classList.remove("hidden");
    document.getElementById("quiz-container").classList.add("hidden");
    document.getElementById("navigation-container").classList.add("hidden");
    document.getElementById("progress-container").classList.add("hidden"); // hide progress bar
}


// Restart quiz function
function restartQuiz() {
    currentQuestionIndex = 0;
    userAnswers = [];
    document.getElementById("results-container").classList.add("hidden");
    document.getElementById("quiz-container").classList.remove("hidden");
    document.getElementById("navigation-container").classList.remove("hidden");
    document.getElementById("progress-container").classList.remove("hidden"); 
    document.getElementById("result-list").innerHTML = ""; // Clear result list
    initQuiz();
}

// Initialize the quiz onload
window.onload = initQuiz;
