<template>
  <div
      v-if="player.playing"
      class="d-flex flex-column h-100"
  >
    <div id="cover">
      <div class="scene" style="-webkit-transform:rotateX(-7deg) rotateY(542deg); -moz-transform:rotateX(-7deg) rotateY(542deg); -ms-transform:rotateX(-7deg) rotateY(542deg); transform:rotateX(-7deg) rotateY(542deg); ">
        <div class="shape cuboid-1 album-3d">
          <div class="face ft" :style="{ backgroundImage : 'url(' + player.trackAlbum.image + ')' }">
            <div class="photon-shader" style="background-color: rgba(0, 0, 0, 0.47);"></div>
          </div>
          <div class="face bk">
            <div class="photon-shader" style="background-color: rgba(0, 0, 0, 0.13);"></div>
          </div>
          <div class="face rt">
            <div class="photon-shader" style="background-color: rgba(0, 0, 0, 0.47);"></div>
          </div>
          <div class="face lt">
            <div class="photon-shader" style="background-color: rgba(0, 0, 0, 0.47);"></div>
          </div>
          <div class="face bm">
            <div class="photon-shader" style="background-color: rgba(0, 0, 0, 0.47);"></div>
          </div>
          <div class="face tp">
            <div class="photon-shader" style="background-color: rgba(0, 0, 0, 0.47);"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex flex-column pb-5">
      <h1 class="text-center" v-text="player.trackTitle"></h1>
      <h2 class="text-center pt-2 light" v-text="trackArtists"></h2>
    </div>
  </div>
  <div v-else class="d-flex flex-column h-100 justify-content-center">
    <h1 class="text-center">No music detected 🤔</h1>
    <h3 class="text-center pt-3 light">To get started, play a song on Spotify</h3>
  </div>
</template>

<script>
import {computed, nextTick, onBeforeUnmount, onMounted, ref, watch} from "vue";
import * as Vibrant from 'node-vibrant'
import { setAppColours } from '../utils/colors.js'

export default {
  name: "Playing",
  props: {
    config: Object,
    endpoints: Object,
    player: Object
  },
  async setup(props, { emit }) {

    /**
     * Refs and computed
     */
    let pollPlaying = ''
    const playerResponse = ref({})
    const playerData = ref(getEmptyPlayer())
    const colourPalette = ref('')
    const swatches = ref([])
    const trackArtists = computed(() => props.player.trackArtists.join(', '))

    /**
     * Return a formatted empty object for an idle player.
     * @return {Object}
     */
    function getEmptyPlayer() {
      return {
        playing: false,
        trackAlbum: {},
        trackArtists: [],
        trackId: '',
        trackTitle: ''
      }
    }


    /**
     * Make the network request to Spotify to
     * get the current played track.
     */
    async function getNowPlaying() {
      let data = {}

      try {
        const response = await fetch(
            `${props.endpoints.base}/${props.endpoints.nowPlaying}`,
            {
              headers: {
                Authorization: `Bearer ${props.config.accessToken}`
              }
            }
        )

        /**
         * Fetch error.
         */
        if (!response.ok) {
          if (response.status === 403) {
            setAppColours('white', '#183059')
            emit('clear')
            window.alert("Your account is not whitelisted on this app")
            return
          }
          throw new Error(`An error has occured: ${response.status}`)
        }

        /**
         * Spotify returns a 204 when no current device session is found.
         * The connection was successful but there's no content to return.
         */
        if (response.status === 204) {
          playerData.value = getEmptyPlayer()
          document.title = 'No music detected 🤔'
          setAppColours('white', '#183059')
          await nextTick(() => {
            emit('spotifyTrackUpdated', data)
          })

          return
        }

        data = await response.json()
        playerResponse.value = data
      } catch (error) {
        setAppColours('white', '#183059')
        playerData.value = getEmptyPlayer()
        handleExpiredToken()
        await nextTick(() => {
          emit('spotifyTrackUpdated', data)
        })
      }
    }

    /**
     * Handle newly updated Spotify Tracks.
     */
    function handleNowPlaying() {

      if (
          playerResponse.value.error?.status === 401 ||
          playerResponse.value.error?.status === 400
      ) {
        document.title = 'No music detected 🤔'
        setAppColours('white', '#183059')
        handleExpiredToken()

        return
      }

      /**
       * Player is active, but user has paused.
       */
      if (playerResponse.value.is_playing === false) {
        playerData.value = getEmptyPlayer()
        document.title = 'No music detected 🤔'
        setAppColours('white', '#183059')
        return
      }

      /**
       * The newly fetched track is the same as our stored
       * one, we don't want to update the DOM yet.
       */
      if (playerResponse.value.item?.id === playerData.value.trackId) {
        return
      }

      /**
       * Store the current active track.
       */
      playerData.value = {
        playing: playerResponse.value.is_playing,
        trackArtists: playerResponse.value.item.artists.map(
            artist => artist.name
        ),
        trackTitle: playerResponse.value.item.name,
        trackId: playerResponse.value.item.id,
        trackAlbum: {
          title: playerResponse.value.item.album.name,
          image: playerResponse.value.item.album.images[0].url
        }
      }

      document.title = playerData.value.trackTitle
    }


    /**
     * Get the colour palette from the album cover.
     */
    function getAlbumColours() {
      /**
       * No image (rare).
       */
      if (!props.player.trackAlbum?.image) {
        return
      }

      /**
       * Run node-vibrant to get colours.
       */
      Vibrant.from(props.player.trackAlbum.image)
          .quality(1)
          .clearFilters()
          .getPalette()
          .then((palette) => {
            handleAlbumPalette(palette)
          })
    }

    /**
     * Handle newly stored colour palette:
     * - Map data to readable format
     * - Get and store random colour combination.
     */
    function handleAlbumPalette(palette) {
      let albumColours = Object.keys(palette)
          .filter(item => {
            return item === null ? null : item
          })
          .map(colour => {
            return {
              text: palette[colour].getBodyTextColor(),
              background: palette[colour].getHex()
            }
          })

      swatches.value = albumColours
      colourPalette.value =
          albumColours[Math.floor(Math.random() * albumColours.length)]

      nextTick(() => {
        setAppColours(colourPalette.value.text, colourPalette.value.background)
      })
    }

    /**
     * Handle an expired access token from Spotify.
     */
    function handleExpiredToken() {
      clearInterval(pollPlaying)
      emit('requestRefreshToken')
    }


    /**
     * Poll Spotify for data.
     */
    onMounted(() =>
    {
      clearInterval(pollPlaying)
      pollPlaying = setInterval(() => {
        getNowPlaying()
      }, 2500)
    })

    /**
     * Clear Interval on unmount
     */
    onBeforeUnmount(() =>
    {
      clearInterval(pollPlaying)
    })

    /**
     * Watch the auth object returned from Spotify.
     */
    watch(() => props.config.status, () => {
      if (props.config.status === false){
        clearInterval(pollPlaying)
      }
    })

    /**
     * Watch the returned track object.
     */
    watch(() => playerResponse.value, () => {
      handleNowPlaying()
    })

    /**
     * Watch our locally stored track data.
     */
    watch(() => playerData.value, () => {
      emit('spotifyTrackUpdated', playerData.value)
      nextTick(() => {
        getAlbumColours()
      })
    })

    return {trackArtists}
  }
}
</script>

<style scoped>

#cover {
  perspective: 800px;
  overflow: hidden;
  width: 100%;
  height: 100%;
  background: transparent;
  font-size: 162.5%;
}
.face {
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.4);
}
.scene, .shape, .face, .face-wrapper, .cr {
  position: absolute;
  transform-style: preserve-3d;
}
.scene {
  width: 70em;
  height: 70em;
  top: 50%;
  left: 50%;
  margin: -35em 0 0 -35em;
}
.shape {
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  transform-origin: 50%;
}
.face, .face-wrapper {
  overflow: hidden;
  transform-origin: 0 0;
  backface-visibility: hidden;
  /* hidden by default, prevent blinking and other weird rendering glitchs */
}
.face {
  background-size: 100% 100%!important;
  background-position: center;
}
.face-wrapper .face {
  left: 100%;
  width: 100%;
  height: 100%
}
.photon-shader {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%
}
.side {
  left: 50%;
}
.cr, .cr .side {
  height: 100%;
}
[class*="cuboid"] .ft, [class*="cuboid"] .bk {
  width: 100%;
  height: 100%;
}
[class*="cuboid"] .bk {
  left: 100%;
}
[class*="cuboid"] .rt {
  transform: rotateY(-90deg) translateX(-50%);
}
[class*="cuboid"] .lt {
  transform: rotateY(90deg) translateX(-50%);
}
[class*="cuboid"] .tp {
  transform: rotateX(90deg) translateY(-50%);
}
[class*="cuboid"] .bm {
  transform: rotateX(-90deg) translateY(-50%);
}
[class*="cuboid"] .lt {
  left: 100%;
}
[class*="cuboid"] .bm {
  top: 100%;
}
/* .album-3d styles */
.album-3d {
  opacity:1;
  width:12em;
  height:12em;
  margin:-6em 0 0 -6em;
  animation: rotation-3d 10s infinite linear;
}

.album-3d .ft {
  transform:translateZ(0.2em);
}
.album-3d .bk {
  transform:translateZ(-0.2em) rotateY(180deg);
}
.album-3d .rt, .album-3d .lt {
  width:0.6em;
  height:12em;
}
.album-3d .tp, .album-3d .bm {
  width:12em;
  height:0.6em;
}
.album-3d .face {
  background-color: #1f1f1f;
}
.album-3d .bk {
  background-image:url('../assets/back.jpg');
}

@-webkit-keyframes rotation-3d {
  from {
    -webkit-transform: rotateY( 0deg ) rotateX( 0deg );
  }
  to {
    -webkit-transform: rotateY( 360deg ) rotateX( 0deg );
  }
}

@keyframes rotation-3d {
  from {
    transform: rotateY( 0deg ) rotateX( 0deg );
  }
  to {
    transform: rotateY( 360deg ) rotateX( 0deg );
  }
}

</style>