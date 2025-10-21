const fetch = require("node-fetch"); // node-fetch v2

exports.handler = async (event) => {
  try {
    const { prompt } = JSON.parse(event.body);

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Generate a short, creative social media caption about: ${prompt}`,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();
    console.log("Gemini raw response:", JSON.stringify(data, null, 2));

    const caption =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No caption generated.";

    return {
      statusCode: 200,
      body: JSON.stringify({ caption }),
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ caption: "Error: Unable to connect to AI." }),
    };
  }
};
