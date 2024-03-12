import { PUBLIC_ADDRESS } from "$env/static/public";
import { redirect } from "@sveltejs/kit";

import type { PageServerLoad } from "./$types";
export const load: PageServerLoad = async ({ locals }) => {
  const session = await locals.getSession();
  if (session) {
    let resp = await fetch(`${PUBLIC_ADDRESS}/api/collection/browse`, {
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
