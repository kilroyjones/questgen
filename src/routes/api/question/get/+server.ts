import type { RequestHandler } from "./$types";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const POST: RequestHandler = async ({ request }) => {
  let data = await request.json();
  let questionStatus = data.questionStatus;
  let filters: Array<object> = [];

  console.log(questionStatus, data.collectionId);
  let question = await prisma.multipleChoiceQuestion.findFirst({
    where: {
      status: questionStatus,
      collectionId: data.collectionId,
      createdBy: data.createdBy,
    },
    include: {
      answers: true,
    },
  });

  // TODO: FIX ERROR WHEN NO QUESTIONS OF THAT TYPE
  console.log(question);
  if (question) {
    return new Response(JSON.stringify(question));
  }

  // TODO: Handle error
  return new Response("ERROR");
};
