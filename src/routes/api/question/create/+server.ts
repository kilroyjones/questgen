import { env } from "$env/dynamic/private";
import type { RequestHandler } from "./$types";
import { Configuration, OpenAIApi } from "openai";
import { PrismaClient } from "@prisma/client";
import { parseAnswers, parseQuestions, parseTags } from "./parse";

const configuration = new Configuration({
  apiKey: env.PRIVATE_OPENAI_KEY,
});
const openai = new OpenAIApi(configuration);
const prisma = new PrismaClient();

// TODO: Clean this up, handle errors, look at parsing questions to a particular type for
// ease of handling
export const POST: RequestHandler = async ({ request }) => {
  let data = await request.json();
  console.log(data);

  // TODO: If result successful process
  let result = await getAPIResult(data.content);
  let content = result; // FIX

  console.log("-----");
  console.log(content);
  if (content) {
    let questions = await parseQuestions(content);
    let tags = await parseTags(data.tags);
    console.log(questions.length);
    console.log(tags);

    //TODO: Create collection separately and then add questions to it
    let collection = await getCollection(
      data.collectionName,
      data.userId,
      tags
    );
    // let count = await prisma.collection.questions.count({
    //   where{ id: collection.}
    // })
    console.log(collection);

    console.log("-------------");
    console.log(questions);
    for (const question of questions) {
      let answers = await parseAnswers(question);
      await prisma.multipleChoiceQuestion.create({
        data: {
          createdBy: data.userId,
          question: question[0],
          collectionId: collection.id,
          isDeleted: false,
          isApproved: false,
          answers: {
            create: answers,
          },
          // TODO: Move tags to part of collections
        },
        select: {
          id: true,
        },
      });
    }
  }

  return new Response(JSON.stringify({ status: "error" }));
};

async function getAPIResult(content: string): Promise<any> {
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

  // TODO: Correctly handle resulting errors
  return result.data.choices[0].message?.content;
}

// TODO: fix this so that a collection is being return?
async function getCollection(
  collectionName: string,
  userId: string,
  tags: Array<any>
): Promise<any> {
  const collection = await prisma.collection.create({
    data: {
      createdBy: userId,
      name: collectionName,
      tags: {
        create: tags,
      },
    },

    include: {
      questions: true,
    },
  });
  return collection;
}
