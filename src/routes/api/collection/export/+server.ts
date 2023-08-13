import { PrismaClient } from "@prisma/client";
import type { MultipleChoiceQuestion, MultipleChoiceAnswer } from "@prisma/client";
import ExcelJS from "exceljs";

import type { RequestHandler } from "./$types";

const prisma = new PrismaClient();

export const POST: RequestHandler = async ({ request }) => {
  let data = await request.json();

  console.log(data);

  const workbook = new ExcelJS.Workbook();
  workbook.xlsx.readFile("static/quiz-templates/quizizz.xlsx").then(() => {
    const worksheet = workbook.getWorksheet(1); // or you can use the name of the worksheet

    let rows = [];
    for (const question of data.collection.questions) {
      let row = [];
      row.push(question.question);
      row.push("Multiple Choice");
      let answerNumber: number = 0;
      let count: number = 0;
      for (const answer of question.answers) {
        if (answer.isCorrect) {
          answerNumber = count;
        } else {
          row.push(answer.push);
        }
        count += 1;
      }
      row.push(answerNumber);
      row.push(30);
      row.push("");
      worksheet.addRow(row);
    }
    worksheet.eachRow((row, rowNumber) => {
      console.log("Row " + rowNumber + " = " + JSON.stringify(row.values));
    });
  });

  return new Response("");
};
