import { Request, Response } from "express";
import { getProfile } from "../services/profile";

export async function getProfileController(req: Request, res: Response): Promise<void> {
  try {
    const userId = (req as any).user.id;
    const user = await getProfile(userId);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to get profile", error });
  }
}
