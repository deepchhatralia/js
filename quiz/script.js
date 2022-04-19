let questions = [];

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
let minutes = 0;


async function loadApiQuestion(howManyQuestion, difficulty) {
    var x = await fetch("https://opentdb.com/api.php?amount=" + howManyQuestion + "&category=18&difficulty=" + difficulty + "&type=multiple");
    x = await x.json();
    questions = [...x.results];
    loadQuestions();
    myInterval = setInterval(startTimer, 1000);
}

function loadQuestions() {
    quizQuestion.innerHTML = 'Q. ' + questions[count].question
    questionNumber.innerHTML = `Question ${count + 1}`;
    let optionSuffle = [...questions[count].incorrect_answers, questions[count].correct_answer];

    function shuffle(array) {
        let currentIndex = array.length, randomIndex;

        // While there remain elements to shuffle.
        while (currentIndex != 0) {
            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }
        return array;
    }

    optionSuffle = shuffle(optionSuffle);

    questions[count]["correctOptionIndex"] = optionSuffle.indexOf(questions[count].correct_answer);

    for (let i = 0; i < quizOption.length; i++) {
        quizOption[i].innerHTML = optionSuffle[i]
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
    const howManyQuestion = document.getElementById("noOfQuestion").value;
    const difficulty = document.getElementById("difficultyLevel").value;
    loadApiQuestion(howManyQuestion, difficulty);
    // loadQuestions();
})

nextBtn.addEventListener('click', () => {
    for (let i = 0; i < allOptions.length; i++) {
        if (allOptions[i].style.backgroundColor === 'rgb(223, 230, 233)') {
            if (i === questions[count].correctOptionIndex) {
                score += 5
            }
            if (nextBtn.innerHTML === 'Finish') {
                clearInterval(myInterval)
                mainContainer.classList.add('d-flex', 'align-items-center', 'justify-content-center', 'flex-column')
                mainContainer.innerHTML = `
                <div>
                    <h3>You scored <b>${score}</b> out of <b>${questions.length * marksOfOneQuestion}</b> in ${minutes > 0 ? minutes + ' minutes and ' : ''} ${second} seconds</h3>
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
