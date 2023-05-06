import type { RequestHandler } from "./$types";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const POST: RequestHandler = async ({ request }) => {
  // let data = await request.json();
  // Assume getting all collections
  // TODO: Add handle for getting a specific collection?
  let collections = await prisma.collection.findMany({ include: { tags: true } });

  // let temp = await prisma.collection.findUnique({
  //   where: {
  //     id: 1,
  //   },
  //   include: {
  //     tags: true,
  //   },
  // });

  // if (temp) {
  //   let count = await prisma.multipleChoiceQuestion.count({
  //     where: {
  //       collectionId: temp.id,
  //       isDeleted: false,
  //     },
  //   });
  //   console.log("COUNT:", count);
  // }

  console.log(collections.length, collections);
  return new Response(JSON.stringify(collections));
  // TODO: Handle error
  // return new Response("ERROR");
};
