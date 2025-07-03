import { Request, Response } from "express";
import { likeThreads } from "../services/like";
export async function likeController(req: Request, res: Response) {
  try {
    const userId = (req as any).user.id;
    const { threadId } = req.body;
    if (!threadId) {
      res.status(400).json({ message: "Thread ID is Required" });
      return;
    }

    const result = await likeThreads(userId, threadId);
    res
      .status(200)
      .json({ message: result.liked ? "Liked Thread" : "Unliked thread" });
    return;
  } catch (error) {
    res.status(400).json({ message: "Failed to like thread" });
  }
}
