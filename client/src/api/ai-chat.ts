import { apiClient } from "./client";

export type ChatResponse = {
  answer: string;
};

export const ChatApi = {
  async sendMessage(message: string): Promise<ChatResponse> {
    const response = await apiClient.post<ChatResponse>("/ai-chat/send-message", { message });
    return response.data;
  }
};
