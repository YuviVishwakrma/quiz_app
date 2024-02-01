//References
let timeLeft = document.querySelector(".time-left");  // Get element with class "time-left"
let quizContainer = document.getElementById("container");  // Get element with ID "container"
let nextBtn = document.getElementById("next-button");  // Get element with ID "next-button"
let countOfQuestion = document.querySelector(".ques");  // Get element with class "ques"
let displayContainer = document.getElementById("display-container");  // Get element with ID "display-container"
let scoreContainer = document.querySelector(".score-container");  // Get element with class "score-container"
let restart = document.getElementById("restart");  // Get element with ID "restart"
let userScore = document.getElementById("user-score");  // Get element with ID "user-score"
let startScreen = document.querySelector(".first");  // Get element with class "first"
let startButton = document.getElementById("start-button");  // Get element with ID "start-button"
let questionCount;  // Variable to store question count
let scoreCount = 0;  // Variable to store user's score, initially set to 0
let count = 11;  // Variable with an initial value of 11
let countdown;  // Variable for handling countdown

//Questions and Options array

const questionArray = [   //"Create a constant variable name questionArray which is an array and will hold a list of questions."
    {
        id: "0",
        question: "[5]is a scalar matrix of order?",
        options: ["1", "2", "0", "5"],                         //set all the questions.
        correct: "1",
    },
    {
        id: "1",
        question: "What is the correct spelling?",
        options: ["Weird","Wierd","Weard","Weerd"],
        correct: "Weird",
    },
    {
        id: "2",
        question: "What is the correct spelling?",
        options: ["Definitely", "Defenitely", "Definetely", "Definitly"],
        correct: "Definitely",
    },
    {
        id: "3",
        question: "What is the correct spelling?",
        options: ["A client", "A host", "A router", "A web server"],
        correct: "A client",
    },
    {
        id: "4",
        question: " Which is the fastest memory?",
        options: [" Hard disk", " Main memory", "Cache memory", "Blue-Ray dist"],
        correct: "Cache memory",
    },
    {
        id: "5",
        question: "HTML stands for -",
        options: ["HighText Machine Language", "HyperText and links Markup Language", "HyperText Markup Language", "None of these"],
        correct: "HyperText Markup Language",
    }, {
        id: "6",
        question: "Which of the following is sadi to be the brain of a computer?",
        options: ["Input devices", "Output devices", "Memory device", "Microprocessor"],
        correct: "Microprocessor",
    },
    {
        id: "7",
        question: "Which of the following is not the part of a microprocessor unit?",
        options: ["ALU", "Control unit", " Cache memory", "None of the above"],
        correct: "Cache memory",
    },
    {
        id: "8",
        question: "What are the types of unordered or bulleted list in HTML?",
        options: ["disc, square, triangle", "polygon, triangle, circle", "disc, circle, square", "All of the above"],
        correct: "disc, circle, square",
    },
    {
        id: "9",
        question: " Display devices are connected to the computer through.",
        options: [" USB port", " Ps/2 port", "SCSI port", "VGA connector"],
        correct: "VGA connector",
    },
];



restart.addEventListener("click", () => {       //when click on restart adding a eventlistener...
    initial();                                  // call a initial function
    displayContainer.classList.remove("hide");  // for visible a displaycontainer
    scoreContainer.classList.add("hide");       // for invisible a scorecontainer
});


let userName;    // declare a username variable
    document.getElementById("go-button").addEventListener("click", () => {  //when click on go button add eventlistener
    userName = document.getElementById("username").value;
    if (userName.trim() !== "") {
        document.querySelector(".user-input").classList.add("hide");
        startScreen.classList.add("hide");
        displayContainer.classList.remove("hide");
        initial();
    } else {
        alert("Please enter your name before starting the test.");
    }
});

//Next Button
nextBtn.addEventListener(
    "click",
    (displayNext = () => {
        //increment questionCount
        questionCount += 1;
        //if last question
        if (questionCount == questionArray.length) {
            //hide question container and display score
            displayContainer.classList.add("hide");
            scoreContainer.classList.remove("hide");
            //user score
            userScore.innerHTML =
                "Your score is " + scoreCount + " out of " + questionCount;
        } else {
            //display questionCount
            countOfQuestion.innerHTML =
                questionCount + 1 + " of " + questionArray.length + " Question";
            //display quiz
            quizDisplay(questionCount);
            count = 11;
            clearInterval(countdown);
            timerDisplay();
        }
    })
);

//Timer
const timerDisplay = () => {
    countdown = setInterval(() => {
        count--;
        timeLeft.innerHTML = `${count}s`;
        if (count == 0) {
            clearInterval(countdown);
            displayNext();
        }
    }, 1000);
};

//Display quiz
const quizDisplay = (questionCount) => {
    let quizCards = document.querySelectorAll(".container-mid");
    //Hide other cards
    quizCards.forEach((card) => {
        card.classList.add("hide");
    });
    //display current question card
    quizCards[questionCount].classList.remove("hide");
};

//Quiz Creation
function quizCreator() {
    //randomly sort questions
    questionArray.sort(() => Math.random() - 0.5);
    //generate quiz
    for (let i of questionArray) {
        //randomly sort options
        i.options.sort(() => Math.random() - 0.5);
        //quiz card creation
        let div = document.createElement("div");
        div.classList.add("container-mid", "hide");
        
        //question number
        countOfQuestion.innerHTML = 1 + " of " + questionArray.length + " Question";
        //question
        let question_DIV = document.createElement("p");
        question_DIV.classList.add("question");
        question_DIV.innerHTML = i.question;
        div.appendChild(question_DIV);
        //options
        div.innerHTML += `<button class="option-div" onclick="checker(this)">${i.options[0]}</button>
     <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
       <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
`;
        quizContainer.appendChild(div);
    }
}

//Checker Function to check if option is correct or not
function checker(userOption) {
    let userSolution = userOption.innerText;
    let question =
        document.getElementsByClassName("container-mid")[questionCount];
    let options = question.querySelectorAll(".option-div");

    //if user clicked answer == correct option stored in object
    if (userSolution === questionArray[questionCount].correct) {
        userOption.classList.add("correct");
        scoreCount++;
    } else {
        userOption.classList.add("incorrect");
        //For marking the correct option
        options.forEach((element) => {
            if (element.innerText == questionArray[questionCount].correct) {
                element.classList.add("correct");
            }
        });
    }

    //clear interval(stop timer)
    clearInterval(countdown);
    //disable all options
    options.forEach((element) => {
        element.disabled = true;
    });
}

//initial setup
function initial() {
    quizContainer.innerHTML = "";
    questionCount = 0;
    scoreCount = 0;
    count = 11;
    clearInterval(countdown);
    timerDisplay();
    quizCreator();
    quizDisplay(questionCount);
}

//when user click on start button
startButton.addEventListener("click", () => {
    startScreen.classList.add("hide");
    displayContainer.classList.remove("hide");
    initial();
});

//hide quiz and display start screen
window.onload = () => {
    startScreen.classList.remove("hide");
    displayContainer.classList.add("hide");
};

let submitBtn = document.getElementById("submit-button");

submitBtn.addEventListener("click", submitQuiz);

function submitQuiz() {
    // For example, you can display the user's final score immediately
    displayContainer.classList.add("hide");
    scoreContainer.classList.remove("hide");
    userScore.innerHTML = "Your score is " + scoreCount + " out of " + questionCount;
}




