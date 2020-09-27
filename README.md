# ionic5-template
Template Ionic 5


ionic start templateApp  tabs --type=angular --capacitor


#Manejar el estado de la autenticacion ( and api calls)
ionic g service services/authentication


## Paginas Adicionales
ionic g page pages/intro
ionic g  page pages/login


## Secure inside area
ionic g guard guards/auth --implements CanLoad


## Show intro  automatically once
ionic g guard guards/intro --implements CanLoad

## Automatically log in users
ionic g guard guards/autoLogin --implements CanLoad




ionic capacitor add android

ionic capacitor run android -l --host=YOUR_IP_ADDRESS


npx cap open android 

npx cap open ios 


## Config ANDROID Notifications

Configurar firebase android notifications

google-services.json -> android/app/google-services.json

y agregar en el manifest

   <service android:name="com.getcapacitor.plugin.background.BackgroundTaskService" android:exported="false" />
        <receiver android:name="com.getcapacitor.plugin.notification.TimedNotificationPublisher" />
        <receiver android:name="com.getcapacitor.plugin.notification.NotificationDismissReceiver" />
        <meta-data android:name="firebase_messaging_auto_init_enabled" android:value="false" />
        <service android:name="com.getcapacitor.CapacitorFirebaseMessagingService" android:stopWithTask="false">
            <intent-filter>
                <action android:name="com.google.firebase.MESSAGING_EVENT" />
            </intent-filter>
        </service>


## Config IOS Notifications

https://developer.apple.com/account/resources/certificates/list

Crear una key  y descargar  el P8

https://developer.apple.com/account/resources/authkeys/list

Ir a fire Base  y crear push de ios 


Cloud Messagin 

Subir la clave de autenticación de APNs

Subir archvi P8

agregar clave del key y clave el equipo

Agregar en ios/App/Podfile

pod 'Firebase/Messaging'

npx cap update ios 

https://capacitorjs.com/docs/guides/push-notifications-firebase

npx cap sync








