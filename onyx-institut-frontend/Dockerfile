
# Etape 1 : Construction du projet angular en environnement de développement
FROM node:latest as build

# Création du répertoire de base
WORKDIR /usr/local/app

# Copie des fichiers de dépendences
COPY package*.json ./

# Installation des dépendences, y compris Angular CLI
RUN npm install -g @angular/cli

# Installation des dépendences du projet
RUN npm install

# Copie du reste des fichiers
COPY . .

# Exécuter l'application Angular en mode développement
CMD ["ng", "serve", "--host", "0.0.0.0"]
