import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity'
import { ObjectID } from 'mongodb';
import { User_info } from 'src/common/user_info';
import { CreateUserDto } from 'src/dto/create-user.dto';

@Injectable()
export class UsersService {
    private user_info: User[] = [];
    private info: User_info={userID: null,username:null,avatar_URL:null, exp:null, rank:null ,isLoggedIn:null };
    
    // {not Modify
    private newusers = [];
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
       
    ) { }

    async findOne(username: string): Promise<User | undefined> {
        await this.usersRepository.find()
            .then(setuser => {
                this.newusers = setuser;
            }); 
        return this.newusers.find(eachuser => eachuser.email === username);
    }
    // not Modify}

    async findUserInfo(userID: ObjectID): Promise<User_info>{
        console.log(userID);
        await this.usersRepository.find({where:{_id: userID}})
            .then(setuser_info => {
            this.user_info = setuser_info;
        }); 
        //var info: User_info;
        //console.log(this.user_info[0].userID);
        this.info.userID = this.user_info[0].userID;
        this.info.username = this.user_info[0].username;
        this.info.avatar_URL = this.user_info[0].avatar_URL;
        this.info.exp = this.user_info[0].exp;
        this.info.rank = this.user_info[0].rank;
        this.info.isLoggedIn = this.user_info[0].isLoggedIn;
        return this.info;

    }

    async createUser(createUserDto: CreateUserDto) {
        createUserDto.avatar_URL = null;
        createUserDto.exp = 0;
        createUserDto.rank = "Beginner";
        createUserDto.friend_arr = [];
        createUserDto.numberfriends = 0;
        createUserDto.description = "";
        createUserDto.chatmember_arr = [];
        createUserDto.date_join = new Date();
        createUserDto.isAdmin = false;
        createUserDto.isLoggedIn = false;
        return this.usersRepository.save(createUserDto);
      }
}
