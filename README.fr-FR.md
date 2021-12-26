# <center> Spotify Now Playing Viewer </center>

<p align="center">
  <a href="https://github.com/vuejs/vue">
    <img src="https://img.shields.io/badge/Vue-3.0.0-success" alt="vue">
  </a>
  <a href="https://github.com/Inkapable/spotify-viewer/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/mashape/apistatus.svg" alt="license">
  </a>
  <a href="https://app.netlify.com/sites/dazzling-visvesvaraya-84f8b1/deploys">
    <img src="https://api.netlify.com/api/v1/badges/3e981827-686d-47bd-b75c-6c60f22882b8/deploy-status" alt="Netlify">
  </a>
</p>


French | [English](./README.md)

---

## Introduction

Ceci est un simple projet construit avec Vue 3 et la nouvelle API de composition.

Ce projet fut construit en 5 jours pour une Dev Jam Spotify, c'est mon premier projet 
utilisant Vue 3 et m'a servi d'introduction au framework et au javascript moderne.

## Comment ça marche ?

Spotify Now Playing viewer va 

- ✅ - Utilise l'API Spotify Web pour récupérer la piste en cours d'écoute (aucune autre donnée ne sera accédée)
- ✅ - Utiliser des Access et Refresh tokens pour assurer le maintien de la connexion entre sessions
- ✅ - Afficher la piste en cours d'écoute
- ✅ - Montrer la jaquette d'album tournant en 3D
- ✅ - Mettre en fond une couleur vibrante adaptée avec node-vibrant

# Démonstration

[Demo live](https://spotify.liam.social)

**Note**: En raison de l'issue [#492](https://github.com/spotify/web-api/issues/492) de l'API Web de Spotify, il n'y pour l'instant
aucun moyen de stream la piste en cours d'écoute. De ce fait, ce projet est fait pour être hébergé localement pour éviter les rate-limits.

Si vous voulez utiliser ce projet, il est recommandé de le fork et l'héberger avec Netlify ou votre propre webserver avec vos propres clés API (voir [Comment utiliser](#comment-utiliser))

Le site de demo ci-dessus ne sert uniquement que de démonstration, en raison des limites API de Spotify, seules les utilisateurs
ajoutés manuellement peuvent s'y connecter.

![Image de demonstration](https://i.imgur.com/KDhOG9A.png)
![Image de demonstration](https://i.imgur.com/6L7oT0Z.png)
![Image de demonstration](https://i.imgur.com/YR1PjsD.png)

## Support Navigateurs

La plupart des navigateurs modernes sont supportés (à l'exception d'Internet Explorer).

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/) | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/) | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/) | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/) | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/) |
|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Edge                                                                                                                                                                                               | Firefox                                                                                                                                                                                                | Chrome                                                                                                                                                                                              | Safari                                                                                                                                                                                              | Opera                                                                                                                                                                                            |

## Comment utiliser

You can either clone the repo, compile the code offline, and upload to your own webserver or use one of 
the supported platforms.

The tutorial below is for Netlify, Vue.js works with other platforms as well such as Github and Gitlab Pages
(for more info, please check out: https://cli.vuejs.org/guide/deployment.html#platform-guides)

### 1. Faire un fork du repertoire

Sur cette page, cliquez sur le bouton 'Fork' en haut à droite pour créer une copie du repertoire tel-quel. Sinon vous pouvez cloner le repo et le push sur votre compte Github.

### 2. Créer un nouveau projet sur Netlify

Connectez-vous sur Netlify et cliquez sur 'Nouveau site depuis Git'

Si c'est votre première fois avec le service, vous aurez besoin de donner accès à votre compte Github sur Netlify en suivant les instructions du site.

Une fois l'accès autorisée, suivez les instructions du site pour relier votre repo. Les paramètres par défaut devraient suffire.

Cliquez ensuite sur 'Déployer le site'.

_Note: Ce projet a été construit avec Node 16._

### 3. Créer les clés clients Spotify

Pour permettre le suivi de vos données, il vous faut générer des clés client Spotify. Vous pouvez faire cela en vous connectant à votre [Tableau de bord](https://developer.spotify.com/dashboard/applications) et en créant une nouvelle application.

Pour le 'Redirect URI', inscrivez l'URL de votre projet sur Netlify.

Vous pouvez laisser les autres paramètres vides.

Copiez le Client Secret et Client ID et enregistrer les changements sur votre Tableau de bord Spotify.

### 4. Ajoutez vos clés à Netlify

Maintenant que nous avons nos clés API Spotify, il nous suffit de les transmettre à notre application.

To do this, navigate to Netlify > Site Settings > Build & Deploy > Environment
Pour ce faire, naviguez vers Netlify > Parameters du site > Deployment > Environnement

Sous 'Variables environment', ajoutez deux champs. Le nom des champs peut être trouvés dans le fichier `env.sample` et les valeurs sont les clés d'API correspondantes.

Enregistrez vos changements.

### 5. Voir l'application

Once the environment variables are in, you can now navigate to your Netlify site. You'll be prompted with a Spotify login button. Do that, and you're good to go!
Une fois la procédure terminée, vous pouvez naviguez vers votre site Netlify. Vous serez accueillie par un bouton de connexion, en un clique               

## Mise en place local
```
npm install
```

#### Compile et hot-reloads pour phase de development
```
npm run serve
```

#### Compile et minifie pour phase de production
```
npm run build
```

#### Lints et correction des fichiers
```
npm run lint
```

#### Modifier la configuration
Voir [Configuration Reference](https://cli.vuejs.org/config/).

## Crédits

Ce projet s'est fortement inspiré de [Nowify](https://github.com/jonashcroft/Nowify).

Je remercie [node-vibrant](https://github.com/Vibrant-Colors/node-vibrant)
et [Bootstrap 5.0](https://github.com/twbs/bootstrap) de m'avoir facilité la phase de design.

## License

[MIT](https://github.com/Inkapable/spotify-viewer/blob/master/LICENSE)
