// TODO Break this file up a bit. Messy right now

import { logger } from "$lib/logger";
import { PrismaClient } from "@prisma/client";
import { env } from "$env/dynamic/private";
import { Configuration, OpenAIApi } from "openai";
import { parseAnswers, getQuestionAndAnswers, type QuestionAndAnswers, parseTags } from "./parse";

import type { RequestHandler } from "./$types";
import type { Collection, Tag } from "@prisma/client";

const configuration = new Configuration({
  apiKey: env.PRIVATE_OPENAI_KEY,
});
const openai = new OpenAIApi(configuration);
const prisma = new PrismaClient();

/**
 *
 */
export const POST: RequestHandler = async ({ request, locals }) => {
  const session = await locals.getSession();

  if (!session) {
    // TODO: Handle Error
    return new Response("");
  }

  console.log("Session found");
  let req = await request.json();
  console.log(req.tags);
  let collection = await createCollection(session.user.id, req.name, req.tags);

  if (!collection) {
    // TODO: Handle Error
    return new Response("");
  }

  console.log("Collection created: ", collection.id);

  let questionAndAnswers = await generateQuestions(req.content, req.questionCount);
  if (!questionAndAnswers) {
    // TODO: Handle Error
    return new Response("");
  }

  console.log("Questions generated:", questionAndAnswers.length);

  let result = await addQuestionsToCollection(
    session.user.id,
    collection.id,
    questionAndAnswers,
    req.questionCount
  );

  console.log("Questions added to database:", result);

  await updateCollectionInfo(collection.id);

  console.log("Updated the collection count");
  // Handle Error Response
  return new Response("");
};

/**
 *
 */
async function createCollection(
  id: string,
  name: string,
  tags: Array<string>
): Promise<Collection | null> {
  try {
    let formattedTags = await parseTags(tags);
    return await prisma.collection.create({
      data: {
        userId: id,
        name: name,
        count: 0,
        processing: 1,
        tags: {
          create: formattedTags,
        },
      },
    });
  } catch (error) {
    logger.error(`api/collection/create/server: Error creation the collection: ${error}`);
    return null;
  }
}

/**
 *
 */
async function generateQuestions(
  content: string,
  questionCount: number
): Promise<Array<QuestionAndAnswers> | null> {
  let questionAndAnswers: Array<QuestionAndAnswers> = [];
  let contentChunks: Array<string> = await getContentChunks(content);
  let queryCount: number = 0;

  let indices = getShuffledChunkIndices(contentChunks.length);
  let failCount = 0;
  while (questionAndAnswers.length < questionCount && failCount < 3) {
    // TODO: Clean this up
    let result = await getGPTResult(
      contentChunks[indices[(queryCount + 1) % contentChunks.length]]
    );
    if (result) {
      let newQuestionAndAnswers: Array<QuestionAndAnswers> = await getQuestionAndAnswers(result);
      console.log("GPT:", newQuestionAndAnswers.length);
      if (newQuestionAndAnswers.length > 0) {
        questionAndAnswers = questionAndAnswers.concat(newQuestionAndAnswers);
      } else {
        // TODO: Think about better querying to make sure questions are always returned.
        failCount += 1;
      }
    } else {
      failCount += 1;
    }
    queryCount += 1;
  }
  if (failCount >= 3) {
    return null;
  }
  return questionAndAnswers;
}

/**
 *
 */
async function getContentChunks(content: string): Promise<Array<string>> {
  let chunkSize = 2500; // TODO: Fix this hardcoded value
  let contentChunks: Array<string> = [];

  for (let i = 0; i < content.length; i += chunkSize) {
    contentChunks.push(content.slice());
  }

  return contentChunks;
}

function getShuffledChunkIndices(indexCount: number): Array<number> {
  return [...Array(indexCount).keys()].sort(() => Math.random() - 0.5);
}
/**
 * Calls the OpenAI API to create questions
 *
 * TODO: Fix the prompts to be more general
 */
async function getGPTResult(content: string): Promise<string | null> {
  let result = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "You are a teacher creating questions for a quiz" },
      {
        role: "user",
        content: `Create multiple choice questions in TSV format where the first column is the question, the second is the correct
                  answer, and the last three columns are incorrect answers. Use this content to create the questions: "${content}".`,
      },
    ],
  });

  if (result.data.choices[0].message?.content) {
    return result.data.choices[0].message?.content;
  }
  return null;
}

/**
 *
 */
async function addQuestionsToCollection(
  userId: string,
  collectionId: number,
  questions: Array<QuestionAndAnswers>,
  questionCount: number
): Promise<number | null> {
  // TODO: Add question count
  let count: number = 0;
  for (const question of questions) {
    try {
      let answers = parseAnswers(question.answers);
      await prisma.multipleChoiceQuestion.create({
        data: {
          userId: userId,
          question: question.question,
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
      count += 1;
      if (count == questionCount) {
        return questionCount;
      }
    } catch (error) {
      // TODO: Log error
      logger.error(
        "routes/api/create/server [addQuestionToCollection]: Error adding question to database"
      );
    }
  }
  return questionCount;
}

async function updateCollectionInfo(collectionId: number) {
  try {
    const count = await prisma.multipleChoiceQuestion.count({
      where: {
        collectionId: collectionId,
      },
    });

    await prisma.collection.update({
      where: { id: collectionId },
      data: { count: count, processing: 0 },
    });
  } catch (error) {
    logger.error(
      "routes/api/create/server [updateCollectionInfo]: Error updating collection count"
    );
  }
}
