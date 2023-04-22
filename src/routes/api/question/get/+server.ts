import type { RequestHandler } from "./$types";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const POST: RequestHandler = async ({ request }) => {
  let data = await request.json();
  let question = await prisma.multipleChoiceQuestion.findFirst({
    where: {
      AND: [{ isDeleted: false }],
    },
    include: {
      answers: true,
    },
  });
  console.log(question);
  if (question) {
    return new Response(
      JSON.stringify({
        id: question.id,
        question: question.question,
        answers: question.answers,
      })
    );
  }

  // TODO: Handle error
  return new Response("ERROR");
};
