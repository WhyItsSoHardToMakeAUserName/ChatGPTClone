import { gemini } from "../infrastructure/openai/AiClient";
import { ChatResponse } from "../types/ChatResponse";

class AiChatService {
  constructor() {}

  async sendMessage(message: string): Promise<ChatResponse> {
    try {
      const res = await gemini.models.generateContent({
        model: "gemini-2.5-flash",
        contents: message,
      });

      const text = res?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!text) {
        throw new Error("Empty response from Gemini");
      }

      return { answer: text };
    } catch (err) {
      console.error("Error in AiChatService.sendMessage:", {
        message,
        error: err instanceof Error ? err.message : err,
      });

      // Optionally rethrow a custom error or enrich it
      throw new Error("AI service failed to respond properly");
    }
  }
}

export default new AiChatService();
