import type { RequestHandler } from "./$types";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const POST: RequestHandler = async ({ request }) => {
  let data = await request.json();
  let question = await prisma.multipleChoiceQuestion.findUnique({
    where: {
      id: 1,
    },
    include: {
      MultipleChoiceAnswer: true,
    },
  });
  if (question) {
    return new Response(
      JSON.stringify({
        id: question.id,
        question: question.question,
        answers: question.MultipleChoiceAnswer,
      })
    );
  }

  // TODO: Handle error
  return new Response("ERROR");
};
