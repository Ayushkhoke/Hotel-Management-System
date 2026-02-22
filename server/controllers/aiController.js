// const { askGemini } = require("../services/aiService");

// exports.handleAI = async (req, res) => {
//   try {
//     const { message } = req.body;

//     if (!message) {
//       return res.status(400).json({
//         success: false,
//         message: "Message is required"
//       });
//     }

//     const reply = await askGemini(message);

//     res.status(200).json({
//       success: true,
//       reply
//     });

//   } catch (error) {
//     console.error("AI Error:", error.message);

//     res.status(500).json({
//       success: false,
//       message: "AI service failed"
//     });
//   }
// };


// const { askGemini } = require("../services/aiService");

// exports.handleAI = async (req, res) => {
//   try {
//     const { chat } = req.body;

//     if (!chat || !Array.isArray(chat)) {
//       return res.status(400).json({
//         success: false,
//         message: "Chat history is required"
//       });
//     }

//     const reply = await askGemini(chat);

//     res.status(200).json({
//       success: true,
//       reply
//     });

//   } catch (error) {
//     console.error("AI Error:", error.message);

//     res.status(500).json({
//       success: false,
//       message: "AI service failed"
//     });
//   }
// };







