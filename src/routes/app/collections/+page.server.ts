import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ locals: { getSession } }) => {
  const session = await getSession();
  console.log("COLLECTIONS", session);
  if (session) {
    console.log("HAS SESSION");
  }

  if (session) {
    return {
      session: await getSession(),
    };
  }
  throw redirect(302, "/app/account/signin");
};
