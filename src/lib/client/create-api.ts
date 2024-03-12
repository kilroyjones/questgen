import { PUBLIC_ADDRESS } from "$env/static/public";

/**
 * API call to create questions
 */
export async function createQuestions(
  collectionName: String,
  tags: Array<string>,
  content: string
) {
  return await fetch(`${PUBLIC_ADDRESS}/api/question/create`, {
    method: "POST",
    body: JSON.stringify({
      collectionName: collectionName,
      tags: tags,
      content: content,
    }),
    headers: {
      "content-type": "application/json",
    },
  });
}
