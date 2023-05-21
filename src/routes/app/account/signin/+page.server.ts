import { AuthApiError } from "@supabase/supabase-js";
import { fail, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";

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
      },
    });
    console.log(data, err);

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

    throw redirect(303, data.url);
  },
};
