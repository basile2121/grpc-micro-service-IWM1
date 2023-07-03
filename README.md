# grpc-micro-service-IWM1

## Commandes à lancer pour les protos

Installer buf globalement
```npm install --global @bufbuild/buf```

Créer les fichiers stubs dans les apis : 
``buf generate``

Exporter les fichiers proto : 
``export.sh``


## Base de données

Pour créer la base et le schéma de donnée : 
``npx prisma migrate dev --name init``

Lors d'une modification des fichiers prisma il est important de faire la commande : 
``npx prisma generate``, pour regénérer les tables
