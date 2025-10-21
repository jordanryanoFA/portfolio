import fetch from 'node-fetch';

export async function handler(event, context) {
  try {
    const { prompt } = JSON.parse(event.body);

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            { parts: [{ text: `Write a short, catchy social media caption about: ${prompt}` }] }
          ]
        })
      }
    );

    const data = await response.json();
    const caption = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No caption generated.";

    return {
      statusCode: 200,
      body: JSON.stringify({ caption })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ caption: "Error generating caption." })
    };
  }
}
