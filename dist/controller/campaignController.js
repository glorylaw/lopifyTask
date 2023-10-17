"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const campaignModel_1 = require("../model/campaignModel");
const uuid_1 = require("uuid");
const validation_1 = require("../utils/validation");
const catchAsyncError_1 = __importDefault(require("../common/error-handler/catchAsyncError"));
class CampaignController {
    constructor() {
        this.createCampaignHandler = (0, catchAsyncError_1.default)(async (req, res, next) => {
            try {
                const { name, clicks, impressions, spend, conversions } = req.body;
                const compaignId = (0, uuid_1.v4)();
                //validate request   
                const validateResult = validation_1.Schema.validate(req.body, validation_1.option);
                if (validateResult.error) {
                    res.status(400).json({
                        Error: validateResult.error.details[0].message
                    });
                }
                ;
                //check if the campaign exists
                const existingCampaign = await campaignModel_1.CampaignInstance.findOne({
                    where: { name: name },
                });
                if (existingCampaign) {
                    return res.status(201).send({
                        message: "Campaign already exists",
                        status: false
                    });
                }
                else {
                    const data = {
                        id: compaignId,
                        name,
                        clicks,
                        impressions,
                        spend,
                        conversions
                    };
                    const newCampaign = new campaignModel_1.CampaignInstance(data);
                    await newCampaign.save();
                    res.status(201).send({
                        message: "Campaign Created Successfully",
                        status: true
                    });
                }
            }
            catch (err) {
                res.status(500).json({
                    error: "Could not create a new campaign", err,
                    route: "/create"
                });
            }
        });
        this.retrieveCampaignHandler = (0, catchAsyncError_1.default)(async (req, res, next) => {
            try {
                const limit = req.query.limit;
                const campaign = await campaignModel_1.CampaignInstance.findAndCountAll({
                    limit: limit
                });
                if (campaign.count === 0) {
                    return res.status(404).json({
                        message: "You have no existing campaign,please create a campaign",
                        status: false
                    });
                }
                return res.status(200).json({
                    message: "You have successfully retrieved all campaign",
                    Count: campaign.count,
                    Campaign: campaign.rows
                });
            }
            catch (err) {
                res.status(500).json({
                    error: "Could not retrieve all campaigns", err,
                    route: "/retrieve"
                });
            }
        });
        this.deleteCampaignHandler = (0, catchAsyncError_1.default)(async (req, res, next) => {
            try {
                await campaignModel_1.CampaignInstance.destroy({
                    where: {},
                    truncate: true,
                });
                return res.status(200).send({
                    message: 'All rows in the model have been deleted',
                });
            }
            catch (err) {
                res.status(500).json({
                    error: "Could not retrieve all campaigns", err,
                    route: "/retrieve"
                });
            }
            //   db.Sequelize.truncate()
        });
    }
}
exports.default = CampaignController;
