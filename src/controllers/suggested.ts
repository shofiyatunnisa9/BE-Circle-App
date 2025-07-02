import { Request, Response } from "express";
import { suggestFollow } from "../services/suggest";

export async function suggestedFollowController(req: Request, res: Response) {
  try {
    const userId = (req as any).user.id;
    if (!userId) {
      res.status(401).json({ message: "Please Login !" });
    }
    const suggestUsers = await suggestFollow(userId);
    res.status(200).json({ message: "Succes", suggestUsers });
  } catch (error) {
    res.status(500).json({ message: "Failed to get Suggest users" });
  }
}
