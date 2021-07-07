<template>
  <MainMenu
    :menu="menu"
    class="relative z-30"
    :sidebar-items="sidebarItems"
    :sidebar-title="sidebarTitle"
  />
  <div class="flex relative z-0 min-h-screen">
    <div v-if="sidebarTitle && route.name != 'Home'" class="border-r">
      <MainSidebar
        :title="sidebarTitle"
        :items="sidebarItems"
        class="hidden sticky md:block top-0 md:w-52 lg:w-60"
      />
    </div>
    <div class="flex-grow">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component"></component>
        </keep-alive>
      </router-view>
    </div>
    <!-- <pre>
      {{ sidebarItems }}
    </pre> -->
  </div>
</template>

<script lang="ts">
import { computed, defineAsyncComponent, defineComponent, ref } from "vue";
import { useRoute } from "vue-router";
import HelloWorld from "./components/HelloWorld.vue";

export default defineComponent({
  name: "App",
  components: {
    HelloWorld,
    MainMenu: defineAsyncComponent(() => import("./components/MainMenu.vue")),
    MainSidebar: defineAsyncComponent(
      () => import("./components/MainSidebar.vue")
    ),
  },
  props: {
    lang: String,
  },
  setup(props) {
    const route = useRoute();
    const sidebarTitle = computed(() => {
      if (route.matched[0]) {
        return route.matched[0].name;
      }
      return "";
    });
    const sidebarItems = computed(() => {
      const grandParent = route.matched[0];
      if (!grandParent || !grandParent.children) return [];

      return grandParent.children
        .filter((parent) => parent.path !== "")
        .map((parent) => {
          return {
            name: parent.name,
            title: parent.meta?.title,
            children: parent.children
              ? parent.children.map((child) => {
                  return {
                    name: child.name,
                    title: child.meta?.title,
                  };
                })
              : [],
          };
        });
    });

    return {
      a: "hello",
      route,
      number: ref(0),
      sidebarTitle,
      sidebarItems,
      menu: [
        { title: "Research", route: { name: "Research" } },
        { title: "Award", route: { name: "Award" } },
        { title: "Career", route: { name: "Career" } },
        { title: "About", route: { name: "About" } },
        { title: "Practice", route: { name: "Practice" } },
      ],
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
  /* text-align: center */
  color: #2c3e50;
}

.title {
  font-size: 30px;
}
</style>
