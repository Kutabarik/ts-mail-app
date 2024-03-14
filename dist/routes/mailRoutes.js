"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mailController_1 = require("../controllers/mailController");
var router = express_1.default.Router();
router.post('/mail/create', mailController_1.createMail);
router.get('/mail/all', mailController_1.getAll);
router.put('/mail/edit', mailController_1.editMail);
router.delete('/mail/delete', mailController_1.deleteMail);
exports.default = router;
//# sourceMappingURL=mailRoutes.js.map