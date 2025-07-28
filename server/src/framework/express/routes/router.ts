import { Router } from "express";
import aiChatRouter from "./AiChat.router";

const router = Router()

router.use("/ai-chat" ,aiChatRouter)

export default router