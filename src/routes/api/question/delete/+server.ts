import type { RequestHandler } from "./$types";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const DELETE: RequestHandler = async ({ request, locals }) => {
  let data = await request.json();
  const session = await locals.getSession();
  const userId = session.user.id;

  if (session && data.ids) {
    // TODO: Change this to update so they can be recovered?
    const result = await prisma.MultipleChoiceQuestion.deleteMany({
      where: {
        AND: [{ id: { in: data.ids } }, { userId: userId }],
      },
    });
    // Add a check on result, but what? (check return types on deleteMany)
    return new Response(JSON.stringify({ status: "success" }));
  } else {
    // TODO: handle error appropriately
    return new Response(JSON.stringify({ status: "failed" }));
  }
};
