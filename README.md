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


## Sig In Google

https://console.cloud.google.com/apis/credentials

## Generar KeyStore

keytool -genkey -v -keystore main.keystore -alias templateionic -keyalg RSA -keysize 2048 -validity 10000

## Ver KyeStore
keytool -keystore main.keystore -list -v 

/android/app/src/main/res/values

agregar 
<resources>
  <string name="server_client_id">Your Web Client Key</string>
</resources>


Agregar main
import com.codetrixstudio.capacitor.GoogleAuth.GoogleAuth;

MainActivity.onCreate

this.init(savedInstanceState, new ArrayList<Class<? extends Plugin>>() {{
  add(GoogleAuth.class);
}});

capacitor.config.json
{
  "plugins": {
    "GoogleAuth": {
      "scopes": ["profile", "email"],
      "serverClientId": "xxxxxx-xxxxxxxxxxxxxxxxxx.apps.googleusercontent.com",
      "forceCodeForRefreshToken" : true
    }
  }
}

 signingConfigs{
        release{
            storeFile file("main.keystore")
            storePassword 'Arriaga02*'
            keyAlias 'templateionic'
            keyPassword 'Arriaga02*'
        }
        debug{
            storeFile file("main.keystore")
            storePassword 'Arriaga02*'
            keyAlias 'templateionic'
            keyPassword 'Arriaga02*'
        }
    }






