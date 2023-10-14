import { Router,Request, Response } from 'express';
import CampaignController from '../controller/campaignController';


const router: Router = Router();
const campaignController = new CampaignController();

router.get("/", (req:Request,res:Response)=>{
    res.status(200).send("App is currectly running")

})

 router.post('/create', campaignController.createCampaignHandler);

 router.get('/retrieve', campaignController.retrieveCampaignHandler);




export default router;