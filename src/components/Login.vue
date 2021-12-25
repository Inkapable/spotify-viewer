<template>
  <div class="d-flex flex-column h-100 justify-content-between">
    <div class="d-flex flex-column justify-content-center">
      <img alt="Spotify logo" class="mt-5" src="../assets/logo.svg">
      <h1 class="pt-5">Spotify Now Playing Viewer</h1>
    </div>

    <div class="d-flex flex-column flex-grow-1 justify-content-around">
      <button class="button-pushable" role="button" @click="authorise">
        <span class="button-shadow"></span>
        <span class="button-edge"></span>
        <span class="button-front text">
            Login with Spotify
          </span>
      </button>
    </div>
  </div>
</template>

<script>
const searchParams = new URLSearchParams()

export default {
  name: "Login",
  props: {
    clientid: String,
    auth: String
  },
  setup(props){
    /**
     * Initial Spotify auth, redirects the user to
     * Spotify to grant app consent, user will
     * be redirected back to the app.
     */
    function authorise() {
      setAuthUrl()
      window.location.href = `${props.auth}?${searchParams.toString()}`
    }

    /**
     * Set the initial Spotify authorisation URL
     * in which the user will be redirected to.
     */
    function setAuthUrl() {
      searchParams.toString()
      searchParams.append('client_id', props.clientid)
      searchParams.append('response_type', 'code')
      searchParams.append('redirect_uri', window.location.origin)
      searchParams.append(
          'state',
          [
            Math.random()
                .toString(33)
                .substring(2),
            Math.random()
                .toString(34)
                .substring(3),
            Math.random()
                .toString(35)
                .substring(4),
            Math.random()
                .toString(36)
                .substring(5)
          ].join('-')
      )
      searchParams.append('scope', 'user-read-currently-playing')

      return `${props.auth}?${searchParams.toString()}`
    }

    return {authorise}
  }
}
</script>

<style scoped>
img {
  height: 20vh;
  width: auto;
}
</style>