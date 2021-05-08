<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
  <div>
    <span>a: {{ a }}</span>
    <br />
    <span>b: {{ b }}</span>
    <br />
    <span>c: {{ c }}</span>
    <br />
    <span>d: {{ d }}</span>
    <br />
    <span>e: {{ e }}</span>
    <br />
    <pre>{{ env }}</pre>
    <br />
  </div>
</template>

<script lang="ts">
import { METHODS } from 'http';
import { defineComponent, ref } from 'vue'
import HelloWorld from './components/HelloWorld.vue'


export default defineComponent({
  name: 'App',
  components: {
    HelloWorld
  },
  setup(props) {
    const a = ref(import.meta.env.NODE_ENV);
    const b = ref(import.meta.env.DB_HOST);
    const c = ref(import.meta.env.DB_NAME);
    const d = ref(import.meta.env.DB_PASSWORD);
    const e = ref(import.meta.env.VITE_DB_USER);
    const env = import.meta.env;
    return {
      a, b, c, d, e, env
    };
  },
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
