import type { PageLoad } from "./$types";
import { collectionName, stagedContentInfo } from "$lib/stores/create";
import { redirect } from "@sveltejs/kit";
import { get } from "svelte/store";

export const load = (({ params }) => {
  if (get(collectionName) == "") {
    throw redirect(307, "/app/collection/create/select");
  }

  return {};
}) satisfies PageLoad;
