import express from "express"
import AiChatController from "../../../interfaces/controllers/AiChat.controller"

const aiChatRouter = express.Router()

aiChatRouter.post("/send-message",AiChatController.handleChat)

export default aiChatRouter