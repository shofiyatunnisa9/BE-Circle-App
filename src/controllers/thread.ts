import { Request, Response } from "express";
import { threadSchema } from "../validations/thread";
import { createThread } from "../services/thread";

export async function threadController(req: Request, res: Response) {
  try {
    const userId = (req as any).user?.id;
    if (!userId) {
      res.status(401).json({ error: "Unouthorized" });
      return;
    }
    const threads = threadSchema.validate(req.body);
    if (!threads) {
      res.status(400).json({
        error: "Invalid input",
      });
      return;
    }

    const { content, images } = req.body;
    const newThread = createThread({
      userId,
      content,
      images,
    });

    res.status(201).json({ message: "Thread succes uploaded", newThread });
  } catch (error) {
    res.status(500).json({ error: "Failed post Thread" });
  }
}
