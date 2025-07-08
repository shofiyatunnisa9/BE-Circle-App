// import multer from "multer";
// const storage = multer.diskStorage({
//   destination: "src/uploads",
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

// export const upload = multer({
//   storage,
// });

// // Middleware untuk upload avatar dan banner sekaligus
// export const uploadProfileImage = upload.fields([
//   { name: "avatar", maxCount: 1 },
//   { name: "banner", maxCount: 1 },
// ]);

import { cloudinary } from "./cloudinary";

export function uploadToCloudinary(buffer: Buffer, folder: string) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    // Kirim buffer ke stream Cloudinary
    stream.end(buffer);
  });
}
