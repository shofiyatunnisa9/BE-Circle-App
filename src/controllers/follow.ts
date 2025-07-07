import { Request, Response } from "express";
import {
  getFollowing,
  getFollowers,
  getFollowCounts,
  followService,
} from "../services/follow";

// Follow atau unfollow user
export async function followController(req: Request, res: Response) {
  try {
    const followerId = (req as any).user.id;
    const { followingId } = req.body;

    if (!followerId) {
      res.status(401).json({ message: "Silakan login terlebih dahulu!" });
      return;
    }

    if (!followingId) {
      res
        .status(400)
        .json({ message: "ID user yang akan di-follow diperlukan" });
      return;
    }

    if (followerId === followingId) {
      res.status(400).json({ message: "Tidak bisa follow diri sendiri" });
      return;
    }

    const result = await followService(followerId, followingId);

    res.status(200).json({
      message: result.message,
      followed: result.followed,
    });
  } catch (error) {
    console.error("Error in toggleFollowController:", error);
    res.status(500).json({ message: "Gagal melakukan follow/unfollow" });
  }
}

// Ambil daftar following
export async function getFollowingController(req: Request, res: Response) {
  try {
    const userId = (req as any).user.id;

    if (!userId) {
      res.status(401).json({ message: "Silakan login terlebih dahulu!" });
      return;
    }

    const following = await getFollowing(userId);

    res.status(200).json({
      message: "Berhasil mengambil daftar following",
      following,
    });
  } catch (error) {
    console.error("Error in getFollowingController:", error);
    res.status(500).json({ message: "Gagal mengambil daftar following" });
  }
}

// Ambil daftar followers
export async function getFollowersController(req: Request, res: Response) {
  try {
    const userId = (req as any).user.id;

    if (!userId) {
      res.status(401).json({ message: "Silakan login terlebih dahulu!" });
      return;
    }

    const followers = await getFollowers(userId);

    res.status(200).json({
      message: "Berhasil mengambil daftar followers",
      followers,
    });
  } catch (error) {
    console.error("Error in getFollowersController:", error);
    res.status(500).json({ message: "Gagal mengambil daftar followers" });
  }
}

// Ambil count following dan followers
export async function getFollowCountsController(req: Request, res: Response) {
  try {
    const userId = (req as any).user.id;

    if (!userId) {
      res.status(401).json({ message: "Silakan login terlebih dahulu!" });
      return;
    }

    const counts = await getFollowCounts(userId);

    res.status(200).json({
      message: "Berhasil mengambil count follow",
      ...counts,
    });
  } catch (error) {
    console.error("Error in getFollowCountsController:", error);
    res.status(500).json({ message: "Gagal mengambil count follow" });
  }
}
