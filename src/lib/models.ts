import type { MultipleChoiceAnswer } from "@prisma/client";

export enum FileType {
  PDF,
}

export class FileData {
  id: number;
  name: string;
  content: string;
  fileType: FileType;
  tokenCount: number;

  constructor(id: number, name: string, content: string, fileType: FileType, tokenCount: number) {
    this.id = id;
    this.name = name;
    this.content = content;
    this.tokenCount = tokenCount;
    this.fileType = fileType;
  }
}

export class MultipleChoice {
  question: string;
  answers: Array<string>;

  constructor(question: string, answers: Array<string>) {
    this.question = question;
    this.answers = answers;
  }
}

export type Question = {
  id: number;
  question: string;
  answers: Array<MultipleChoiceAnswer>;
};
