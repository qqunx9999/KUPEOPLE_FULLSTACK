import { IsInt , IsNotEmpty , IsBoolean , IsDate , IsString , IsArray} from "class-validator";
import {ObjectID} from 'mongodb';

export class UpdateChat_messageDto{
    userID:ObjectID;
    chatroomID:ObjectID;
    //@IsString()
    message:string;
    date_create:Date;
    date_delete:Date;
}