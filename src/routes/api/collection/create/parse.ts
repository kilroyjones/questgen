export type QuestionAndAnswers = {
  question: string;
  answers: Array<string>;
};

export async function getQuestionAndAnswers(content: string): Promise<Array<QuestionAndAnswers>> {
  let rows = content.split("\n");
  let questionAndAnswers: Array<QuestionAndAnswers> = [];

  for (let i = 1; i < rows.length; i++) {
    let row = rows[i].split("\t");
    if (row.length > 2) {
      let questionAndAnswer: QuestionAndAnswers = {
        question: row[0],
        answers: row.slice(1),
      };
      questionAndAnswers.push(questionAndAnswer);
    }
  }
  return questionAndAnswers;
}

export async function parseTags(tags: Array<string>): Promise<Array<any>> {
  let arr = [];
  // TODO: Make this nicer
  for (let i = 0; i < tags.length; i++) {
    arr.push({ tag: tags[i] });
  }
  return arr;
}

export function parseAnswers(answers: Array<string>): Array<any> {
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
