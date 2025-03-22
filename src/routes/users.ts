import { Router, Request, Response, static as staticfile } from "express";
import User, { IUser } from "../models/user";
import session from "express-session";
import path from "path";

const router = Router();

// Configure session middleware
router.use(
  session({
    secret: "your_secret_key", // Change this to a secure key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to `true` in production with HTTPS
  })
);

// Login Page
router.get("/login", (req: Request, res: Response) => {
  if (req.session.user) {
    switch (req.session.user.role) {
      case "officer":
        return res.redirect("/officer");
      case "agent":
        return res.redirect("/agent");
      case "display":
        return res.redirect("/display");
    }
  }
  res.render("login");
});

// Registration Page
router.get("/register", (req: Request, res: Response) => {
  res.render("registration");
});

// Handle Login
router.post("/login", async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    // Find user by username and password (Note: Hash passwords in production)
    const user: IUser | null = await User.findOne({ username, password });

    if (!user) {
      return res.render("login", { message: "Invalid Username or Password" });
    }

    // Store user in session
    req.session.user = user;

    // Redirect based on role
    switch (user.role) {
      case "officer":
        return res.redirect("/officer");
      case "agent":
        return res.redirect("/agent");
      case "display":
        return res.redirect("/display");
      default:
        return res.redirect("/login");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// Handle Registration
router.post("/register", async (req: Request, res: Response) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.render("registration", { message: "User Registered Successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error registering user");
  }
});

// Logout
router.get("/logout", (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
    }
    res.redirect("/users/login");
  });
});

export default router;
