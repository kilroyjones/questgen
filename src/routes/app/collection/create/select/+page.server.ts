import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ locals: { getSession } }) => {
  const session = await getSession();
  if (session) {
    let result = await fetch("http://localhost:5173/api/collection/list", {
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
