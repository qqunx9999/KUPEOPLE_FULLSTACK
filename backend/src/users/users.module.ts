import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from 'src/entities/user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import Chatroom from 'src/entities/chatroom.entity';
import Notifications from 'src/entities/notification.entity';
import Thread from 'src/threads/thread.entity';
import Commentation from 'src/threads/comentation.entity';
import Reportment_thread from 'src/entities/reportment_thread.entity';
import Reportment_comment from 'src/entities/reportment_comment.entity';
import objectnumber, { Objectnumber } from 'src/entities/objectnumber.entity';
import { NotificationModule } from 'src/notification/notification.module';
import Verifycode from 'src/entities/verifycode.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([User, Chatroom, Notifications, Thread, Commentation,
     Reportment_thread, Reportment_comment, Objectnumber, Verifycode]),
    NotificationModule
  ],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
