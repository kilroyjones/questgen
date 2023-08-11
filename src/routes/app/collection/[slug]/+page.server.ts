import { PrismaClient } from "@prisma/client";
import type { PageServerLoad } from "./$types";

const prisma = new PrismaClient();

export const load: PageServerLoad = async ({ params, locals, depends }) => {
  // Assume getting all collections
  // TODO: Add handle for getting a specific collection?
  // TODO: Move to API ???
  // TODO: Maybe change this to findFirst and insert the userId from session
  depends("collection:refresh-on-delete");
  console.log("GETTING COLLEC");
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
  return { collection: collection };
};
