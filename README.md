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


