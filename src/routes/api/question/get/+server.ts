import type { RequestHandler } from "./$types";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const POST: RequestHandler = async ({ request }) => {
  let data = await request.json();
  let filter = data.filterOn;
  let filters: Array<object> = [];
  console.log(filter, data.collectionId);
  if (filter == "Approved") {
    filters.push({ isApproved: true });
  } else if (filter == "Not approved") {
    filters.push({ isApproved: false });
  } else if (filter == "Deleted") {
    filters.push({ isDeleted: true });
  }

  console.log(filters);
  let question = await prisma.multipleChoiceQuestion.findFirst({
    where: {
      // OR: filters,
      collectionId: data.collectionId,
    },
    include: {
      answers: true,
    },
  });
  console.log(question);
  if (question) {
    return new Response(JSON.stringify(question));
  }

  // TODO: Handle error
  return new Response("ERROR");
};
