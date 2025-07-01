import { Request, Response } from "express";
import { searchUsers } from "../services/search";

export async function searchController(req: Request, res: Response) {
  const query = req.query.q as string;
  const currentUserId = (req as any).user?.id;

  try {
    if (!query || query.trim().length < 2) {
      res.status(400).json({
        success: false,
        message: "Search query must be at least 2 characters long",
      });
      return;
    }

    const users = await searchUsers(query, currentUserId);

    const transformedUsers = users.map((user) => ({
      id: user.id,
      username: user.username,
      fullname: user.profile?.fullname || "",
      email: "",
      avatar: user.profile?.avatar || null,
    }));

    res.json({
      success: true,
      message: "Users found successfully",
      data: transformedUsers,
    });
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({
      success: false,
      message: "Search error",
    });
  }
}
