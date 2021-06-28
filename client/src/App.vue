<template>
  <div class="mx-auto" style="width: 1600px">
    <div class="text-4xl mb-3 font-bold mt-4">Research</div>
    <div class="p-3">
      <router-link class="mr-3" :to="{ name: 'Search' }">Search</router-link>
      <router-link class="mr-3" :to="{ name: 'About' }">About</router-link>
      <router-link :to="{ name: 'Practice' }"><b>Practice</b></router-link>
    </div>
  </div>
  <hr class="mb-4" />
  <router-view v-slot="{ Component }">
    <transition>
      <keep-alive>
        <component :is="Component"></component>
      </keep-alive>
    </transition>
  </router-view>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import HelloWorld from "./components/HelloWorld.vue";

export default defineComponent({
  name: "App",
  components: {
    HelloWorld,
  },
  props: {
    lang: String,
  },
  setup(props) {
    return {
      a: "hello",
      number: ref(0),
    };
  },
  methods: {
    addNumber() {
      this.number += 1;
    },
  },
});
</script>

<style>
#app {
  font-family: "Noto Sans KR", Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.title {
  font-size: 30px;
}
</style>
