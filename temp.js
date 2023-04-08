let content = `
1. What is a variable in computer science?
a) Words that mean other stuff
b) A type of computer program
c) A type of computer hardware
d) A type of computer file

2. What is the purpose of a variable in programming?
a) To store values that can be accessed and manipulated
b) To display information to the user
c) To run a program
d) To store information temporarily for quick access

3. What is the syntax for declaring a variable in most programming languages?
a) VariableName = Value
b) Value = VariableName
c) VariableName : Value
d) Value : VariableName

4. What is the difference between a variable and a constant?
a) Variables can be modified while constants cannot
b) Constants store values permanently while variables do not
c) Variables are only used in loops while constants are used in functions
d) There is no difference between a variable and a constant

5. What is the purpose of assigning a data type to a variable?
a) To restrict the type of values that can be stored in the variable
b) To make the program run faster
c) To make the variable more readable
d) To increase the amount of memory used by the variable

6. Which data type would you use to store a person's age?
a) Integer
b) String
c) Boolean
d) Float

7. What is the scope of a variable?
a) The part of the program where the variable can be accessed
b) The type of data that can be stored in a variable
c) The value assigned to a variable
d) The name given to a variable

8. What is the difference between a global and a local variable?
a) Global variables can be accessed from anywhere in the program while local variables can only be accessed within a specific block of code
b) Global variables are only used in loops while local variables are used in functions
c) Local variables are declared after global variables
d) There is no difference between a global and a local variable
`;

// class MultipeChoice {
//   question: string;
//   answers: Array<string>;
// }

let lines = content.split("\n");
console.log(lines);

let questions = [];
let q = [];
let questionRegex = /\d+. (.*)/;
let answerRegex = /\w\) (.*)/;
for (let i = 0; i < lines.length; i++) {
  let line = lines[i].replace(/(\r\n|\n|\r)/gm, "");
  let question = line.match(questionRegex);
  if (question) {
    if (q.length > 0) {
      questions.push(q);
    }
    q = [question[1]];
  }
  let answer = line.match(answerRegex);
  if (answer) {
    q.push(answer[1]);
  }
}

console.log(questions);
