import { PrismaClient } from "@prisma/client";
import type { Collection, MultipleChoiceQuestion, MultipleChoiceAnswer, Tag } from "@prisma/client";
import ExcelJS from "exceljs";

import type { RequestHandler } from "./$types";

const prisma = new PrismaClient();

export const POST: RequestHandler = async ({ locals, request }) => {
  let data = await request.json();

  const session = await locals.getSession();

  if (session && data.collectionId && data.service) {
    console.log(session.user.id, data.service, data.collectionId);
    let collection = await getCollection(session.user.id, data.collectionId);

    //TODO: handle error

    let result: object | null = null;
    if (collection) {
      switch (data.service) {
        case "Quizizz":
          result = processQuizizz(session.user.id, collection);
      }
    }
  }

  return new Response("");
};

async function getCollection(userId: string, collectionId: number) {
  return await prisma.collection.findFirst({
    where: {
      id: collectionId,
      userId: userId,
    },
    include: {
      questions: {
        include: {
          answers: true,
        },
      },
    },
  });
}

async function processQuizizz(
  userId: String,
  collection:
    | Collection & {
        questions: (MultipleChoiceQuestion & { answers: MultipleChoiceAnswer[] })[];
      }
) {
  try { 
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile("static/quiz-templates/quizizz.xlsx");
  const worksheet = workbook.getWorksheet(1); // or you can use the name of the worksheet

  let rowCount = 3;

  for (const question of collection.questions) {
    let row = [question.question];
    row.push("Multiple Choice");

    let answerNumber: number = 0;
    let count: number = 0;
    for (const answer of question.answers) {
      if (answer.isCorrect) {
        answerNumber = count + 1;
      }
      row.push(answer.answer);
      count += 1;
    }

    for (let i = count; i < 5; i++) {
      row.push("");
    }

    row.push(answerNumber.toString());
    row.push("30");
    row.push("");
    worksheet.insertRow(rowCount, row);
  }

  // worksheet.eachRow((row, rowNumber) => {
  //   console.log("Row " + rowNumber + " = " + JSON.stringify(row.values));
  // });
  console.log("DIR: ", process.cwd());
  const sheet = workbook.getWorksheet(1);
  sheet.eachRow((row, rowNumber) => {
    console.log("Row " + rowNumber + " = " + JSON.stringify(row.values));
  });

  let filename: String = collection.name + "-" + Date.now().toString(36);
await workbook.xlsx.writeFile(`./uploads/${filename}.xlsx`);
} catch(Exception e) {
  
}

  return {}
}
