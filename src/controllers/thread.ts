import { Request, Response } from "express";
import { threadSchema } from "../validations/thread";
import {
  createThread,
  getThread,
  getThreadById,
  deleteThread,
  updateThread,
} from "../services/thread";

export async function threadController(req: Request, res: Response) {
  try {
    const userId = (req as any).user?.id;
    const { content } = req.body;

    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    // Perbaiki validasi Joi
    const { error } = threadSchema.validate(req.body);
    if (error) {
      res.status(400).json({
        error: error.details[0].message,
      });
      return;
    }

    // Cek file
    let imageUrls = null;
    if (req.file) {
      const baseUrl = `${req.protocol}://${req.get("host")}`;
      imageUrls = `${baseUrl}/uploads/${req.file.filename}`;
    }

    const newThread = await createThread({
      userId,
      content,
      images: imageUrls, // null jika tidak ada file
    });

    res.status(201).json({ message: "Thread succes uploaded", newThread });
  } catch (error) {
    res.status(500).json({ error: "Failed post Thread" });
  }
}

export async function threadAllController(req: Request, res: Response) {
  try {
    const currentUserId = (req as any).user?.id;
    const threads = await getThread(currentUserId);
    const payload = threads.map((thread) => ({
      id: thread.id,
      content: thread.content,
      images: thread.images,
      createdAt: thread.createdAt,
      username: thread.user.username,
      fullname: thread.user.profile?.fullname,
      avatar: thread.user.profile?.avatar,
      isLiked: thread.isLiked,
      likeCount: thread.likeCount,
      replyCount: thread.replyCount,
    }));

    res.status(200).json({ message: "All Thread fetched", payload });
  } catch (error) {
    console.error("Thread controller error:", error);
    res.status(400).json({ message: "Failed get datas" });
  }
}

export async function threadByIdController(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const currentUserId = (req as any).user?.id;
    const thread = await getThreadById(id, currentUserId);
    if (!thread) {
      res.status(404).json({ message: "Thread not found" });
      return;
    }
    res.status(200).json({ message: "Thread fetched", thread });
  } catch (error) {
    res.status(500).json({ message: "Failed to get thread" });
  }
}

export async function deleteThreadController(req: Request, res: Response) {
  try {
    const { id } = req.params;
    await deleteThread(id);
    res.status(200).json({ message: "Thread deleted" });
  } catch (error) {
    res.status(404).json({ message: "Thread not found or failed to delete" });
  }
}

export async function updateThreadController(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { content, images } = req.body;
    const updated = await updateThread(id, { content, images });
    res.status(200).json({ message: "Thread updated", thread: updated });
  } catch (error) {
    res.status(404).json({ message: "Thread not found or failed to update" });
  }
}
