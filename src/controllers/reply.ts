import { Request, Response } from "express";
import { createReply, getReply } from "../services/reply";

export async function repliesController(req: Request, res: Response) {
  try {
    const userId = (req as any).user?.id;
    const { content, threadId } = req.body;

    // Validasi input
    if (!userId) {
      res.status(401).json({ error: "Please login!" });
      return;
    }

    if (!content || !threadId) {
      res.status(400).json({ error: "Content and threadId are required!" });
      return;
    }


    let imageUrl: string | undefined;
    if (req.file) {
      const baseUrl = `${req.protocol}://${req.get("host")}`;
      imageUrl = `${baseUrl}/uploads/${req.file.filename}`;
    }
    const newReplies = await createReply({
      userId,
      threadId,
      content,
      images: imageUrl,
    });

    res
      .status(201)
      .json({ message: "Reply successfully uploaded", newReplies });
    return;
  } catch (error) {
    console.error("Error in repliesController:", error);
    res.status(500).json({ message: "Server error while replying." });
    return;
  }
}
export async function repliesAllController(req: Request, res: Response) {
  const threadId = req.params.id;
  try {
    const replies = await getReply(threadId);
    res.status(200).json({ message: "Succes get reply", replies });
  } catch (error) {
    res.status(400).json({ message: "Failed" });
  }
}
