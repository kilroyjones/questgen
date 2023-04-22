let content = `
What is a variable in computer science?
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

let content2 = `1. Which number system is used by computers to represent data?
a) Binary
b) Denary
c) Hexadecimal
d) Both a and b

What are the basic building blocks of all computers?
a) Binary number system
b) Denary number system
c) Hexadecimal number system
d) None of the above

3. What is the purpose of converting data into binary format?
a) So that it can be processed by computers
b) To make it easier for humans to read and understand
c) To save storage space
d) None of the above

4. How are switches represented in the binary number system?
a) ON position: 1, OFF position: 0
b) ON position: 0, OFF position: 1
c) Both ON and OFF positions are represented by 1
d) Both ON and OFF positions are represented by 0

5. Which of the following number systems is NOT used by computers?
a) Binary
b) Denary
c) Octal
d) Hexadecimal

6. What is the purpose of using hexadecimal for data representation?
6. What is the purpose of using hexadecimal for data representation?
6. What is the purpose of using hexadecimal for data representation?
6. What is the purpose of using hexadecimal for data representation?
6. What is the purpose of using hexadecimal for data representation?
a) It allows for more compact representation of numbers compared to binary

7. What is overflow in binary addition?
a) When the result of an addition exceeds the number of bits allocated for it
b) When the result of an addition is negative
c) When the result of an addition is zero
d) None of the above
a) To represent both positive and negative binary numbers
b) To convert decimal numbers into binary
c) To perform logical binary shifts
d) None of the above
`;

// class MultipeChoice {
//   question: string;
//   answers: Array<string>;
// }

let lines = content2.split("\n");

let questions = [];
let currentQuestion = [];
let answerRegex = /([A-Za-z][.)]) (.+)/;
let questionRegex = /^\d+[.)]/;

for (let i = 0; i < lines.length; i++) {
  let line = lines[i].replace(/(\r\n|\n|\r)/gm, "");
  let result = line.match(answerRegex);
  if (result) {
    if (currentQuestion.length > 0) {
      currentQuestion.push(result[2]);
    }
  } else if (line.length > 3) {
    if (currentQuestion.length > 1) {
      questions.push(currentQuestion);
    }

    if (line.match(questionRegex)) {
      line = line.substring(line.indexOf(" ") + 1);
    }
    currentQuestion = [line];
  }
}
if (currentQuestion.length > 0) {
  questions.push(currentQuestion);
}
console.log(questions);
