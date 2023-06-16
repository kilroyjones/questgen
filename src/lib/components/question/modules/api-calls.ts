import type {
  MultipleChoiceQuestionWithAnswers,
  QuestionStatus,
} from "$lib/models";

export async function getCollections(createdBy: string) {
  return await fetch("http://localhost:5173/api/collections/browse", {
    method: "POST",
    body: JSON.stringify({
      createdBy: createdBy,
    }),
    headers: {
      "content-type": "application/json",
    },
  });
}

export async function getQuestion(
  createdBy: string,
  questionStatus: QuestionStatus,
  collectionId: number
) {
  return await fetch("http://localhost:5173/api/question/get", {
    method: "POST",
    body: JSON.stringify({
      createdBy: createdBy,
      questionStatus: questionStatus,
      collectionId: collectionId,
    }),
    headers: {
      "content-type": "application/json",
    },
  });
}

export async function deleteQuestion(
  question: MultipleChoiceQuestionWithAnswers
) {
  return await fetch("http://localhost:5173/api/question/delete", {
    method: "DELETE",
    body: JSON.stringify({ id: question.id }),
    headers: {
      "content-type": "application/json",
    },
  });
}

export async function updateQuestion(
  question: MultipleChoiceQuestionWithAnswers
) {
  let resp = await fetch("http://localhost:5173/api/question/update", {
    method: "POST",
    body: JSON.stringify(question),
    headers: {
      "content-type": "application/json",
    },
  });
}

export async function approveQuestion(
  question: MultipleChoiceQuestionWithAnswers
) {
  return await fetch("http://localhost:5173/api/question/approve", {
    method: "POST",
    body: JSON.stringify(question),
    headers: {
      "content-type": "application/json",
    },
  });
}
