import Joi from "joi";

export const profileSchema = Joi.object({
  fullname: Joi.string().min(1).required().messages({
    "string.base": "Fullname harus berupa teks",
    "string.empty": "Fullname tidak boleh kosong",
    "any.required": "Fullname wajib diisi",
  }),
  username: Joi.string().min(3).required().messages({
    "string.base": "Username harus berupa teks",
    "string.empty": "Username tidak boleh kosong",
    "string.min": "Username minimal 3 karakter",
    "any.required": "Username wajib diisi",
  }),
  avatar: Joi.string().allow("", null).optional(), // bisa juga kosong/null
  banner: Joi.string().allow("", null).optional(),
  bio: Joi.string().max(300).allow("", null).optional(),
});
