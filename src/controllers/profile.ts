import { Request, Response } from "express";
import {
  editProfile,
  getMedia,
  getProfileByUsername,
  getProfileWithFollowCounts,
  getUserThread,
  getUserThreadByUsername,
} from "../services/profile";
import { profileSchema } from "../validations/profile";

export async function getProfileController(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const userId = (req as any).user.id;
    const user = await getProfileWithFollowCounts(userId);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to get profile", error });
  }
}

export async function editProfileController(req: Request, res: Response) {
  try {
    const userId = (req as any).user.id;
    const { fullname, username, bio } = req.body;
    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const { error } = profileSchema.validate(req.body);
    if (error) {
      res.status(400).json({
        error: error.details[0].message,
      });
    }
    // Handle avatar dan banner dari req.files
    const baseUrl = `${req.protocol}://${req.get("host")}`;
    let avatarUrl: string | undefined;
    let bannerUrl: string | undefined;

    // Jika pakai multer.fields()
    const files = req.files as {
      avatar?: Express.Multer.File[];
      banner?: Express.Multer.File[];
    };

    if (files?.avatar?.[0]) {
      avatarUrl = `${baseUrl}/uploads/${files.avatar[0].filename}`;
    }

    if (files?.banner?.[0]) {
      bannerUrl = `${baseUrl}/uploads/${files.banner[0].filename}`;
    }

    const updatedProfiles = await editProfile({
      userId,
      fullname,
      username,
      bio,
      avatar: avatarUrl ?? "",
      banner: bannerUrl ?? "",
    });

    res.status(200).json({ message: "Profile Succes Update", updatedProfiles });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed update profile :(" });
  }
}
export async function getUserThreadController(req: Request, res: Response) {
  try {
    const userId = (req as any).user.id;

    const threadProfiles = await getUserThread(userId);

    res.json({ payload: threadProfiles });
  } catch (error) {
    res.status(500).json({ message: "Failed fetch datas" });
  }
}

export async function getMediaController(req: Request, res: Response) {
  try {
    const userId = (req as any).user.id;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const mediaProfile = await getMedia(userId);
    res.status(200).json({ message: "Succes", mediaProfile });
  } catch (error) {
    res.status(500).json({ message: "Failed to get Media" });
  }
}

export async function profileUsersController(req: Request, res: Response) {
  try {
    const { username } = req.params;
    const { currentUserId } = (req as any).user.id;
    const profileUser = await getProfileByUsername(username);

    if (!profileUser) {
      res.status(404).json({ message: "User not found!!" });
      return;
    }

    res.status(200).json({ code: "200", message: "Succes", profileUser });
  } catch (error) {
    res
      .status(500)
      .json({ code: "500", message: "Error get Profile by username" });
  }
}

export async function getThreadProfileByUsernameController(
  req: Request,
  res: Response
) {
  try {
    const { username } = req.params;
    const { currentUserId } = (req as any).user.id;
    const threadProfile = await getUserThreadByUsername(
      username,
      currentUserId
    );
    if (!threadProfile === null) {
      res.status(404).json({ code: "404", message: "User not Found!" });
    }
    res
      .status(200)
      .json({ code: "200", message: "Succes", payload: threadProfile });
  } catch (error) {
    res.status(400).json({ code: "400", message: "Failed fetch datas!" });
  }
}
