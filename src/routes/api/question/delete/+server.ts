import type { RequestHandler } from "./$types";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const DELETE: RequestHandler = async ({ request }) => {
  let data = await request.json();
  console.log(data);
  let question = await prisma.multipleChoiceQuestion.update({
    where: {
      id: data.id,
    },
    data: {
      isDeleted: true,
    },
  });
  if (question) {
    return new Response(JSON.stringify({ status: "success" }));
  }
  return new Response(JSON.stringify({ status: "failed" }));
};
