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

English | [French](./README.fr-FR.md)

---

## Introduction

This is a simple project built in Vue 3 using the composition API.

This project was built in 5 days for the Spotify Dev Jam, it is the first project
I ever built with Vue.js and served as an introduction to the framework and modern Javascript.

## How does it work?

The Spotify Now Playing viewer will

- ✅ - Use the Spotify Web API to get your current playing track (no other data is accessed)
- ✅ - Use Access and Refresh Tokens to ensure that you're kept logged in between sessions
- ✅ - Display the current track artist
- ✅ - Show the Album cover spinning in 3D
- ✅ - Set a matching vibrant background colour with node-vibrant

# Preview

[Live demo](https://spotify.liam.social)

**Note**: Due to [#492](https://github.com/spotify/web-api/issues/492) of the Spotify Web API, there is currently no way
to stream the now playing song. By such, this project is meant to be self-hosted to avoid rate-limiting.

If you want to use the project you should fork it and build with Netlify or your own webserver using your own API keys (see [How to use](#how-to-use)).

The demo website above only serves as demonstration, due to the API limits imposed by Spotify only the users
whose emails have been manually added to the app can log in.

![Preview image](https://i.imgur.com/KDhOG9A.png)
![Preview image](https://i.imgur.com/6L7oT0Z.png)
![Preview image](https://i.imgur.com/YR1PjsD.png)

## Browser support

Most modern browsers are supported (excluding Internet Explorer).

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/) | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/) | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/) | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/) | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/) |
|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Edge                                                                                                                                                                                               | Firefox                                                                                                                                                                                                | Chrome                                                                                                                                                                                              | Safari                                                                                                                                                                                              | Opera                                                                                                                                                                                            |

## How to use

You can either clone the repo, compile the code offline, and upload to your own webserver or use one of
the supported platforms.

The tutorial below is for Netlify, Vue.js works with other platforms as well such as Github and Gitlab Pages
(though do take precautions with your API keys, for more info, please check out: https://cli.vuejs.org/guide/deployment.html#platform-guides)

### 1. Fork this repository

On this page, click on the 'Fork' button in the top-right to create a copy of the repo as-is on your account. Alternatively, you can clone the repo and push to Github.

### 2. Create a new project on Netlify

Log in to Netlify and click 'New site from Git'.

If you're doing this for the first time, you will need to authorise your Github account with Netlify by following the instructions.

Once authorised, follow the on-screen instructions to connect your repository. You should be fine to leave the default settings as-is here.

Click on 'Deploy site'.

_Note: This project was built around Node 16. This has been set in the project environment._

### 3. Create Spotify Client keys.

To allow authorisation to your track data, you'll need to generate client keys. You can do this by logging in to the [Spotify Dashboard](https://developer.spotify.com/dashboard/applications) and creating an app.

Set the 'Redirect URI' as the URL of your project in Netlify. This must be set else Spotify won't authorise the app.

You can leave the other settings (Callback URL, Bundle IDs etc) blank.

Copy down the Client Secret and Client ID and save your app in the Spotify Dashboard.

### 4. Add the Client ID and Client Secret to Netlify

Now that we have our Spotify API keys, we must let the app know that they exist.

To do this, navigate to Netlify > Site Settings > Build & Deploy > Environment

Under 'Environment variables', add two fields. The 'Keys' can be found in the `env.sample` file and the values will be the Client ID and Client Secret, respectively.

Hit save.

### 5. View App

Once the environment variables are in, you can now navigate to your Netlify site. You'll be prompted with a Spotify login button. Do that, and you're good to go!

## Local setup
```
npm install
```

#### Compiles and hot-reloads for development
```
npm run serve
```

#### Compiles and minifies for production
```
npm run build
```

#### Lints and fixes files
```
npm run lint
```

#### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Credits

This project was heavily inspired by [Nowify](https://github.com/jonashcroft/Nowify).

Please give them your support!

Thanks [node-vibrant](https://github.com/Vibrant-Colors/node-vibrant)
and [Bootstrap 5.0](https://github.com/twbs/bootstrap) for making the design process much easier.

## License

[MIT](https://github.com/Inkapable/spotify-viewer/blob/master/LICENSE)
