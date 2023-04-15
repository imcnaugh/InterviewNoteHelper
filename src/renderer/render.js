import { createApp } from 'vue'
import TestComp from "./vueComponents/testComp.vue"

createApp(TestComp).mount('#app')

const excellentButton = document.getElementById('excellentButton')
const goodButton = document.getElementById('goodButton')
const inaccurateButton = document.getElementById('inaccurateButton')
const mistakeButton = document.getElementById('mistakeButton')
const questionButton = document.getElementById('questionButton')
const blunderButton = document.getElementById('blunderButton')
const commentButton = document.getElementById('commentButton')

const nameBox = document.getElementById('candidateName')
const positionBox = document.getElementById('candidatePosition')
const roundBox = document.getElementById('candidateRound')

const candidateNameDisplay = document.getElementById('candidateNameDisplay')
const candidatePosition = document.getElementById('candidatePositionDisplay')
const candidateRound = document.getElementById('candidateRoundDisplay')

const startInterviewButton = document.getElementById('startInterviewButton')
const stopInterviewButton = document.getElementById('stopInterviewButton')

const metadataInputArea = document.getElementById('metadataInputArea')
const metadataDisplayArea = document.getElementById('metadataDisplayArea')
const timerDisplay = document.getElementById('timerDisplay')

let timerIntervalId = null

excellentButton.addEventListener('click', () => window.electronAPI.logNote(6))
goodButton.addEventListener('click', () => window.electronAPI.logNote(5))
inaccurateButton.addEventListener('click', () => window.electronAPI.logNote(4))
mistakeButton.addEventListener('click', () => window.electronAPI.logNote(3))
questionButton.addEventListener('click', () => window.electronAPI.logNote(2))
blunderButton.addEventListener('click', () => window.electronAPI.logNote(1))
commentButton.addEventListener('click', () => window.electronAPI.logNote(0))

nameBox.addEventListener('input', readyToStartInterview)
positionBox.addEventListener('input', readyToStartInterview)
roundBox.addEventListener('input', readyToStartInterview)

startInterviewButton.addEventListener('click', startInterview)
stopInterviewButton.addEventListener('click', stopInterview)

function readyToStartInterview(){
    if(nameBox.value && positionBox.value && roundBox.value){
        startInterviewButton.disabled = false
    }
}

function startInterview(){
    candidateNameDisplay.innerText = nameBox.value
    candidatePosition.innerText = positionBox.value
    candidateRound.innerText = roundBox.value

    metadataInputArea.style.display = 'none'
    metadataDisplayArea.style.display = 'block'

    startInterviewButton.style.display = 'none'
    stopInterviewButton.style.display = 'block'

    timerDisplay.style.display = 'block'

    const startTime = new Date()

    timerIntervalId = setInterval(() => {
        let now = new Date()
        let diff = now - startTime
        let minutes = Math.floor(diff / 1000 / 60)
        let seconds = Math.floor(diff / 1000) - (minutes * 60)
        timerDisplay.innerText = `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`
    }, 500)

    window.electronAPI.startInterview(nameBox.value, positionBox.value, roundBox.value)
}

function stopInterview(){
    clearInterval(timerIntervalId)
    stopInterviewButton.style.display = 'none'
    window.electronAPI.stopInterview()
}