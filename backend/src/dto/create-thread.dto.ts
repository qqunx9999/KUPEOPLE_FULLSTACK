import { IsInt , IsNotEmpty , IsBoolean , IsDate , IsString , IsArray, IsObject} from "class-validator";
import {ObjectID} from 'mongodb';


export class CreateThreadDto {

    userID: ObjectID; 
    @IsString()
    topic: string;
    @IsArray()
    tag_arr: string[];
    @IsString()
    content: string;
    @IsArray()
    image_arr: {URL: string, pos: number}[];  
    
    threadNO: number;
    // @IsArray()
    up_vote_arr: {userID: ObjectID}[] ;//=[] ;
    //@IsArray()
    down_vote_arr: {userID: ObjectID}[] ;//=[];
    //@IsInt()
    up_vote_count: number;// =0 ;
    //@IsInt()
    down_vote_count: number; //=0;
    //@IsInt()
    total_comment: number;// =0;
    //@IsInt()
    number_of_all_comment: number;//=0;
    //@IsDate()
    date_create: Date ;
    //@IsDate()
    date_lastedit: Date; // =null;
    //@IsDate()
    date_delete: Date; // =null;
    
}