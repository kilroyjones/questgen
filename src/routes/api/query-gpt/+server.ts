import { env } from "$env/dynamic/private";
import type { RequestHandler } from "./$types";
import { Configuration, OpenAIApi } from "openai";

console.log(env.PRIVATE_OPENAI_KEY);
const configuration = new Configuration({
  apiKey: env.PRIVATE_OPENAI_KEY,
});
console.log(configuration);
const openai = new OpenAIApi(configuration);
console.log(openai);

export const POST: RequestHandler = async ({ request }) => {
  let data = await request.json();
  console.log(data.content.substring(0, 100));
  console.log("Making a request!");
  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a computer system teacher" },
        {
          role: "user",
          content: `Given the following content, create 8 multiple choice questions for IGCSE Computer Science 
                    high school class. Make option (a), the first option, always the correct answer.
                    Content is as follows: variables are words that mean other stuff`,
        },
      ],
    });
    console.log(completion.data);
  } catch (error) {
    console.log(error);
    // if (error.response) {
    //   console.log(error.response.status);
    //   console.log(error.response.data);
    // } else {
    //   console.log(error.message);
    // }
  }
  return new Response(JSON.stringify({ status: "error" }));
};
