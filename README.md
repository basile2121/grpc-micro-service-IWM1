# Grpc-micro-service-IWM1

## 1. Contexte : 

Pour ce projet nous avons décider de repartir de 0 pour mieux comprendre le fonctionnement des micro services et ne pas être perdu dans un projet dense comme celui donné en tant qu'exemple.

**Ecole :** ESGI

**Section :** M1

**Spécialité :** IW

**Membres du groupe 12 :** 

- Basile REGNAULT
- Bilal BOUTERBIAT
- Fabien PONCET
- Walid HALLOULI

## 2. Architecture

Pour le projet nous avons décidé de mettre en place un Gateway qui appelles nos micro services via GRPC et qui sera lui même appelé par le client appellerais en HTTP. Cela permet au client de passer par un seul serveur pour accéder à l'ensemble des micro services. Cela nous permet également l'implémentation de l'authentification et du Guard à un seul endroit.

**Liste des micro services :** 

- user-api
- auth-api
- product-api
- shop-api

![Archi](https://github.com/basile2121/grpc-micro-service-IWM1/blob/develop/doc/architecture.png)



## Commandes à lancer pour générer les protos

Installer buf globalement
`npm install --global @bufbuild/buf`

Créer les fichiers stubs dans les apis :
`buf generate`

Exporter les fichiers proto :
`./export.sh`



## 3. Lancement du projet

Par manque de temps et d'expérience nous n'avons pas pu mettre en place un docker pour lancer l'ensemble des micro service et leurs configuration. Il faut donc le faire manuellement.

### 3.1 Gateway API

```
# .env
USER_API_URL="localhost:4002"
PRODUCT_API_URL="localhost:3010"
SHOP_API_URL="localhost:3009"
AUTH_API_URL="localhost:4003"
```

Installation des dépendances : 

```
npm i
```

Lancer le serveur : 

```
npm run start:dev
```

### 3.2 Auth API

```
# .env
MYSQL_URL="mysql://root:@127.0.0.1:3306/micro_control_auth?serverVersion=5.7"
PORT=4003
USER_API_URL="localhost:4002"
JWT_SECRET="super-secret"
insecure=true
HEALTH_PORT=3002
```

Installation des dépendances : 

```
npm i
```

Pour créer la base et le schéma de donnée :

```
npx prisma migrate dev --name init
```

Lancer le serveur : 

```
npm run start:dev
```

### 3.3 User API

```
# .env
MYSQL_URL="mysql://root:@127.0.0.1:3306/micro_control_user?serverVersion=5.7"
PORT=4002
insecure=true
NODE_ENV=development
HEALTH_PORT=3001
AUTH_API_URL="localhost:4003"
```

Installation des dépendances : 

```
npm i
```

Pour créer la base et le schéma de donnée :

```
npx prisma migrate dev --name init
```

Lancer le serveur : 

```
npm run start:dev
```

### 3.4 Product API

```
# .env
DATABASE_URL="mysql://root:@127.0.0.1:3306/micro_control_product?serverVersion=5.7"
```

Installation des dépendances : 

```
npm i
```

Pour créer la base et le schéma de donnée :

```
npx prisma migrate dev --name init
```

Lancer le serveur : 

```
npm run start:dev
```

### 3.5 Shop API

```
# .env
DATABASE_URL="mysql://root:@127.0.0.1:3306/micro_control_shop?serverVersion=5.7"
PRODUCT_API_URL="localhost:3010"
PORT="3009"
HEALTH_PORT=5102
```

Installation des dépendances : 

```
npm i
```

Pour créer la base et le schéma de donnée :

```
npx prisma migrate dev --name init
```

Lancer le serveur : 

```
npm run start:dev
```

## 4. Base de données

Nous n'avons pas de schéma de données, ce qu'il faut savoir est que le shop peut avoir un produit via le champs ID

Pour créer la base et le schéma de donnée :

```
npx prisma migrate dev --name init
```

Lors d'une modification des fichiers Prisma il est important de faire la commande. Cela rendra également accessible le client :

```
npx prisma generate
```

## 5. Fonctionnalités implémentées

- CRUD pour le micro service Product
- CRUD pour le micro service Shop
- Appelle du service Product dans Shop pour vérifier lors de l'ajout d'un produit dans un shop que le produit existe bien
- Gateway-api
- Observabilité : Trace des requêtes pour tout les micro-service avec Jaeger : http://localhost:16686/search
- Utilisation des RpcException pour la gestion d'erreur
- Les services Auth et User viennent de architecture d'exemple, mais nous avons du les modifier légèrement

Lancer Jaeger : docker-compose up -d à la racine du projet

## Test Postman

Pour tester nous avons fais des collections Postman. 

Celle de gateway-api : https://github.com/basile2121/grpc-micro-service-IWM1/blob/develop/doc/MicroService Gateway.postman_collection.json

Pour la collection des micro-services nous ne pouvons pas l'exporter mais si vous le souhaiter nous pouvons vous la partagez par mail. Contactez-nous.

### Quelques captures d'écrans :

![Auth_Login](https://github.com/basile2121/grpc-micro-service-IWM1/blob/develop/doc/Auth_Login.png)

![Product_Get](https://github.com/basile2121/grpc-micro-service-IWM1/blob/develop/doc/Product_Get.png)

![Shop_Add](https://github.com/basile2121/grpc-micro-service-IWM1/blob/develop/doc/Shop_Add.png)

### Problèmes : 

Nous avons tout tester et tout fonctionne sur nos postes si vous avez un soucis hésitez pas à nous demander

