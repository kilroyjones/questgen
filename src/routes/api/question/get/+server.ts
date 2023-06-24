import type { RequestHandler } from "./$types";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const POST: RequestHandler = async ({ request }) => {
  let data = await request.json();
  let questionStatus = data.questionStatus;
  let filters: Array<object> = [];

  let question = await prisma.multipleChoiceQuestion.findFirst({
    where: {
      status: questionStatus,
      collectionId: data.collectionId,
      userId: data.userId,
    },
    include: {
      answers: true,
    },
  });

  // TODO: FIX ERROR WHEN NO QUESTIONS OF THAT TYPE
  if (question) {
    return new Response(JSON.stringify(question));
  }

  // TODO: Handle error
  return new Response("ERROR");
};
