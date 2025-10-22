// kompatibel dengan Netlify CLI lokal: gunakan node-fetch v2 dan CommonJS
const fetch = require("node-fetch");

exports.handler = async (event) => {
  try {
    const body = event.body ? JSON.parse(event.body) : {};
    const prompt = (body.prompt || "").trim();

    if (!prompt) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing prompt" }),
      };
    }

    // deteksi apakah user ingin 'how-to' atau caption
    const isHowTo = /^(how to|what is|explain|steps?)/i.test(prompt);

    const aiPrompt = isHowTo
      ? `The user wants to learn something. Give a clear, simple, step-by-step answer for: "${prompt}". Keep it concise and easy to follow.`
      : `The user wants creative short social media captions. Generate 3 catchy, creative captions related to: "${prompt}". Make them sound natural, fun, and engaging. Return only the captions separated by new lines (no markdown).`;

    // PENTING: pastikan model dan path ini sesuai list model yang kamu lihat
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

    const resp = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: aiPrompt }] }],
      }),
      // optionally: timeout, etc.
    });

    // baca teks raw dulu (antisipasi server non-json / empty)
    const raw = await resp.text();
    let data;
    try {
      data = raw ? JSON.parse(raw) : null;
    } catch (e) {
      console.error("Non-JSON response from Gemini (raw):", raw);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Invalid response from AI (non-JSON)." }),
      };
    }

    console.log("Gemini raw response:", JSON.stringify(data, null, 2));

    // Ambil teks dari beberapa kemungkinan struktur
    let aiText =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      data?.candidates?.[0]?.output ||
      data?.text ||
      null;

    if (!aiText) {
      // kalau API balik error, lempar pesan error yang jelas
      if (data?.error) {
        console.error("Gemini API error:", data.error);
        return {
          statusCode: 500,
          body: JSON.stringify({ error: `AI error: ${data.error.message || JSON.stringify(data.error)}` }),
        };
      }

      return {
        statusCode: 200,
        body: JSON.stringify({ caption: "No caption generated." }),
      };
    }

    aiText = aiText.trim();

    return {
      statusCode: 200,
      body: JSON.stringify({ caption: aiText }),
    };
  } catch (error) {
    console.error("Function error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message || "Unknown server error" }),
    };
  }
};
