import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ locals: { getSession } }) => {
  const session = await getSession();
  console.log(session);
  if (session) {
    let result = await fetch("http://localhost:5173/api/collections/list", {
      method: "POST",
      body: JSON.stringify({
        userId: session.user.id,
      }),
      headers: {
        "content-type": "application/json",
      },
    });
    console.log(result);
    return await result.json();
  }
  throw redirect(302, "/app/account/signin");
};
