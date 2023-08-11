import type { RequestHandler } from "./$types";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const POST: RequestHandler = async ({ request }) => {
  let req = await request.json();
  // Assume getting all collections
  // TODO: Add handle for getting a specific collection?
  let collection = await prisma.collection.findUnique({
    where: {
      id: req.id,
    },
    include: {
      questions: true,
    },
  });
  return new Response(JSON.stringify({ status: "success" }));
  // TODO: Handle error
  // return new Response("ERROR");
};
