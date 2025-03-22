import { Router, Request, Response } from "express";
import { Server as SocketIOServer } from "socket.io";
import Token from "../models/token"; 
import { isAuthenticated } from "../middlewares/auth";

const router = Router();

export default (io: SocketIOServer) => {
  router.get("/", isAuthenticated, async (req: Request, res: Response) => {
    res.render("agent", { user: req.session.user });
  });

  router.post("/generate-token", async (req: Request, res: Response) => {
    try {
      const lastToken = await Token.findOne().sort({ tokenNo: -1 });
      const newTokenNo = lastToken ? lastToken.tokenNo + 1 : 1;

      const newToken = new Token({
        ...req.body,
        tokenNo: newTokenNo,
        tokenState: "NEW",
      });
      await newToken.save();

      const updatedTokens = await Token.find().sort({ tokenNo: 1 });
      io.emit("update-officer", updatedTokens);

      res.redirect("/agent");

    } catch (err) {
      console.error("❌ Error generating token:", err);
      res.status(500).send("Error generating token");
    }
  });

  return router;
};
