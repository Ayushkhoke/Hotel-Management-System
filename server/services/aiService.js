const axios = require("axios");

const keys = process.env.GEMINI_KEYS
  ? process.env.GEMINI_KEYS.split(",").map((k) => k.trim()).filter(Boolean)
  : [];

async function askGemini(chat) {
  if (!keys.length) {
    return "AI is not configured yet. Please add GEMINI_KEYS in server .env.";
  }

  const normalizedChat = (Array.isArray(chat) ? chat : [])
    .filter((msg) => msg && typeof msg.text === "string" && msg.text.trim())
    .slice(-20)
    .map((msg) => ({
      role: msg.role === "ai" ? "model" : "user",
      parts: [{ text: msg.text.trim() }],
    }));

  if (!normalizedChat.length) {
    return "Please ask your hotel-related question.";
  }

  const receptionistInstruction = [
    "You are an AI receptionist for our hotel management system.",
    "Rules:",
    "- Sound warm, natural, and professional like a real front-desk receptionist.",
    "- Keep responses clear, concise, and conversational.",
    "- Help with ALL hotel-related questions including:",
    "  * ROOM BOOKING: Availability, rates, types (Single/Double/Deluxe/Suite), capacity, check-in/out",
    "  * TABLE BOOKING: Restaurant reservations, time slots (morning/afternoon/evening/night), table capacity, dining hours",
    "  * MENU & DINING: Food items, prices, cuisines, dietary options, room service, restaurant timings",
    "  * HOTEL AMENITIES: Pool, gym, spa, parking, WiFi, business center, etc.",
    "  * HOTEL POLICIES: Check-in/out times, cancellation, payment, pets, smoking",
    "  * LOCAL INFO: Attractions, directions, transportation, weather",
    "  * SPECIAL REQUESTS: Extra towels, wake-up calls, luggage storage",
    "  * EVENTS: Conference facilities, banquet halls, wedding venues",
    "- For ROOM BOOKING queries:",
    "  * Ask questions one by one: check-in date, check-out date, guests, budget, room type",
    "  * Wait for each answer before asking next question",
    "  * Never ask multiple questions in one reply",
    "- For TABLE BOOKING queries:",
    "  * Ask: dining date, time slot (morning/afternoon/evening/night), number of guests",
    "  * Inform about availability for requested slot",
    "- For MENU queries:",
    "  * Describe available dishes, prices, and specialties",
    "  * Suggest items based on preferences (vegetarian, seafood, desserts, etc.)",
    "  * Provide information about dining hours and room service",
    "- For general questions, provide helpful information about typical hotel services.",
    "- If you don't have specific information, acknowledge politely and offer to connect with staff.",
    "- Do not answer unrelated harmful/illegal requests.",
  ].join("\n");

  const requestContents = [
    {
      role: "user",
      parts: [{ text: receptionistInstruction }],
    },
    ...normalizedChat,
  ];

  for (let i = 0; i < keys.length; i += 1) {
    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${keys[i]}`,
        {
          contents: requestContents,
          generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 220,
          },
        }
      );

      const text = response?.data?.candidates?.[0]?.content?.parts
        ?.map((part) => part?.text || "")
        .join("")
        .trim();
      return text || "I can help with room booking, pricing, and hotel information.";
    } catch (error) {
      const status = error?.response?.status;
      const apiMessage = error?.response?.data?.error?.message || error.message;

      if (status === 429) {
        if (i === keys.length - 1) {
          const retryInfo = error?.response?.data?.error?.details?.find(
            (d) => d["@type"] === "type.googleapis.com/google.rpc.RetryInfo"
          );
          const retryDelay = retryInfo?.retryDelay || "a short while";
          throw new Error(
            `AI quota exceeded. Please retry after ${retryDelay}, or add billing / another Gemini key.`
          );
        }

        continue;
      }

      if (status === 401 || status === 403) {
        throw new Error("Gemini API key is invalid or unauthorized. Check GEMINI_KEYS in server .env.");
      }

      if (i === keys.length - 1) {
        throw new Error(apiMessage || "All Gemini API keys failed.");
      }
    }
  }

  return "I can help with room booking, pricing, and hotel information.";
}

module.exports = { askGemini };
