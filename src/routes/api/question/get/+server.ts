import type { RequestHandler } from "./$types";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const POST: RequestHandler = async ({ request }) => {
  let data = await request.json();
  let question = await prisma.multipleChoiceQuestion.findFirst({
    where: {
      AND: [{ isDeleted: false }, { isApproved: false }],
    },
    include: {
      answers: true,
    },
  });
  if (question) {
    return new Response(JSON.stringify(question));
  }

  // TODO: Handle error
  return new Response("ERROR");
};
