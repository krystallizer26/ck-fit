import { Injectable } from '@nestjs/common';
import * as firebase from 'firebase-admin';
import {ServiceAccount} from 'firebase-admin';
import * as serviceAccount from '../firebase/firebase.config.json';
import { PushNotificationDto } from './dto/push-notification.dto';

@Injectable()
export class PushNotificationService {
    constructor(){}

    async sendOneNotification(token,title,body) {
        const registrationToken = token;
        const message = {
        notification: {
            title: title,
            body: body,
            
        }, token: registrationToken
        }
        try {
        await firebase.messaging().send(message)
            .then((response) => {
            console.log("response after sending notification :>>", response)
            })
        } catch (error) {
        console.log( error)
        }
    }

    async sendMutiNotifications(token,title,body,route) {
        const registrationToken = token;
        const payload = {
            notification: {
                title: title,
                body: body,
                route: route,
            },
        };
        try {
        await firebase.messaging().sendToDevice(registrationToken,payload)
            .then((response) => {
            console.log("response after sending notification :>>", response)
            })
        } catch (error) {
        console.log( error)
        }
    }
   
    
}
