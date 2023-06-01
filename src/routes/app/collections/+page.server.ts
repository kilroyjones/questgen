import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ locals }) => {
  const session = await locals.getSession();
  if (session) {
    return {
      session: await locals.getSession(),
    };
  }
  throw redirect(302, "/app/account/signIn");
};
