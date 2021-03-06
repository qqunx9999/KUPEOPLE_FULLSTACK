import { IsInt , IsNotEmpty , IsBoolean , IsDate , IsString , IsArray} from "class-validator";
import {ObjectID} from 'mongodb';


export class CreateChatroomDto{
    @IsString()
    room_name:string;
    @IsArray()
    member_arr: {userID: ObjectID, date_join_chat: Date, date_leave_chat: Date}[];
    //@IsInt()
    totalmember:number;
    //@IsDate()
    date_create:Date;
    //@IsDate()
    date_lastactive:Date;
    //@IsDate()
    date_delete:Date;
}