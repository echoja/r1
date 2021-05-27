<template>
  <div>
    this is App
  </div>
  <div>

  <router-link class="mr-3" :to="{name: 'Home'}">홈</router-link>
  <router-link :to="{name: 'About'}">어바웃</router-link>
  </div>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import HelloWorld from './components/HelloWorld.vue'

export default defineComponent({
  name: 'App',
  components: {
    HelloWorld
  },
  props: {
    lang: String,
  },
  setup(props) {
    return {
      a: 'hello',
    }
  },
});
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
