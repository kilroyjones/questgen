import type { RequestHandler } from "./$types";
import {
  PrismaClient,
  type MultipleChoiceQuestion,
  type MultipleChoiceAnswer,
} from "@prisma/client";

const prisma = new PrismaClient();

export const POST: RequestHandler = async ({ request }) => {
  let req = await request.json();
  console.log("--------------");
  let question = await prisma.multipleChoiceQuestion.update({
    where: {
      id: req.id,
    },
    data: {
      question: req.question,
    },
  });

  await prisma.$transaction(
    req.answers.map((answer: MultipleChoiceAnswer) =>
      prisma.multipleChoiceAnswer.update({
        where: { id: answer.id },
        data: {
          answer: answer.answer,
          isCorrect: answer.isCorrect,
        },
      })
    )
  );

  if (question) {
    return new Response(JSON.stringify({ status: "success" }));
  }
  return new Response(JSON.stringify({ status: "failed" }));
};
