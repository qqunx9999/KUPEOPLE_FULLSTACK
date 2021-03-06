import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Chatroom from 'src/entities/chatroom.entity';
import Chat_message from 'src/entities/chat_message.entity';
import { NotificationModule } from 'src/notification/notification.module';
import { UsersModule } from 'src/users/users.module';
import { ChatroomsController } from './chatrooms.controller';
import { ChatroomsService } from './chatrooms.service';

@Module({
  imports: [TypeOrmModule.forFeature([Chatroom, Chat_message]),
      UsersModule,
      NotificationModule
  ],
  controllers: [ChatroomsController],
  providers: [ChatroomsService]
})
export class ChatroomsModule {}
