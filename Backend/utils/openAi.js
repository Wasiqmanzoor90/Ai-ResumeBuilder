import OpenAI from "openai";

const deepseek = new OpenAI({
    apiKey: process.env.DEEPSEEK_API_KEY,
    baseURL: "https://openrouter.ai/api/v1"
});

export const genrateAiresponse = async (userData) => {
    const prompt = `Generate a professional resume for the following details:
  Name: ${userData.name}
  Education: ${JSON.stringify(userData.education)}
  Experience: ${JSON.stringify(userData.experience)}
  Skills: ${userData.skills.join(", ")}
  Personal Info: ${JSON.stringify(userData.personalInfo)}

  Format it cleanly with section titles (Summary, Education, Experience, Skills).`;

    const response = await deepseek.chat.completions.create({
        model: "deepseek/deepseek-chat", // ✅ Correct OpenRouter format
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
    });
    return response.choices[0].message.content;
};