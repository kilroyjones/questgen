import type { RequestHandler } from "./$types";
import { PrismaClient } from "@prisma/client";
import { QuestionStatus } from "$lib/models";

const prisma = new PrismaClient();

export const POST: RequestHandler = async ({ request }) => {
  let req = await request.json();

  let question = await prisma.multipleChoiceQuestion.update({
    where: {
      id: req.id,
    },
    data: {
      status: QuestionStatus.APPROVED,
    },
  });

  if (question) {
    return new Response(JSON.stringify({ status: "success" }));
  }
  return new Response(JSON.stringify({ status: "failed" }));
};
