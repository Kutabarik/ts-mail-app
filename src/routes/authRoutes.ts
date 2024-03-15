import express from "express";

import { registerUser, authenticateUser} from "../controllers/authController";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", authenticateUser);

export default router;
