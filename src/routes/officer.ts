import { Router, Request, Response } from "express";
import { Server as SocketIOServer } from "socket.io";
import Token from "../models/token";
import { isAuthenticated } from "../middlewares/auth";

const router = Router();

export default (io: SocketIOServer) => {
  /* GET officer page */
  router.get("/", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const tokens = await Token.find().sort({ tokenNo: 1 });
      res.render("officer", { tokens, user: req.session.user });
    } catch (error) {
      res.status(500).send(error);
    }
  });

  /* Select token */
  router.post("/select-token/:id", async (req: Request, res: Response): Promise<any> => {
    try {
      const tokenId = req.params.id;
      console.log("➡️ Selecting next token:", tokenId);

      const token = await Token.findByIdAndUpdate(
        tokenId,
        { tokenState: "CLAIMED" },
        { new: true }
      );

      if (!token) {
        return res.status(404).json({ success: false, error: "Token not found" });
      }

      console.log("✅ Token claimed:", token);

      // Fetch all updated tokens
      const allTokens = await Token.find();

      // Emit updates to officers & displays
      io.emit("update-officer", allTokens);
      io.emit("token-claim", token);

      return res.json({ success: true, token });
    } catch (error) {
      console.error("❌ Error claiming token:", error);
      res.status(500).json({ success: false, error: "Server error" });
    }
  });

  return router;
};

export const setupOfficerSockets = (io: SocketIOServer) => {
  io.on("connection", (socket) => {
    console.log("✅ Officer dashboard connected via sockets.");

    socket.on("new-token", async () => {
      console.log("🔄 New token received, updating officer view...");
      const tokens = await Token.find().sort({ tokenNo: 1 });
      io.emit("update-officer", tokens);
    });

    socket.on("disconnect", () => {
      console.log("❌ Officer dashboard disconnected.");
    });
  });
};
