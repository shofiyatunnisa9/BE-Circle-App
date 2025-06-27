import Joi from "joi";

export const profileSchema = Joi.object({
  fullname: Joi.string(),
  username: Joi.string(),
  bio: Joi.string(),
  banner: Joi.string(),
  avatar: Joi.string(),
});
