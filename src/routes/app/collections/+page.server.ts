import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ locals }) => {
  const session = await locals.getSession();
  if (session) {
    let resp = await fetch("http://localhost:5173/api/collections/browse", {
      method: "POST",
      body: JSON.stringify({
        userId: session.user.id,
      }),
      headers: {
        "content-type": "application/json",
      },
    });
    // TODO: Handle error
    let collections = await resp.json();
    return {
      collections: collections,
    };
  }
  throw redirect(302, "/app/account/signin");
};
