import type { MultipleChoiceQuestionWithAnswers } from "$lib/models";

export async function approveQuestion(question: MultipleChoiceQuestionWithAnswers) {
  return await fetch("http://localhost:5173/api/question/approve", {
    method: "POST",
    body: JSON.stringify(question),
    headers: {
      "content-type": "application/json",
    },
  });
}

export async function getQuestion(filters: string, collectionId: number) {
  return await fetch("http://localhost:5173/api/question/get", {
    method: "POST",
    body: JSON.stringify({
      filters: filters,
      collectionId: collectionId,
    }),
    headers: {
      "content-type": "application/json",
    },
  });
}

export async function deleteQuestion(question: MultipleChoiceQuestionWithAnswers) {
  return await fetch("http://localhost:5173/api/question/delete", {
    method: "DELETE",
    body: JSON.stringify({ id: question.id }),
    headers: {
      "content-type": "application/json",
    },
  });
}

export async function updateQuestion(question: MultipleChoiceQuestionWithAnswers) {
  let resp = await fetch("http://localhost:5173/api/question/update", {
    method: "POST",
    body: JSON.stringify(question),
    headers: {
      "content-type": "application/json",
    },
  });
}
