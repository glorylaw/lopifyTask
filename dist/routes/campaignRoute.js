"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const campaignController_1 = __importDefault(require("../controller/campaignController"));
const router = (0, express_1.Router)();
const campaignController = new campaignController_1.default();
router.get("/", (req, res) => {
    res.status(200).send("App is currectly running");
});
router.post('/create', campaignController.createCampaignHandler);
router.get('/retrieve', campaignController.retrieveCampaignHandler);
exports.default = router;
