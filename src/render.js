const excelentButton = document.getElementById('excelentButton')
excelentButton.addEventListener('click', () => window.electronAPI.logNote(6))

const goodButton = document.getElementById('goodButton')
goodButton.addEventListener('click', () => window.electronAPI.logNote(5))

const inaccurateButton = document.getElementById('inaccurateButton')
inaccurateButton.addEventListener('click', () => window.electronAPI.logNote(4))

const mistakeButton = document.getElementById('mistakeButton')
mistakeButton.addEventListener('click', () => window.electronAPI.logNote(3))

const questionButton = document.getElementById('questionButton')
questionButton.addEventListener('click', () => window.electronAPI.logNote(2))

const bludnerButton = document.getElementById('bludnerButton')
bludnerButton.addEventListener('click', () => window.electronAPI.logNote(1))

const commentButton = document.getElementById('commentButton')
commentButton.addEventListener('click', () => window.electronAPI.logNote(0))