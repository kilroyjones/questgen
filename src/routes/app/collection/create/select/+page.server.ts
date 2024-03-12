import { PUBLIC_ADDRESS } from "$env/static/public";
import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ locals: { getSession } }) => {
  const session = await getSession();
  if (session) {
    let result = await fetch(`${PUBLIC_ADDRESS}/api/collection/list`, {
      method: "POST",
      body: JSON.stringify({
        userId: session.user.id,
      }),
      headers: {
        "content-type": "application/json",
      },
    });
    let collections = await result.json();
    return { collections: collections };
  }
  throw redirect(302, "/app/account/signin");
};
