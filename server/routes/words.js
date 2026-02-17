import { Router } from "express";
import wordController from "../controllers/wordController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router()


router.get("/", authMiddleware, wordController.getAllWords);

router.post("/", authMiddleware, wordController.addWord);

router.put("/:id", authMiddleware, wordController.updateWord);

router.delete("/:id", authMiddleware, wordController.deleteWord);


export default router