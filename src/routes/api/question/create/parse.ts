// TODO: Clean this and create a type for questions?
export async function parseQuestions(content: string): Promise<Array<Array<string>>> {
  let questions: Array<Array<string>> = [];
  let currentQuestion: Array<string> = [];
  let lines = content.split("\n");
  let answerRegex = /([A-Za-z][.)]) (.+)/;
  let questionRegex = /^\d+[.)]/;

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].replace(/(\r\n|\n|\r)/gm, "");
    let result = line.match(answerRegex);
    if (result) {
      if (currentQuestion.length > 0) {
        currentQuestion.push(result[2]);
      }
    } else if (line.length > 3) {
      if (currentQuestion.length > 1) {
        questions.push(currentQuestion);
      }

      if (line.match(questionRegex)) {
        line = line.substring(line.indexOf(" ") + 1);
      }
      currentQuestion = [line];
    }
  }
  if (currentQuestion.length > 0) {
    questions.push(currentQuestion);
  }
  return questions;
}

export async function parseTags(tags: Array<string>): Promise<Array<any>> {
  let arr = [];
  // TODO: Make this nicer
  for (let i = 0; i < tags.length; i++) {
    arr.push({ tag: tags[i] });
  }
  return arr;
}

export async function parseAnswers(answers: Array<string>): Promise<Array<any>> {
  let arr = [];
  let isCorrect = true;
  for (let i = 1; i < answers.length; i++) {
    arr.push({
      answer: answers[i],
      isCorrect: isCorrect,
    });
    isCorrect = false;
  }
  return arr;
}
