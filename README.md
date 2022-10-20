# Bot Discord "3 kifs"
Ce bot Discord permet d'enregistrer des kif eus dans la journée, et de relire des kif passés.

## Setup
Une fois le bot créé dans l'interface de développeurs discord et celui-ci ajouté à un serveur, remplir les champs de variables d'environnements :

### Pour déployer les commandes du bot :
```bash
clientId=<client_id> #right click on the bot in a discord where it is added
DATABASE_URL=<postgres_url>
token=<bot_token>
```
Il suffit de se placer dans `src` et d'exécuter `node deploy-command.js`. 
Cela va envoyer la définition des commandes du bot aux serveurs de Discord. Il faut lancer cette commande à chaque modification de la définition d'une commande.

### Database
Lancer les requêtes SQL dans `src/kif_init.sql`. J'aurais pu mettre un liquibase, mais la flemme.

## Pour démarrer le serveur
```bash
DATABASE_URL=<postgres_url>
TOKEN_DISCORD=<bot_token>
```
Pour démarrer le serveur : `npm run start`.

