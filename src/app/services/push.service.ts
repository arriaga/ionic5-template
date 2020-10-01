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

    mensajes: OSNotificationPayload[] = [];

    userId: string;

    pushListener = new EventEmitter<OSNotificationPayload>();


    constructor(private oneSignal: OneSignal) {

        this.cargarMensajes();
    }

    async getMensajes() {
        await this.cargarMensajes();
        return [...this.mensajes];
    }

    async configuracionInicial() {

        const device = await Device.getInfo();

        if (device.platform !== 'web') {

            this.oneSignal.startInit(this.oneSignalAppID, this.senderId);

            this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);

            this.oneSignal.handleNotificationReceived().subscribe((noti) => {
                // do something when notification is received
                console.log('Notificación recibida', noti);
                this.notificacionRecibida(noti);
            });

            this.oneSignal.handleNotificationOpened().subscribe(async (noti) => {
                // do something when a notification is opened
                console.log('Notificación abierta', noti);
                await this.notificacionRecibida(noti.notification);
            });


            // Obtener ID del suscriptor
            this.oneSignal.getIds().then(info => {
                this.userId = info.userId || 'bb4c4088-3427-44ff-8380-570aa6c1ce1a';
                console.log(this.userId);

                console.log('Guardando en el Storage', this.userId);
                //this.storageService.guardarEnStorage('idPush', this.userId);
            });

            this.oneSignal.endInit();
        }


    }

    async getUserIdOneSignal() {
        console.log('Cargando userId');
        // Obtener ID del suscriptor
        const info = await this.oneSignal.getIds();
        this.userId = info.userId;
        return info.userId;
    }

    async notificacionRecibida(noti: OSNotification) {

        await this.cargarMensajes();

        const payload = noti.payload;

        const existePush = this.mensajes.find(mensaje => mensaje.notificationID === payload.notificationID);

        if (existePush) {
            return;
        }

        this.mensajes.unshift(payload);
        this.pushListener.emit(payload);

        await this.guardarMensajes();

    }

    guardarMensajes() {
        Storage.set({key: 'MENSAJES', value: this.mensajes.toString()});
    }

    async cargarMensajes() {

        const mensajes = await Storage.get({key: 'MENSAJES'}) || [];

        this.mensajes = [];
        return this.mensajes;

    }

    async borrarMensajes() {
        await Storage.clear();
        this.mensajes = [];
        this.guardarMensajes();
    }

}
