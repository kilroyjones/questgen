-- CreateTable
CREATE TABLE "MultipleChoiceQuestion" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "question" TEXT
);

-- CreateTable
CREATE TABLE "MultipleChoiceAnswer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "question_id" INTEGER,
    "answer" TEXT,
    "is_correct" INTEGER,
    CONSTRAINT "MultipleChoiceAnswer_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "MultipleChoiceQuestion" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);
