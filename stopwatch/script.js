const start = document.querySelector('.start')
const stop = document.querySelector('.stop')
const reset = document.querySelector('.reset')
const hour = document.querySelector('.hour')
const minute = document.querySelector('.minute')
const second = document.querySelector('.second')
    // const milliSecond = document.querySelector('.millisecond')

// let getMilliSecond = 0
let getsecond = 0
let getMinute = 0
let getHour = 0
let myInterval
let flag = false
let intervalFlag = false

function updateStopwatch() {
    // getMilliSecond += 1
    // if (getMilliSecond == 1000) {
    // getMilliSecond = 0
    getsecond += 1
    if (getsecond == 60) {
        getsecond = 0
        getMinute += 1
        if (getMinute == 60) {
            getMinute = 0
            getHour += 1
        }
    }
    // }
    hour.innerHTML = getHour < 10 ? '0' + getHour : getHour
    minute.innerHTML = getMinute < 10 ? '0' + getMinute : getMinute
    second.innerHTML = getsecond < 10 ? `0` + getsecond : getsecond
        // milliSecond.innerHTML = getMilliSecond
}

start.addEventListener('click', () => {
    if (!intervalFlag) {
        myInterval = setInterval("updateStopwatch()", 1000)
        intervalFlag = true
    }
})

stop.addEventListener('click', () => {
    clearInterval(myInterval)
    if (intervalFlag) intervalFlag = false
    flag = true
})

reset.addEventListener('click', () => {
    if (flag) {
        getHour = 0
        getMinute = 0
        getsecond = 0
            // getMilliSecond = 0
    }
    if (intervalFlag) intervalFlag = false
    clearInterval(myInterval)
    hour.innerHTML = '00'
    minute.innerHTML = '00'
    second.innerHTML = '00'
        // milliSecond.innerHTML = '00'
})