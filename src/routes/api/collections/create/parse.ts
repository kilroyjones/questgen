export async function parseQuestions(content: string): Promise<Array<Object>> {
  let questions: Array<object> = [];

  let rows = content.split("\n");
  for (let i = 1; i < rows.length; i++) {
    let row = rows[i].split("\t");
    console.log(row);
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
