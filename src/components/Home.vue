<template>
  <Login
    v-if="!getStatus()"
    :clientid="config.client_id"
    :auth="endpoints.auth">
  </Login>
  <Suspense v-else>
    <template #default>
      <Playing
          :config="config"
          :endpoints="endpoints"
          :player="player"
          @spotifyTrackUpdated="updateCurrentTrack"
          @requestRefreshToken="requestRefreshTokens">
      </Playing>
    </template>
    <template #fallback>
      <div class="d-flex flex-column h-100 justify-content-center">
        <h1 class="text-center">No music detected 🤔</h1>
        <h3 class="text-center pt-3 light">To get started, play a song on Spotify</h3>
      </div>
    </template>
  </Suspense>
</template>

<script>
import {reactive, watch, ref} from 'vue';
import { getStoredAuth, setStoredAuth } from '../utils/auth.js'
import {useRoute, useRouter} from "vue-router";
import Login from './Login'
import Playing from "./Playing";

export default {
  name: "Home",
  components: {
    Login,
    Playing
  },
  async setup () {
    /**
     * Router and Route
     */
    const router = useRouter();
    const route = useRoute();

    /**
     * Refs and Reactives
     */
    const config = reactive({
      status: Object.keys(getStoredAuth()).length !== 0 ? getStoredAuth().status : false,
      client_id: process.env.VUE_APP_SP_CLIENT_ID,
      client_secret: process.env.VUE_APP_SP_CLIENT_SECRET,
      authCode: Object.keys(getStoredAuth()).length !== 0 ? getStoredAuth().authCode : '',
      accessToken: Object.keys(getStoredAuth()).length !== 0 ? getStoredAuth().accessToken : '',
      refreshToken: Object.keys(getStoredAuth()).length !== 0 ? getStoredAuth().refreshToken : '',
    })
    const endpoints = reactive({
      auth: 'https://accounts.spotify.com/authorize',
      token: 'https://accounts.spotify.com/api/token',
      base: 'https://api.spotify.com/v1',
      nowPlaying: 'me/player/currently-playing'
    })
    const player = ref({
      playing: false,
      paused: false,
      trackArtists: [],
      trackTitle: '',
      trackAlbum: []
    })

    // Watch for change in status to store the config in localStorage
    watch(() => config.status, () => {
      setStoredAuth(config)
    })

    // Get code in query
    const urlAuthCode = route.query.code
    // Update config if authCode exists
    if (urlAuthCode) {
      config.authCode = urlAuthCode
      await requestAccessTokens()
    }

    /**
     * Request the initial access and refresh tokens from Spotify.
     */
    async function requestAccessTokens(grantType = 'authorization_code')
    {
      let fetchData = {
        grant_type: grantType
      }

      if (grantType === 'authorization_code') {
        fetchData.code = config.authCode
        fetchData.redirect_uri = window.location.origin + window.location.pathname
      }

      if (grantType === 'refresh_token') {
        fetchData.refresh_token = config.refreshToken
      }

      const queryBody = new URLSearchParams(fetchData).toString()

      const clientDetails = btoa(
          `${config.client_id}:${config.client_secret}`
      )

      const res =  await fetch(`${endpoints.token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${clientDetails}`
        },
        body: queryBody
      })

      const data = await res.json()
      handleAccessTokenResponse(data)
    }

    /**
     * Handle the data returned from Spotify.
     * @param {Object} accessTokenResponse - response object from fetch.
     */
    function handleAccessTokenResponse(accessTokenResponse = {}) {
      /**
       * Auth token expired.
       */
      if (accessTokenResponse.error?.error === 'invalid_grant') {
        return
      }

      /**
       * Access Token has expired.
       */
      if (accessTokenResponse.error?.status === 401) {
        config.authCode = ''
        config.status = false

        return
      }

      /**
       * Successful.
       */
      if (accessTokenResponse.access_token) {

        config.accessToken = accessTokenResponse.access_token
        if (accessTokenResponse.refresh_token) {
          config.refreshToken = accessTokenResponse.refresh_token
        }

        config.status = true
        router.isReady().then(() => router.push({'query': null}))
      }
    }

    /**
     * Request a refresh token from Spotify.
     */
    function requestRefreshTokens() {
      config.status = false
    }

    /**
     * Update the player object.
     * @param track
     */
    function updateCurrentTrack(track) {
      player.value = {...player.value, ...track}
    }


    /**
     * Get app status to show the adequate component
     * @returns {boolean} if user is logged in
     */
    function getStatus(){
      return config.status
    }

    /**
     * request refreshToken
     */
    if (config.refreshToken) {
      await requestAccessTokens('refresh_token')
    }

    return {config, endpoints, player, getStatus, requestRefreshTokens, updateCurrentTrack}
  }
}
</script>

<style>
.light {
  font-weight : lighter;
  font-style : italic;
}
</style>