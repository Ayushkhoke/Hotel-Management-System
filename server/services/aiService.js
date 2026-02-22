// const axios = require("axios");

// const keys = process.env.GEMINI_KEYS
//   ? process.env.GEMINI_KEYS.split(",").map(k => k.trim())
//   : [];

// if (!keys.length) {
//   throw new Error("No Gemini API keys found.");
// }

// async function askGemini(message) {

//   for (let i = 0; i < keys.length; i++) {
//     try {
//       console.log(`Trying Gemini Key ${i + 1}`);

//     //   const response = await axios.post(
//     //     `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${keys[i]}`,
//     //     {
//     //       contents: [
//     //         {
//     //           role: "user",
//     //           parts: [{ text: message }]
//     //         }
//     //       ]
//     //     }
//     //   );

//     const response = await axios.post(
//   `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${keys[i]}`,
//   {
//     contents: [
//       {
//         role: "user",
//         parts: [
//           {
//             text: `
// You are an AI receptionist for our hotel management system.

// Rules:
// - Be short and professional.
// - Do not give long explanations.
// - Ask only necessary details.
// - Focus only on our hotel rooms.
// - Do not act like a travel website.

// User message: ${message}
// `
//           }
//         ]
//       }
//     ],
//     generationConfig: {
//       temperature: 0.3,
//       maxOutputTokens: 200
//     }
//   }
// );
//       console.log("Success with key", i + 1);

//       return response.data.candidates[0].content.parts[0].text;

//     } catch (error) {
//       console.error(`Key ${i + 1} failed:`, error.response?.data || error.message);

//       if (i === keys.length - 1) {
//         throw new Error("All Gemini API keys failed.");
//       }
//     }
//   }
// }

// async function listModels() {
//   const key = process.env.GEMINI_KEYS.split(",")[0];

//   const res = await axios.get(
//     `https://generativelanguage.googleapis.com/v1/models?key=${key}`
//   );

//   console.log(res.data);
// }

// listModels();

// module.exports = { askGemini };









// const axios = require("axios");

// const keys = process.env.GEMINI_KEYS
//   ? process.env.GEMINI_KEYS.split(",").map(k => k.trim())
//   : [];

// if (!keys.length) {
//   throw new Error("No Gemini API keys found.");
// }

// async function askGemini(chat) {

//   for (let i = 0; i < keys.length; i++) {
//     try {
//       console.log(`Trying Gemini Key ${i + 1}`);

//       const response = await axios.post(
//         `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${keys[i]}`,
//         {
//           contents: chat.map(msg => ({
//             role: msg.role === "ai" ? "model" : "user",
//             parts: [{ text: msg.text }]
//           })),
//           generationConfig: {
//             temperature: 0.3,
//             maxOutputTokens: 200
//           }
//         }
//       );

//       console.log("Success with key", i + 1);

//       return response.data.candidates[0].content.parts[0].text;

//     } catch (error) {

//       console.error(`Key ${i + 1} failed:`, error.response?.data || error.message);

//       if (i === keys.length - 1) {
//         throw new Error("All Gemini API keys failed.");
//       }
//     }
//   }
// }

// module.exports = { askGemini };