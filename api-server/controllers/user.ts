import { Request, Response } from "express";

import userService from "../services/user";

async function signUp(req: Request, res: Response) {
  const email = req.body?.email.toLowerCase();
  const password = req.body?.password;

  if (!email)
    res.status(400).json({
      message: "email field is required",
    });

  if (!password)
    res.status(400).json({
      message: "password field is required",
    });

  await userService.signUp(email, password);

  res.status(201).json({
    message: "user is created",
  });
}

async function signIn(req: Request, res: Response) {
  const email = req.body?.email;
  const password = req.body?.password;

  if (!email)
    res.status(400).json({
      message: "email field is required",
    });

  if (!password)
    res.status(400).json({
      message: "password field is required",
    });

  const response = await userService.signIn(email, password);

  if (response.status === 200)
    return res
      .cookie("sessionId", response.sessionId)
      .status(response.status)
      .json({
        message: response.message,
      });

  return res.status(response.status).json({
    message: response.message,
  });
}

export default {
  signUp,
  signIn,
};
