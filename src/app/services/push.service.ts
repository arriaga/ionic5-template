import {EventEmitter, Injectable} from '@angular/core';
import {OneSignal, OSNotification, OSNotificationPayload} from '@ionic-native/onesignal/ngx';
import {environment} from '../../environments/environment';
import {Plugins} from '@capacitor/core';

const {Storage, Device} = Plugins;


@Injectable({
    providedIn: 'root'
})
export class PushService {

    senderId = environment.senderId;
    oneSignalAppID = environment.oneSignalAppID;

    messages: OSNotificationPayload[] = [];

    userId: string;

    pushListener = new EventEmitter<OSNotificationPayload>();


    constructor(private oneSignal: OneSignal) {

        this.loadMessages();
    }

    async getMessages() {
        await this.loadMessages();
        return [...this.messages];
    }

    async initialSetup() {

        const device = await Device.getInfo();

        if (device.platform !== 'web') {

            this.oneSignal.startInit(this.oneSignalAppID, this.senderId);

            this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);

            this.oneSignal.handleNotificationReceived().subscribe((noti) => {
                // do something when notification is received
                console.log('Notification received', noti);
                this.notificationReceived(noti);
            });

            this.oneSignal.handleNotificationOpened().subscribe(async (noti) => {
                // do something when a notification is opened
                console.log('Open notification', noti);
                await this.notificationReceived(noti.notification);
            });


            // Obtener ID del suscriptor
            this.oneSignal.getIds().then(info => {
                this.userId = info.userId || 'bb4c4088-3427-44ff-8380-570aa6c1ce1a';
                console.log(this.userId);

                console.log('Saving in Storage', this.userId);
                //this.storageService.guardarEnStorage('idPush', this.userId);
            });

            this.oneSignal.endInit();
        }


    }

    async getUserIdOneSignal() {
        console.log('Loading userId');
        // Obtener ID del suscriptor
        const info = await this.oneSignal.getIds();
        this.userId = info.userId;
        return info.userId;
    }

    async notificationReceived(noti: OSNotification) {

        await this.loadMessages();

        const payload = noti.payload;

        const pusExist = this.messages.find(message => message.notificationID === payload.notificationID);

        if (pusExist) {
            return;
        }

        this.messages.unshift(payload);
        this.pushListener.emit(payload);

        await this.saveMessages();

    }

    saveMessages() {
        Storage.set({key: 'MENSAJES', value: this.messages.toString()});
    }

    async loadMessages() {

        const mensajes = await Storage.get({key: 'MENSAJES'}) || [];
        this.messages = [];
        return this.messages;

    }

    async deleteMessages() {
        await Storage.clear();
        this.messages = [];
        this.saveMessages();
    }

}
