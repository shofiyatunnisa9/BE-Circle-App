import { Request, Response } from "express";
import { likeThreads } from "../services/like";

export async function likeController(req: Request, res: Response) {
  try {
    // Ambil user ID dari token
    const userId = (req as any).user.id;
    const { threadId } = req.body;

    // Validasi input
    if (!threadId) {
      return res.status(400).json({ message: "Thread ID wajib diisi" });
    }

    // Proses like/unlike
    const result = await likeThreads(userId, threadId);

    // Kirim response
    res.status(200).json({
      success: true,
      message: result.message,
      liked: result.liked,
    });
  } catch (error) {
    console.error("Error saat like/unlike:", error);
    res.status(500).json({
      success: false,
      message: "Gagal melakukan like/unlike",
    });
  }
}
