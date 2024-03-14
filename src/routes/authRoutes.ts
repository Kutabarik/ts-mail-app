import express from "express";

import { registerUser, authenticateUser} from "../controllers/authController";

const router = express.Router();

router.get("/test", (req, res) => {
    res.send('It is working');
});
router.post("/register", registerUser);
router.post("/login", authenticateUser);

export default router;
