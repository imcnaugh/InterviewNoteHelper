const Interview = require('../model/interview');
const FileDto = require('../dto/fileDto');
const {dialog} = require("electron");

const interview = new Interview();

function startInterview(_, data) {
    interview.startInterview(data.name, data.position, data.round);
}

function addThought(_, data) {
    interview.addThought(data.value, data.time, data.note);
}

function stopInterview() {
    getPathOfFileToSave().then(result => {
        let fileDto = new FileDto(result.filePath);
        fileDto.write(interview.toString());
    });
}

function getPathOfFileToSave() {
    const suggestedFileName = interview.interviewDate + '_' + interview.candidateName.replaceAll(' ', '_') + '.md';
    return dialog.showSaveDialog({
        title: 'Save Notes',
        defaultPath: suggestedFileName
    })
}

module.exports = { startInterview, addThought, stopInterview };