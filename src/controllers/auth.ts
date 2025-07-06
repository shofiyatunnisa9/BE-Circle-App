import { Request, Response, NextFunction } from "express";
import { loginSchema, registerSchema } from "../validations/auth";
import {
  forgotService,
  loginService,
  registerService,
  resetService,
} from "../services/auth";
import { verifyToken } from "../utils/jwt";

export async function registerController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    await registerSchema.validateAsync(req.body);
    const user = await registerService(req.body);
    res.status(201).json(user);
  } catch (error: any) {
    next(error);
  }
}

export async function loginController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    await loginSchema.validateAsync(req.body);
    const token = await loginService(req.body);
    res.status(200).json({ message: "login succes", token });
  } catch (error: any) {
    next(error);
  }
}

export async function forgotController(req: Request, res: Response) {
  try {
    const { email } = req.body;
    const token = await forgotService(email);

    res.status(200).json({
      "code ": 200,
      status: "Succes",
      message: "use this link to reset password ",
      token,
    });
  } catch (error) {
    console.log(error);

    res.status(400).json({ message: "Failed" });
  }
}

export async function resetController(req: Request, res: Response) {
  try {
    const { token } = req.params;
    const { newPassword, confirmPass } = req.body;
    if (newPassword != confirmPass) throw new Error("Failed");
    const decoded = verifyToken(token);

    await resetService(decoded.id, newPassword);
    res.status(200).json({
      status: "Succes",
      data: {},
    });
  } catch (error) {
    res.status(400).json({ message: "error" });
  }
}
