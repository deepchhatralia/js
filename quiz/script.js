const questions = [{
        id: 1,
        question: "What is the full form of CSS",
        answer: 0,
        options: ["Cascading Style Sheets", "Computer Style Sheets", "Creative Style Sheets", "None of these"]
    },
    {
        id: 2,
        question: "Where in an HTML document is the correct place to refer to an external style sheet?",
        answer: 2,
        options: ["div", "body", "head", "header"]
    },
    {
        id: 3,
        question: "Which HTML tag is used to define an internal style sheet?",
        answer: 1,
        options: ["script", "style", "link", "css"]
    },
    {
        id: 4,
        question: "Which HTML attribute is used to define inline styles?",
        answer: 3,
        options: ["class", "id", "styles", "style"]
    },
    {
        id: 5,
        question: "Which is the correct CSS syntax?",
        answer: 0,
        options: ["body{color:red;}", "{body:color:red}", "body{color:red}", "body color red"]
    }
    // ,{
    //     id: 6,
    //     question: "Which HTML attribute is used to define inline styles?",
    //     answer: 3,
    //     options: ["class", "id", "styles", "style"]
    // },
    // {
    //     id: 7,
    //     question: "Which HTML attribute is used to define inline styles?",
    //     answer: 3,
    //     options: ["class", "id", "styles", "style"]
    // },
    // {
    //     id: 8,
    //     question: "Which HTML attribute is used to define inline styles?",
    //     answer: 3,
    //     options: ["class", "id", "styles", "style"]
    // },
    // {
    //     id: 9,
    //     question: "Which HTML attribute is used to define inline styles?",
    //     answer: 3,
    //     options: ["class", "id", "styles", "style"]
    // },
    // {
    //     id: 10,
    //     question: "Which HTML attribute is used to define inline styles?",
    //     answer: 3,
    //     options: ["class", "id", "styles", "style"]
    // }
]


const mainContainer = document.getElementById('container')
const quizQuestion = document.querySelector('.question h5')
const quizOption = document.querySelectorAll('.quiz-option')
const questionNumber = document.getElementById('question-number')
const minuteBox = document.querySelector('.box1 h5')
const secondsBox = document.querySelector('.box2 h5')
const allOptions = document.querySelectorAll('.option-container .col-md-12')

const modalContainer = document.querySelector('.modal-container')
const modal = document.querySelector('.my-modal')

const startBtn = document.getElementById('start-btn')
const nextBtn = document.querySelector('.next-btn')

var count = 0
var myInterval
const marksOfOneQuestion = 5
let score = 0
let second = 1
let minutes = 0


function loadQuestions() {
    quizQuestion.innerHTML = 'Q. ' + questions[count].question
    questionNumber.innerHTML = `Question ${count + 1}`

    for (let i = 0; i < quizOption.length; i++) {
        quizOption[i].innerHTML = questions[count].options[i]
        allOptions[i].style.backgroundColor = '#fff'
    }

    for (let i = 0; i < allOptions.length; i++) {
        allOptions[i].addEventListener('click', () => {
            allOptions[i].style.backgroundColor = '#dfe6e9'
            for (let j = 0; j < allOptions.length; j++) {
                if (i !== j) {
                    allOptions[j].style.backgroundColor = '#fff'
                }
            }
        })
    }
}

function startTimer() {
    secondsBox.innerHTML = second < 10 ? `0${second}` : second
    minuteBox.innerHTML = minutes < 10 ? `0${minutes}` : minutes
    if (second == 59) {
        minutes += 1
        second = 00
    } else second += 1
}

startBtn.addEventListener('click', () => {
    modalContainer.style.display = 'none'
    loadQuestions()
    myInterval = setInterval(startTimer, 1000);
})

nextBtn.addEventListener('click', () => {
    for (let i = 0; i < allOptions.length; i++) {
        if (allOptions[i].style.backgroundColor === 'rgb(223, 230, 233)') {
            if (i === questions[count].answer) {
                score += 5
            }
            if (nextBtn.innerHTML === 'Finish') {
                clearInterval(myInterval)
                mainContainer.classList.add('d-flex', 'align-items-center', 'justify-content-center', 'flex-column')
                mainContainer.innerHTML = `
                <div>
                    <h3>You scored <b>${score}</b> out of <b>${questions.length * marksOfOneQuestion}</b> in ${minutes > 0 ? minutes + ' minutes and ': ''} ${second} seconds</h3>
                </div>
                <div class="mt-3 mb-2">
                    <button class="restart-btn">Restart</button>
                </div>
                `
                const restartBtn = document.querySelector('.restart-btn')

                restartBtn.addEventListener('click', () => {
                    window.location.reload()
                })
                break
            }
            count += 1
            if (count === questions.length - 1) {
                nextBtn.innerHTML = 'Finish'
            }
            loadQuestions()
            break
        }
    }
})