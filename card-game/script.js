const flipBoxInner = document.querySelectorAll('.flip-box-inner')
const easy = document.getElementById('easy')

for (let i = 0; i < flipBoxInner.length; i++) {
    flipBoxInner[i].addEventListener('click', () => {
        flipBoxInner[i].classList.toggle('rotate-class')
    })
}

easy.addEventListener('click', () => {
    window.location.href = 'game.html'
        // export const blocks = 16
})