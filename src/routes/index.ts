import { Router, Request, Response } from "express";

const router = Router();

/* GET home page */
router.get("/", (req: Request, res: Response) => {
  res.redirect("/users/login");
});

export default router;
