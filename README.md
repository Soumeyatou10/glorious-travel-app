# Glorious Travel & Services — Application complète

Site public + espace administrateur, prêts à l'emploi.

- **Frontend** : Angular 18 (composants standalone) + Tailwind CSS
- **Backend** : Spring Boot 3 (Java 17) + Spring Security (JWT) + Spring Data JPA
- **Base de données** : MySQL
- **Stockage des médias** : disque local du serveur (dossier `backend/uploads`)

---

## 1. Structure du projet

```
glorious-travel-app/
├── backend/     -> API Spring Boot (Maven)
└── frontend/    -> Site public + admin (Angular + Tailwind)
```

---

## 2. Prérequis

- Java 17+
- Maven 3.9+ (ou utilisez le wrapper si vous en ajoutez un : `mvn -v` pour vérifier)
- MySQL 8+ installé et démarré
- Node.js 18+ et npm
- Angular CLI : `npm install -g @angular/cli`

---

## 3. Backend (Spring Boot)

### 3.1 Créer la base de données

Aucune étape SQL manuelle n'est nécessaire : `createDatabaseIfNotExist=true` dans
`application.yml` crée la base `glorious_travel` automatiquement au premier
démarrage, et `ddl-auto: update` crée toutes les tables.

### 3.2 Configurer l'accès MySQL

Éditez `backend/src/main/resources/application.yml` :

```yaml
spring:
  datasource:
    username: root
    password: VOTRE_MOT_DE_PASSE_MYSQL
```

Changez aussi la clé JWT (`app.jwt.secret`) par une valeur secrète unique avant
la mise en production.

### 3.3 Démarrer le backend

```bash
cd backend
mvn spring-boot:run
```

L'API démarre sur **http://localhost:8080**.

Au tout premier démarrage, un compte administrateur par défaut est créé
automatiquement (voir la console) :

```
Email    : admin@glorioustravel.cm
Mot de passe : ChangeMoi123!
```

**⚠️ Connectez-vous et changez ce mot de passe immédiatement** (espace admin →
Utilisateurs administrateurs), avant toute mise en ligne publique.

### 3.4 Dossier de stockage des médias

Les photos/vidéos uploadées depuis l'admin sont enregistrées dans
`backend/uploads/photos` et `backend/uploads/videos`, et servies publiquement
sous `http://localhost:8080/uploads/...`. Ce chemin est configurable via
`app.upload.dir` dans `application.yml`.

---

## 4. Frontend (Angular + Tailwind)

### 4.1 Installer les dépendances

```bash
cd frontend
npm install
```

### 4.2 Configurer l'URL de l'API

- Développement : `frontend/src/environments/environment.ts`
- Production : `frontend/src/environments/environment.prod.ts` (à adapter avec
  l'URL réelle de votre API une fois déployée)

### 4.3 Démarrer le frontend

```bash
npm start
```

Le site est accessible sur **http://localhost:4200**.

- Site public : `http://localhost:4200/`
- Espace administrateur : `http://localhost:4200/admin/login`

### 4.4 Build de production

```bash
npm run build:prod
```

Le résultat (fichiers statiques) est généré dans `frontend/dist/glorious-travel-frontend`,
à déployer sur n'importe quel hébergement statique (Nginx, Apache, etc.) ou
derrière le même serveur que le backend.

---

## 5. Comment tout est relié

- Le site public appelle uniquement les endpoints **`/api/public/**`** (lecture
  seule, aucune authentification requise) : destinations, services, offres,
  témoignages, photos, vidéos, FAQ, paramètres du site, et l'envoi du
  formulaire de contact (`POST /api/public/requests`).
- L'espace admin appelle les endpoints **`/api/admin/**`**, protégés par un
  jeton JWT obtenu via `POST /api/auth/login`. Le frontend attache
  automatiquement ce jeton à chaque requête admin (voir
  `frontend/src/app/core/interceptors/jwt.interceptor.ts`).
- **Tout ce que le propriétaire ajoute ou modifie dans l'espace admin (une
  destination, une photo, un témoignage, une question de FAQ...) est
  immédiatement visible sur le site public**, car les deux consomment la même
  base de données via l'API — il n'y a rien à "publier" ou "synchroniser"
  manuellement.
- Une seule ressource (`AdminResourceComponent` + `resource-config.ts` côté
  frontend, `Admin*Controller` côté backend) suit exactement le même schéma
  pour toutes les sections de contenu (destinations, services, offres,
  témoignages, photos, vidéos, articles, FAQ, rendez-vous, demandes, clients,
  messages, utilisateurs) — ajouter une future section de contenu ne demande
  que quelques lignes de configuration, pas un nouveau composant.

---

## 6. Points à finaliser avant mise en production

- [ ] Changer le mot de passe administrateur par défaut
- [ ] Remplacer `app.jwt.secret` par une valeur secrète forte et unique
- [ ] Restreindre les origines CORS (`SecurityConfig.corsConfigurationSource`)
      au(x) vrai(s) domaine(s) du site, au lieu de `*`
- [ ] Adapter `environment.prod.ts` avec l'URL réelle de l'API
- [ ] Remplacer les identifiants MySQL par défaut
- [ ] Prévoir une sauvegarde régulière de la base de données et du dossier `uploads`
- [ ] (Optionnel) passer le stockage des médias sur un service cloud
      (S3, Cloudinary...) si le volume de photos/vidéos devient important

---

## 7. Identifiants et données de test

Le compte admin par défaut suffit pour se connecter à l'espace administrateur
et commencer à remplir le contenu (destinations, services, photos...). Il n'y
a **aucune donnée de démonstration** pré-remplie côté contenu public : le site
affichera des sections vides tant que l'administrateur n'a pas ajouté de
destinations, services, etc. depuis l'espace admin.
