import type { RequestHandler } from "./$types";
import { PrismaClient } from "@prisma/client";
import { logger } from "$lib/logger";

const prisma = new PrismaClient();

// TODO: Clean this shit up
export const DELETE: RequestHandler = async ({ request, locals }) => {
  let data = await request.json();
  const session = await locals.getSession();

  if (session && data.ids) {
    const userId = session.user.id;
    // TODO: Change this to update so they can be recovered?
    // TODO: Handle fucking errors
    const result = await prisma.multipleChoiceQuestion.deleteMany({
      where: {
        AND: [{ id: { in: data.ids } }, { userId: userId }],
      },
    });
    // Add a check on result, but what? (check return types on deleteMany)
    try {
      const count = await prisma.multipleChoiceQuestion.count({
        where: {
          collectionId: data.collectionId,
        },
      });

      await prisma.collection.update({
        where: { id: data.collectionId },
        data: { count: count, processing: 1 },
      });
    } catch (error) {
      logger.error(
        "routes/api/create/server [updateCollectionInfo]: Error updating collection count"
      );
    }
    return new Response(JSON.stringify({ status: "success" }));
  } else {
    // TODO: handle error appropriately
    return new Response(JSON.stringify({ status: "failed" }));
  }
};
