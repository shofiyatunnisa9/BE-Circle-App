import { Request, Response } from "express";
import {
  editProfile,
  getMedia,
  getMediaByUsername,
  getProfileByUsername,
  getProfileWithFollowCounts,
  getUserThread,
  getUserThreadByUsername,
} from "../services/profile";
import { profileSchema } from "../validations/profile";
import { uploadToCloudinary } from "../utils/multer";
import { CloudinaryUploadResultType } from "../types";

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

interface ProfileFileFields {
  avatar?: Express.Multer.File[];
  banner?: Express.Multer.File[];
}

export async function editProfileController(req: Request, res: Response) {
  try {
    const userId = (req as any).user?.id;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const { fullname, username, bio } = req.body;

    const files = req.files as ProfileFileFields;

    let avatarUrl: string | null = null;
    let bannerUrl: string | null = null;

    if (files?.avatar?.[0]) {
      const result: CloudinaryUploadResultType = (await uploadToCloudinary(
        files.avatar[0].buffer,
        "circle-app/avatar"
      )) as CloudinaryUploadResultType;
      avatarUrl = result.secure_url;
    }

    if (files?.banner?.[0]) {
      const result: CloudinaryUploadResultType = (await uploadToCloudinary(
        files.banner[0].buffer,
        "circle-app/banner"
      )) as CloudinaryUploadResultType;
      bannerUrl = result.secure_url;
    }

    const updated = await editProfile({
      userId,
      fullname,
      username,
      bio,
      avatar: avatarUrl,
      banner: bannerUrl,
    });

    res.status(200).json({ message: "Profile updated", ...updated });
    return;
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Internal server error" });
    return;
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

export async function getMediaByUsernameController(
  req: Request,
  res: Response
) {
  try {
    const { username } = req.params;
    const mediaProfile = await getMediaByUsername(username);
    if (mediaProfile === null) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json({ message: "Succes", mediaProfile });
  } catch (error) {
    res.status(500).json({ message: "Failed to get Media" });
  }
}
