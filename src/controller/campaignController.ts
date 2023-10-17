import { Request, Response , NextFunction} from 'express';
import { CampaignInstance } from "../model/campaignModel";
import { v4 as uuidv4 } from "uuid";
import {db} from "../config";
import {Schema,option}from '../utils/validation';
import catchAsync from '../common/error-handler/catchAsyncError';

class CampaignController {

    createCampaignHandler = catchAsync(
        async(req: Request, res: Response, next: NextFunction) => { 
            try {
            const { name, clicks,impressions,spend,conversions} = req.body;
            const compaignId = uuidv4();
            //validate request   
            const validateResult = Schema.validate(req.body, option);

            if(validateResult.error) {
                res.status(400).json({
                    Error: validateResult.error.details[0].message
                });
            };
            
            //check if the campaign exists
            const existingCampaign = await CampaignInstance.findOne({
                where: { name: name },
              });

            if(existingCampaign) {
                return res.status(201).send({
                    message: "Campaign already exists",
                    status: false
                });
            }else{
                const data = {
                    id:compaignId,
                    name, 
                    clicks,
                    impressions,
                    spend,
                    conversions
                };
                const newCampaign = new CampaignInstance(data);
                await newCampaign.save();
    
                res.status(201).send({
                    message: "Campaign Created Successfully",
                    status: true
                });
            }
            } catch (err) {
                res.status(500).json({
                    error: "Could not create a new campaign", err,
                    route: "/create"
                })
            }
            
           
        }
    )

    retrieveCampaignHandler = catchAsync(async (req: Request, res: Response, next:NextFunction) =>{
        try {
            const limit = req.query.limit as number | undefined
            const campaign = await CampaignInstance.findAndCountAll({
              limit:limit
            })

            if (campaign.count === 0 ) {
                return res.status(404).json({
                    message: "You have no existing campaign,please create a campaign",
                    status: false
                });
            }
            
          return res.status(200).json({
            message:"You have successfully retrieved all campaign",
            Count:campaign.count,
            Campaign:campaign.rows
          })
    
          } catch (err) {
            res.status(500).json({
                error: "Could not retrieve all campaigns", err,
                route: "/retrieve"
            })
          }
            
    
        }
    
    )
    
    deleteCampaignHandler = catchAsync(async (req: Request, res: Response, next:NextFunction) =>{
        try {
            await CampaignInstance.destroy({
                where: {},
                truncate: true,
              });
          
              return res.status(200).send({
                message: 'All rows in the model have been deleted',
              });
    
          } catch (err) {
            res.status(500).json({
                error: "Could not retrieve all campaigns", err,
                route: "/retrieve"
            })
          }
    //   db.Sequelize.truncate()
    
        }
    
    )    
  
  }
  
  export default CampaignController ;