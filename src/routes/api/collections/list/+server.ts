import type { RequestHandler } from "./$types";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const POST: RequestHandler = async ({ request }) => {
  let req = await request.json();
  // Assume getting all collections
  // TODO: Add handle for getting a specific collection?
  let collections = await prisma.collection.findMany({
    where: {
      userId: req.userId,
    },
  });

  return new Response(JSON.stringify({ collections: collections }));
};
