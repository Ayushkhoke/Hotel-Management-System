const { askGemini } = require("../services/aiService");

exports.handleAI = async (req, res) => {
	try {
		const { chat, question } = req.body || {};

		let normalizedChat = [];

		if (Array.isArray(chat) && chat.length > 0) {
			normalizedChat = chat
				.filter((msg) => msg && typeof msg.text === "string" && msg.text.trim())
				.map((msg) => ({
					role: msg.role === "ai" ? "ai" : "user",
					text: msg.text.trim(),
				}));
		} else if (typeof question === "string" && question.trim()) {
			normalizedChat = [{ role: "user", text: question.trim() }];
		}

		if (!normalizedChat.length) {
			return res.status(400).json({
				success: false,
				message: "Please provide a question or chat history.",
			});
		}

		const reply = await askGemini(normalizedChat);

		return res.status(200).json({
			success: true,
			reply,
		});
	} catch (error) {
		console.error("AI Controller Error:", error.message);

		// Send user-friendly error message
		return res.status(500).json({
			success: false,
			message: error.message || "AI service is temporarily unavailable. Please try again later.",
		});
	}
};







