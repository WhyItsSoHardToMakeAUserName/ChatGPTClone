import { Request, Response } from "express";
import AiChatService from "../../services/AiChatService";

class AiChatController {
  constructor() {}

  async handleChat(req: Request, res: Response) {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    try {
      const reply = await AiChatService.sendMessage(message);
      return res.json(reply);
    } catch (err) {
      console.error('Error in handleChat:', { message, error: err });
      return res.status(500).json({ error: "Something went wrong" });
    }
  }
}

export default new AiChatController();