import { apiConnector } from "./apiconnector";
import { ai } from "./apis";

export async function askAIReceptionist(chat) {
  try {
    const payload = { chat };
    const response = await apiConnector("POST", ai.ASK_AI_API, payload);
    
    if (response?.data?.success && response?.data?.reply) {
      return response.data.reply;
    }
    
    return "I am here to help with your room booking questions.";
  } catch (error) {
    console.error("AI API Error:", error);
    
    // Handle specific error cases
    if (error?.response) {
      const status = error.response.status;
      const message = error.response.data?.message;
      
      if (status === 404) {
        throw new Error("AI service endpoint not found. Please ensure the server is running and the route is configured correctly.");
      } else if (status === 500) {
        throw new Error(message || "AI service encountered an error. Please try again later.");
      } else if (status === 400) {
        throw new Error(message || "Invalid request. Please try asking your question differently.");
      } else {
        throw new Error(message || `Service error (${status}). Please try again.`);
      }
    } else if (error?.request) {
      throw new Error("Unable to reach the AI service. Please check your internet connection and ensure the server is running.");
    } else {
      throw new Error(error?.message || "An unexpected error occurred. Please try again.");
    }
  }
}
