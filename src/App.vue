<template>
  <router-view v-slot="{ Component}">
    <Suspense>
      <template #default>
        <component :is="Component"/>
      </template>
      <template #fallback>
        <div>Loading...</div>
      </template>
    </Suspense>
  </router-view>
</template>
<script>
export default {
  name: 'App'
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,500;1,300&display=swap');
#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

.button-pushable {
  position: relative;
  border: none;
  background: transparent;
  padding: 0;
  cursor: pointer;
  outline-offset: 4px;
  transition: filter 250ms;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;

}

.button-shadow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  background: hsl(0deg 0% 0% / 0.25);
  will-change: transform;
  transform: translateY(2px);
  transition:
      transform
      600ms
      cubic-bezier(.3, .7, .4, 1);
}

.button-edge {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  background: linear-gradient(
      to left,
      #143760,
      #1f5899,
      #1f5899,
      #143760
  );
}

.button-front {
  display: block;
  position: relative;
  padding: 60px 27px;
  border-radius: 12px;
  font-size: 1.15rem;
  color: white;
  background: #276FBF;
  will-change: transform;
  transform: translateY(-4px);
  transition:
      transform
      600ms
      cubic-bezier(.3, .7, .4, 1);
}

@media (min-width: 768px) {
  .button-front {
    font-size: 1.25rem;
    padding: 60px 42px;
  }
}

.button-pushable:hover {
  filter: brightness(110%);
}

.button-pushable:hover .button-front {
  transform: translateY(-6px);
  transition:
      transform
      250ms
      cubic-bezier(.3, .7, .4, 1.5);
}

.button-pushable:active .button-front {
  transform: translateY(-2px);
  transition: transform 34ms;
}

.button-pushable:hover .button-shadow {
  transform: translateY(4px);
  transition:
      transform
      250ms
      cubic-bezier(.3, .7, .4, 1.5);
}

.button-pushable:active .button-shadow {
  transform: translateY(1px);
  transition: transform 34ms;
}

.button-pushable:focus:not(:focus-visible) {
  outline: none;
}
</style>
