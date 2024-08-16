import { Request, Response, NextFunction } from "express";

import sessionService from "../services/session";

async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const sessionId = req.cookies?.sessionId;

  if (!sessionId)
    return res.status(401).json({
      message: "You are not authorized to access this resource",
    });

  try {
    const sessionEntry = await sessionService.findUserForASessionId(sessionId);

    if (!sessionEntry || !sessionEntry.length)
      return res.status(401).json({
        message: "You are not authorized to access this resource",
      });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }

  next();
}

export default authMiddleware;
