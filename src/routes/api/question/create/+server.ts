import { env } from "$env/dynamic/private";
import type { RequestHandler } from "./$types";
import { Configuration, OpenAIApi } from "openai";
import { PrismaClient, type Collection } from "@prisma/client";
import { parseAnswers, parseQuestions, parseTags } from "./parse";
import type { Result } from "$lib/models";

const configuration = new Configuration({
  apiKey: env.PRIVATE_OPENAI_KEY,
});
const openai = new OpenAIApi(configuration);
const prisma = new PrismaClient();

/**
 * Processes text and creates questions
 *
 * This handler will parse the questions and tags. In the database the
 * following tables will be have entries added.
 *  - Collection
 *  - MultipleChoiceQuestion(s)
 *  - Tag(s)
 */
export const POST: RequestHandler = async ({ request }) => {
  let data = await request.json();
  let result: Result;
  if (data) {
    result = await getAPIResult(data.content);

    if (result.status == "error") {
      return new Response(JSON.stringify({ status: "error" }));
    }

    let content = result.data;
    let userId = result.data.userId;
    let questions = await parseQuestions(content);
    let tags = await parseTags(data.tags);
    let collection = await createCollection(
      data.collectionName,
      data.userId,
      tags
    );

    result = await addQuestionsToCollection(userId, questions, collection.id);
    if (result.status == "success") {
      return new Response(JSON.stringify({ status: "succes" }));
    }
  }
  return new Response(JSON.stringify({ status: "error" }));
};

/**
 * This performs the insert operations to add the questions to the database.
 */
async function addQuestionsToCollection(
  userId: string,
  questions: Array<Array<string>>,
  collectionId: number
): Promise<Result> {
  for (const question of questions) {
    let answers = await parseAnswers(question);
    if (answers.length > 0) {
      try {
        await prisma.multipleChoiceQuestion.create({
          data: {
            userId: userId,
            question: question[0],
            collectionId: collectionId,
            status: 1,
            answers: {
              create: answers,
            },
          },
          select: {
            id: true,
          },
        });
      } catch (error) {
        return { status: "success" };
      }
    }
  }
  return { status: "error" };
}

/**
 * Calls the OpenAI API to create questions
 *
 * TODO: Fix the prompts to be more general
 */
async function getAPIResult(content: string): Promise<Result> {
  let result = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "You are a computer system teacher" },
      {
        role: "user",
        content: `Given the following content, create multiple choice questions for IGCSE high school 
                  computer science question numbered 1 to 8 for high school class. Make option (a),
                  the first option, always the correct answer. Content: ${content}`,
      },
    ],
  });

  if (result.data.choices[0].message?.content) {
    return {
      status: "success",
      data: result.data.choices[0].message?.content,
    };
  } else {
    return { status: "error" };
  }
}

/**
 * Creates the collection
 */
async function createCollection(
  collectionName: string,
  userId: string,
  tags: Array<any>
): Promise<Collection> {
  return await prisma.collection.create({
    data: {
      userId: userId,
      name: collectionName,
      tags: {
        create: tags,
      },
    },
  });
}
