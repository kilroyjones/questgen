export async function getCollections() {
  return await fetch("http://localhost:5173/api/collections/browse", {
    method: "POST",
    body: JSON.stringify({}),
    headers: {
      "content-type": "application/json",
    },
  });
}
