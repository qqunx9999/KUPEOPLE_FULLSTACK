import {Entity , Column , ObjectIdColumn } from 'typeorm';
import {ObjectID} from 'mongodb';

@Entity()
export class Reportment_thread{
    @ObjectIdColumn()
    reportTID?:ObjectID;
    @Column()
    userID:ObjectID;
    @Column()
    threadID:ObjectID;
    @Column()
    description:string;
    @Column()
    image_arr: {URL:string, pos:number}[]; 
    @Column()
    reportTNO: number;
    @Column()
    status:string;
    @Column()
    considered_by: {userID: ObjectID};
    @Column()
    date_create:Date;
    @Column()
    date_considered: Date;
    @Column()
    date_delete:Date;
}
export default Reportment_thread;