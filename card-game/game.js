const elements = ['<i class="far fa-address-book"></i>', '<i class="fas fa-air-freshener"></i>', '<i class="fab fa-amazon"></i>', '<i class="fas fa-ambulance"></i>', '<i class="fab fa-angellist"></i>', '<i class="fab fa-angular"></i>', '<i class="fab fa-apple"></i>', '<i class="fab fa-angrycreative"></i>']

const flipBoxInner = document.querySelectorAll('.flip-box-inner')
const flipBoxBack = document.querySelectorAll('.flip-box-back')
const timer = document.querySelector('.timer')
const modalContainer = document.querySelector('.modall-container')
const modall = document.querySelector('.modall .text')
const restart = document.querySelector('.restart')

let arr = []
let score = 0
let minute = 02
let second = 0
let clicked = 0

setIcons()
timer.innerHTML = '0' + minute + ' : ' + '0' + second
var timerr = setInterval(startTimer, 1000)


restart.addEventListener('click', () => {
    location.reload()
})


function startTimer() {
    
    if (minute == '00' && second == '00') {
        modalContainer.style.transform = 'translateY(0%)'
        modall.innerHTML += '<h6>Timeup</h6>'
        modall.innerHTML += `<h4>Score : ${score}</h4>`
        clearInterval(timerr)
    } else {
        second -= 1
        if (second < 00) {
            minute -= 1
            second = 59
        }
        timer.innerHTML = (minute < 10 ? '0' + minute : minute) + ' : ' + (second < 10 ? '0' + second : second)
    }
}


for (let i = 0; i < flipBoxInner.length; i++) {
    flipBoxInner[i].addEventListener('click', () => {
        clicked += 1
        if(clicked > 2) clicked = 0
        if(clicked === 1 || clicked === 2){
            if (!flipBoxInner[i].classList.contains('rotate-class')) {

                flipBoxInner[i].classList.add('rotate-class')
                if (!arr.includes(i)) {
                    arr.push(i)
                }

                if (arr.length == 2) {
                    if (flipBoxInner[arr[0]].innerHTML === flipBoxInner[arr[1]].innerHTML) {
                        clearBox()
                    } else {
                        setTimeout(() => {
                            for (let j = 0; j < arr.length; j++) {
                                flipBoxInner[arr[j]].classList.remove('rotate-class')
                            }
                            arr = []
                        }, 300);
                    }
                }
            }
        }
    })
}

function clearBox() {
    score += 1

    setTimeout(() => {
        for (let k = 0; k < 2; k++) {
            flipBoxInner[arr[k]].innerHTML = ''
            flipBoxInner[arr[k]].style.backgroundColor = '#2d3436'
        }
        arr = []

        setTimeout(() => {
            if (score == flipBoxInner.length / 2) {
                modalContainer.style.transform = 'translateY(0%)'
                modall.innerHTML += '<h5>You won</h5>'
                modall.innerHTML += `<h4>Score : ${score}</h4>`
                clearInterval(timerr)
            }
        }, 550);
    }, 500);

}

function setIcons() {
    for (let i = 0; i < flipBoxBack.length / 2; i++) {
        for (let j = 0; j < 2; j++) {
            let flag = false
            while (true) {
                const randomNum = Math.floor(Math.random() * flipBoxBack.length)
                if (flipBoxBack[randomNum].innerHTML == '') {
                    flipBoxBack[randomNum].innerHTML = elements[i]
                    flag = true
                }
                if (flag) break
            }
        }
    }
}
