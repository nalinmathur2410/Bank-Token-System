import { Router, Request, Response } from "express";
import { Server as SocketIOServer } from "socket.io";
import { isAuthenticated } from "../middlewares/auth";

const router = Router();

export default (io: SocketIOServer) => {
  router.get("/", isAuthenticated, async (req: Request, res: Response) => {
    res.render("display", { user: req.session.user });
  });

  return router;
};

export const setupDisplaySockets = (io: SocketIOServer) => {
  io.on("connection", (socket) => {
    console.log("✅ Display screen connected.");

    socket.on("disconnect", () => {
      console.log("❌ Display disconnected.");
    });

    socket.on("token-claim", async (tokenId) => {
      console.log("🔔 Display received token-claim event:", tokenId);
      io.emit("update-display-token", tokenId);
    });
  });
};
