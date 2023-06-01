import { AuthApiError } from "@supabase/supabase-js";
import { fail, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";
import type { PageServerLoad } from "./$types";

// export const load: PageServerLoad = async ({ locals: { getSession } }) => {
//   const session = await getSession();
//   if (session) {
//     throw redirect(302, "/app/collections/");
//   }
//   return {
//     session: await getSession(),
//   };
// };

export const actions: Actions = {
  signinEmail: async ({ request, locals }) => {
    const body = Object.fromEntries(await request.formData());

    const { data, error: err } = await locals.supabase.auth.signInWithPassword({
      email: body.email as string,
      password: body.password as string,
    });

    if (err) {
      if (err instanceof AuthApiError && err.status === 400) {
        return fail(400, {
          error: "Invalid credentials",
        });
      }
      return fail(500, {
        message: "Server error. Try again later.",
      });
    }

    throw redirect(303, "/");
  },

  signinGoogle: async ({ request, locals }) => {
    const { data, error: err } = await locals.supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        scopes: "https://www.googleapis.com/auth/userinfo.email",
        redirectTo: "http://localhost:5173/app/account/signingIn/",
      },
    });

    if (err) {
      if (err instanceof AuthApiError && err.status === 400) {
        return fail(400, {
          error: "Invalid credentials",
        });
      }
      return fail(500, {
        message: "Server error. Try again later.",
      });
    }
    console.log(data.url);
    throw redirect(303, data.url);
  },
};
