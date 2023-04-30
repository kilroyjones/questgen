import { error } from "@sveltejs/kit";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
  console.log(params);

  // Assume getting all collections
  // TODO: Add handle for getting a specific collection?
  let collection = await prisma.collection.findUnique({
    where: {
      id: parseInt(params.slug),
    },
    include: {
      questions: true,
    },
  });

  console.log(collection);
  return collection;
}
