const { prettyPrint } = require('md_table_prettyprint')
const InterviewThought = require('./InterviewThought')

module.exports = class Interview {

    constructor(){
        this.thoughts = []
    }

    startInterview(candidateName, candidateLevel, interviewRound){
        this.candidateName = candidateName
        this.candidateLevel = candidateLevel
        this.interviewRound = interviewRound
        this.interviewDate = new Date().toLocaleDateString().replaceAll('/', '-')
    }

    addThought(score, time, thought){
        this.thoughts.push(new InterviewThought(score, time, thought))
    }

    toString() {
        let header = `# ${this.candidateName}\n${this.interviewDate}\n${this.candidateLevel}\n${this.interviewRound}\n\n`;
        let fileContents = header

        let tableHeader = 'Score | Time | Thought\n';
        let tableRows = this.thoughts.map(n => {
            return `${n.score} | ${n.time} | ${n.thought}`
        }).join('\n');

        fileContents += prettyPrint(tableHeader + tableRows);
        return fileContents
    }
}