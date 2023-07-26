/**
 * API call to create questions
 */
export async function createQuestions(
  collectionName: String,
  tags: Array<string>,
  content: string
) {
  return await fetch("http://localhost:5173/api/question/create", {
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
