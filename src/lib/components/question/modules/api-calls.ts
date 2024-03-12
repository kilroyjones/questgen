import { PUBLIC_ADDRESS } from "$env/static/public";
import type { MultipleChoiceQuestionWithAnswers, QuestionStatus } from "$lib/models";

export async function getCollections(userId: string) {
  return await fetch("${PUBLIC_ADDRESS}/api/collections/browse", {
    method: "POST",
    body: JSON.stringify({
      userId: userId,
    }),
    headers: {
      "content-type": "application/json",
    },
  });
}

export async function getQuestion(
  userId: string,
  questionStatus: QuestionStatus,
  collectionId: number
) {
  return await fetch(`${PUBLIC_ADDRESS}/api/question/get`, {
    method: "POST",
    body: JSON.stringify({
      userId: userId,
      questionStatus: questionStatus,
      collectionId: collectionId,
    }),
    headers: {
      "content-type": "application/json",
    },
  });
}

export async function deleteQuestion(question: MultipleChoiceQuestionWithAnswers) {
  return await fetch(`${PUBLIC_ADDRESS}/api/question/delete`, {
    method: "DELETE",
    body: JSON.stringify({ id: question.id }),
    headers: {
      "content-type": "application/json",
    },
  });
}

export async function deleteQuestions(
  questions: Array<MultipleChoiceQuestion & { answers: MultipleChoiceAnswer[] }>
) {
  let ids = questions.map(question => question.id);
  return await fetch(`${PUBLIC_ADDRESS}/api/question/delete`, {
    method: "DELETE",
    body: JSON.stringify({
      ids: ids,
    }),
    headers: {
      "content-type": "application/json",
    },
  });
}

export async function updateQuestion(question: MultipleChoiceQuestionWithAnswers) {
  let resp = await fetch(`${PUBLIC_ADDRESS}/api/question/update`, {
    method: "POST",
    body: JSON.stringify(question),
    headers: {
      "content-type": "application/json",
    },
  });
}

export async function approveQuestion(question: MultipleChoiceQuestionWithAnswers) {
  return await fetch(`${PUBLIC_ADDRESS}/api/question/approve`, {
    method: "POST",
    body: JSON.stringify(question),
    headers: {
      "content-type": "application/json",
    },
  });
}
