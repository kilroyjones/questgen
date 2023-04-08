import { env } from "$env/dynamic/private";
import { MultipleChoice } from "$lib/models";
import type { RequestHandler } from "./$types";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: env.PRIVATE_OPENAI_KEY,
});
const openai = new OpenAIApi(configuration);

export const POST: RequestHandler = async ({ request }) => {
  let data = await request.json();
  // console.log(data.content.substring(0, 100));
  // console.log("Making a request!");
  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a computer system teacher" },
        {
          role: "user",
          content: `Given the following content, create 8 multiple choice questions for IGCSE Computer Science 
                    high school class. Make option (a), the first option, always the correct answer.
                    Content is as follows: variables are words that mean other stuff`,
        },
      ],
    });
    try {
      let content = completion.data.choices[0].message?.content;
      if (content) {
        let questions = await parseQuestions(content);
        console.log(questions);
      }
    } catch {
      // TODO: Catch error and return message to user
    }
  } catch (error) {
    console.log(error);
    // if (error.response) {
    //   console.log(error.response.status);
    //   console.log(error.response.data);
    // } else {
    //   console.log(error.message);
    // }
  }
  return new Response(JSON.stringify({ status: "error" }));
};

async function parseQuestions(content: string): Promise<Array<MultipleChoice>> {
  let lines = content.split("\n");

  let questions: Array<MultipleChoice> = [];
  let currentQuestion: MultipleChoice | null = null;
  let questionRegex = /\d+. (.*)/;
  let answerRegex = /\w\) (.*)/;

  for (let i = 0; i < lines.length; i++) {
    let line: string = lines[i].replace(/(\r\n|\n|\r)/gm, "");
    let question: RegExpMatchArray | null = line.match(questionRegex);
    if (question) {
      if (currentQuestion == null || currentQuestion.answers.length == 0) {
        currentQuestion = new MultipleChoice(question[1], []);
      } else {
        questions.push(currentQuestion);
        currentQuestion = new MultipleChoice(question[1], []);
      }
    }
    let answer = line.match(answerRegex);
    if (answer) {
      if (currentQuestion != null) {
        currentQuestion.answers.push(answer[1]);
      }
    }
  }

  console.log(questions);
  return questions;
}
