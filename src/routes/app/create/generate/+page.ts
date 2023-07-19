import type { PageLoad } from "./$types";
import {
  collectionName,
  isCollectionNew,
  questionCount,
  stagedContentInfo,
  tags,
} from "$lib/stores/create";
import { redirect } from "@sveltejs/kit";
import { get } from "svelte/store";

export const load = (async ({ fetch }) => {
  // If the collection is a new
  let content = await Object.values(get(stagedContentInfo)).reduce(
    (acc, value) => acc + "\n" + value.content,
    ""
  );
  if (get(isCollectionNew)) {
    // TODO: Add error handling for all other variables to make sure everything is being submitted.
    // Provide feedback on the processing page.
    let response = await fetch("http://localhost:5173/api/collections/create", {
      method: "POST",
      body: JSON.stringify({
        name: get(collectionName),
        content: content,
        tags: get(tags),
        questionCount: get(questionCount),
      }),
      headers: {
        "content-type": "application/json",
      },
    });
  }
  return {};
}) satisfies PageLoad;
