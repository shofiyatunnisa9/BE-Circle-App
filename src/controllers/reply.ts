import { Request, Response } from "express";
import { createReply, getReply } from "../services/reply";

export async function repliesController(req: Request, res: Response) {
  try {
    const userId = (req as any).user?.id;
    const { content, threadId } = req.body;

    if (!userId || !content || !threadId) {
      res.status(401).json({ error: "PLease Login!" });
      return;
    }

    let imageUrls = null;
    if (req.file) {
      const baseUrl = `${req.protocol}://${req.get("host")}`;
      imageUrls = `${baseUrl}/uploads/${req.file.filename}`;
    }
    const newReplies = await createReply({
      userId,
      threadId,
      content,
      images: imageUrls ?? undefined,
    });

    res.status(201).json({ message: "Reply succes uploaded", newReplies });
  } catch (error) {
    res.status(400).json({ message: "Error Reply" });
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
