import { DataTypes, Model } from "sequelize";
import {db} from '../config'

export interface CampaignAttributes {
  id: string;
  name: string;
  impressions: number;
  clicks: number;
  conversions: number;
  spend: number;
}

export class CampaignInstance extends Model<CampaignAttributes> {}

CampaignInstance.init({
  id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    impressions: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    clicks: {
        type:DataTypes.NUMBER,
        allowNull:false,
    },
    conversions:{
        type:DataTypes.NUMBER,
        allowNull:false
    },
   
    spend:{
      type:DataTypes.NUMBER,
      allowNull:false
},
  
},

{
  sequelize:db,
  tableName:'campaign'
});