import { env } from "$env/dynamic/private";
import { MultipleChoice } from "$lib/models";
import type { RequestHandler } from "./$types";
import { Configuration, OpenAIApi } from "openai";
import { PrismaClient } from "@prisma/client";
// import { collectionName } from "../../generate/modules/store";

const configuration = new Configuration({
  apiKey: env.PRIVATE_OPENAI_KEY,
});
const openai = new OpenAIApi(configuration);
const prisma = new PrismaClient();

export const POST: RequestHandler = async ({ request }) => {
  let data = await request.json();
  console.log(data);

  // try {
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "You are a computer system teacher" },
      {
        role: "user",
        content: `Given the following content, create 8 multiple choice questions, numbered 1 to 8, for IGCSE Computer Science 
                    high school class. Make option (a), the first option, always the correct answer.
                    Content is as follows: ${data.content}`,
      },
    ],
  });
  // try {
  console.log(completion);
  let content = completion.data.choices[0].message?.content;
  console.log(content);
  if (content) {
    let questions = await parseQuestions(content);
    let tags = await parseTags(data.tags);
    let collectionName: string = data.collectionName;
    console.log(questions.length);
    console.log(collectionName);
    console.log(tags);
    const newCollection = await prisma.collection.create({
      data: {
        name: collectionName,
      },
    });

    console.log(questions);
    for (const question of questions) {
      let answers = await parseAnswers(question.answers);
      console.log(answers);
      let currentQuestion = await prisma.multipleChoiceQuestion.create({
        data: {
          question: question.question,
          collectionId: newCollection.id,
          isDeleted: false,
          answers: {
            create: answers,
          },
          tags: {
            connectOrCreate: tags,
          },
        },
        select: {
          id: true,
        },
      });
    }
  }
  // } catch (error) {
  // TODO: Catch error and return message to user
  // console.log(error);
  // }
  // } catch (error) {
  // console.log(error);
  // TODO: Better Error
  // }
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
    // console.log(line);
    if (line.length < 2) {
      continue;
    }

    let question: RegExpMatchArray | null = line.match(questionRegex);
    if (question) {
      if (currentQuestion == null || currentQuestion.answers.length == 0) {
        currentQuestion = new MultipleChoice(question[1], []);
      } else {
        questions.push(currentQuestion);
        currentQuestion = null;
      }
    }
    if (question) {
      let answer = line.match(answerRegex);
      if (answer) {
        if (currentQuestion != null) {
          currentQuestion.answers.push(answer[1]);
        }
      }
    }
  }
  return questions;
}

async function parseTags(tags: Array<string>): Promise<Array<any>> {
  let arr = [];
  // TODO: Make this nicer
  for (let i = 0; i < tags.length; i++) {
    arr.push({ tag: tags[i] });
  }
  return arr;
}

async function parseAnswers(answers: Array<string>): Promise<Array<any>> {
  let arr = [];
  let isCorrect = true;
  for (const answer of answers) {
    arr.push({
      answer: answer,
      isCorrect: isCorrect,
    });
    isCorrect = false;
  }
  return arr;
}
