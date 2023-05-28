import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ locals: { getSession } }) => {
  const session = await getSession();

  if (session) {
    return {
      session: await getSession(),
    };
  }
  throw redirect(302, "/app/account/signin");
};
