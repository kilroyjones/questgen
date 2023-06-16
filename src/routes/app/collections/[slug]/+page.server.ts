import { error } from "@sveltejs/kit";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ params, locals }) => {
  // Assume getting all collections
  // TODO: Add handle for getting a specific collection?
  let collection = await prisma.collection.findUnique({
    where: {
      id: parseInt(params.slug),
    },
    include: {
      questions: {
        include: {
          answers: true,
        },
      },
      tags: true,
    },
  });
  console.log(collection);
  return { "collection": collection };
};
