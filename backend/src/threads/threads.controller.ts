import { Body, Controller, Get, Param, Post, HttpException, HttpStatus, Patch, ParseArrayPipe, ParseIntPipe, UseInterceptors, UploadedFile 
 ,Request, 
 UseGuards} from '@nestjs/common';
import { ObjectID } from 'mongodb'

import Thread from './thread.entity';
import Commentation from './comentation.entity';

import { ThreadsService } from './threads.service';
import { ParseObjectIdPipe } from '../common/pipes';


import { CreateThreadDto } from 'src/dto/create-thread.dto';
import { CreateCommentDto } from 'src/dto/create-comment.dto';
import Reportment_thread from 'src/entities/reportment_thread.entity';
import { CreateReportment_threadDto } from 'src/dto/create-reportment_thread.dto';
import Reportment_comment from 'src/entities/reportment_comment.entity';
import { CreateReportment_commentDto } from 'src/dto/create-reportment_comment.dto';
import { UpdateThreadDto } from 'src/dto_update/update-thread.dto';
import { UpdateCommentDto } from 'src/dto_update/update-comment.dto';

import { v4 as uuidv4 } from 'uuid';
import path = require('path');
//import { join } from 'path';
import {FileInterceptor} from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Observable, of } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';


@Controller('threads')
export class ThreadsController {
  constructor(private threadsService: ThreadsService) {}

  @Get()
  async findAll(): Promise<Thread[]> {
    return this.threadsService.findAll();
  }

  @Get('filter/:tags/:sortby/:pagesize/:pageNo')
  async filterThread(@Param('tags', ParseArrayPipe) tags: string[],
    @Param('sortby') sortby: string,
    @Param('pagesize', ParseIntPipe) pagesize: number,
    @Param('pageNo', ParseIntPipe) pageNo: number
  ): Promise<any>{
    let threads =await  this.threadsService.filterThread(tags, sortby, pagesize, pageNo);
    const totals = Math.ceil(threads.length/pagesize);
    let begin = pagesize*(pageNo-1);
    let last = pagesize*pageNo; if(last>threads.length){last = threads.length}
    threads = threads.slice(begin, last);
    return {threads, pageInfo:{pagesize: threads.length, pageNo, total: totals}};
  }

  @Get('search/:keyword/:tags/:sortby/:pagesize/:pageNo')
  async searchThread( @Param('keyword') keyword: string,
    @Param('tags', ParseArrayPipe) tags: string[],
    @Param('sortby') sortby: string,
    @Param('pagesize', ParseIntPipe) pagesize: number,
    @Param('pageNo', ParseIntPipe) pageNo: number
  ): Promise<any>{
    //console.log(pagesize, pageNo);
    let threads =await  this.threadsService.searchThread(keyword, tags, sortby, pagesize, pageNo);
    const totals = Math.ceil(threads.length/pagesize);
    let begin = pagesize*(pageNo-1);
    let last = pagesize*pageNo; if(last>threads.length){last = threads.length}
    threads = threads.slice(begin, last);
    return {threads, pageInfo:{pagesize: threads.length, pageNo, total: totals}};
  }

  @Get( ':threadID/comments/:commentID')
  async findOneComment(@Param('threadID', ParseObjectIdPipe) threadID: ObjectID,
    @Param('commentID', ParseObjectIdPipe) commentID: ObjectID,
  ): Promise<any>{
    return this.threadsService.findOneComment(commentID);
  }
  

  @Get(':threadID')
  async findOneThreadWithOwn(@Param('threadID', ParseObjectIdPipe) threadID: ObjectID): Promise<any> {
    return this.threadsService.findOneThreadWithOwn(threadID);
  }

  @UseGuards(JwtAuthGuard)
  @Post('images')
  @UseInterceptors(FileInterceptor('file',{
    storage: diskStorage({
      destination: './imageUpload/image',//'D:/Kupeople/Avatar',
      filename: (req, file, cb) =>{
        const filename: string = path.parse(file.originalname).name.replace(/\s/g, '')+ uuidv4();
        const extension:string = path.parse(file.originalname).ext;

        cb(null, `${filename}${extension}`)
      }
    })
  }))
  uploadImmage(@UploadedFile() file, @Request() req): Observable<Object> {
    console.log(file);
    //updateUser.avatar_URL = file.path;
    //this.usersService.updateUser({avatar_URL: file.path}, userID);
    return of({image_URL: file.path});
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createThread(@Body() createThreadDto: CreateThreadDto){
    return this.threadsService.createThread(createThreadDto);
  }

  @Get(':threadID/comments')
  async findAllCommentations(@Param('threadID', ParseObjectIdPipe) threadID: ObjectID): Promise<any>{
    return this.threadsService.findAllCommentations(threadID);
  }

  @Get(':threadID/comments/:pagesize/:pageNo')
  async findPageCommentations(@Param('threadID', ParseObjectIdPipe) threadID: ObjectID,
    @Param('pagesize', ParseIntPipe) pagesize: number,
    @Param('pageNo', ParseIntPipe) pageNo: number
    ): Promise<any>{
    //console.log(pagesize);
    return this.threadsService.findPageCommentations(threadID, pagesize, pageNo);
  }
  

  
  @UseGuards(JwtAuthGuard)
  @Post(':threadID/comments')
  async createCommentation(@Param('threadID', ParseObjectIdPipe) threadID:ObjectID, 
                @Body() createCommentationDto: CreateCommentDto){
    createCommentationDto.threadID = threadID;
    createCommentationDto.userID  = new ObjectID (createCommentationDto.userID);
    return this.threadsService.createCommentation(createCommentationDto);
    }

  @UseGuards(JwtAuthGuard)
  @Post(':threadID/reportTs')
  async createReportment_thread(@Param('threadID', ParseObjectIdPipe) threadID: ObjectID,
                @Body() createReportment_threadDto: CreateReportment_threadDto){
    createReportment_threadDto.threadID = threadID;
    createReportment_threadDto.userID = new ObjectID (createReportment_threadDto.userID);
    return this.threadsService.createReportment_thread(createReportment_threadDto);
    }
  
  @UseGuards(JwtAuthGuard)
  @Post(':threadID/comments/:commentID/reportCs')
  async createReportment_comment(@Param('threadID', ParseObjectIdPipe) threadID: ObjectID,
    @Param('commentID',ParseObjectIdPipe) commentID: ObjectID,
    @Body() createReportment_commentDto: CreateReportment_commentDto){
      createReportment_commentDto.threadID = threadID;
      createReportment_commentDto.commentID = commentID;
      createReportment_commentDto.userID = new ObjectID (createReportment_commentDto.userID);
      return this.threadsService.createReportment_comment(createReportment_commentDto);
    }

  @UseGuards(JwtAuthGuard)
  @Patch(':threadID')
  async updateThread(@Param('threadID', ParseObjectIdPipe) threadID: ObjectID,
    @Body() updateThreadDto: UpdateThreadDto) {
      // console.log(updateThreadDto.up_vote_arr[0].userID);
      return this.threadsService.updateThread(threadID, updateThreadDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':threadID/comments/:commentID')
  async updateComment(@Param('threadID', ParseObjectIdPipe) threadID: ObjectID,
    @Param('commentID', ParseObjectIdPipe) commentID: ObjectID,
    @Body() updateCommentDto: UpdateCommentDto
    ){
      return this.threadsService.updateComment(threadID, commentID, updateCommentDto);
    }
  

}
