import { Controller,Post ,Get, Body } from '@nestjs/common';
import { PushNotificationDto } from './dto/push-notification.dto';
import { PushNotificationService } from './push-notification.service';
import * as firebase from 'firebase-admin';

@Controller('push-notification')
export class PushNotificationController {
    constructor(
        private readonly PushNotificationService : PushNotificationService,
    ){}

    @Post('/post_noti_one_user')
    createMessagOneUser(@Body("token") token:string ,@Body("title") title:string ,@Body("body") body:string ){
        console.log(token,title,body);
        return  this.PushNotificationService.sendOneNotification(token,title,body);
        //return token;
    }

    @Post('/post_noti_muti_user')
    createMessag(@Body("token") token:string ,@Body("title") title:string ,@Body("body") body:string ,@Body("route") route:string ){
        const string = token;
        const usingSplit = string.split('|');              
      
        console.log(usingSplit);
        return  this.PushNotificationService.sendMutiNotifications(usingSplit,title,body,route);
        //return token;
    }
}
