"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var authController_1 = require("../controllers/authController");
var router = express_1.default.Router();
router.get("/test", function (req, res) {
    res.send('It is working');
});
router.post("/register", authController_1.registerUser);
router.post("/login", authController_1.authenticateUser);
exports.default = router;
//# sourceMappingURL=authRoutes.js.map