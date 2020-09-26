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

## Config IOS Notifications


https://developer.apple.com/account/resources/

Generar Certificado
https://onesignal.com/provisionator

ANOTAR PASSWORD GENERADO :  
Password is: kvbszbniec

DESCARGAR EL P12

