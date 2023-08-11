import { PrismaClient } from "@prisma/client";
import type { PageServerLoad } from "./$types";
import { error } from "@sveltejs/kit";

const prisma = new PrismaClient();

export const load: PageServerLoad = async ({ params, locals }) => {
  // TODO: Move this to API?
  const session = await locals.getSession();
  if (session) {
    let collection = await prisma.collection.findFirst({
      where: {
        id: parseInt(params.slug),
        userId: session.user.id,
      },
      include: {
        tags: true,
      },
    });
    console.log(collection);
    return { collection: collection };
  }
  throw error(404, "Not found");
};
