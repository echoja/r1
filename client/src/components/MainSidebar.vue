<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="flex flex-col pt-5 pb-4 overflow-y-auto">
    <div class="flex items-center px-4 lg:px-8 sm:px-6">
      <span class="font-medium text-lg">
        {{ title }}
      </span>
    </div>
    <div class="mt-5 flex-grow flex flex-col">
      <nav class="flex-1 px-2 bg-white" aria-label="Sidebar">
        <template v-for="item in items" :key="item.title">
          <router-link
            :to="{ name: item.name }"
            custom
            v-slot="{ navigate, href, isActive }"
          >
            <a
              :href="href"
              :class="[
                isActive
                  ? 'border-indigo-600 text-indigo-700 font-medium'
                  : 'text-gray-600 hover:text-gray-900 border-transparent',
                'group flex items-center pr-2 pl-4 sm:px-6 lg:px-8 py-2 text-sm -ml-2 border-l-4 hover:text-indigo-700',
              ]"
              @click="navigate"
            >
              <span class="flex-1">
                {{ item.title }}
              </span>
            </a>
          </router-link>
          <div
            v-if="item.children && routeMatched1Name === item.name"
            class="ml-8"
          >
            <router-link
              v-for="child in item.children"
              :key="child.name"
              :to="{ name: child.name }"
              custom
              v-slot="{ navigate, href, isExactActive }"
            >
              <a
                :href="href"
                :class="[
                  isExactActive
                    ? 'border-indigo-500 text-indigo-700 font-medium'
                    : 'text-gray-600  hover:text-gray-900',
                  'group flex items-center px-2 py-2 text-xs hover:text-indigo-700',
                ]"
                @click="navigate"
              >
                <span class="flex-1">
                  {{ child.title }}
                </span>
              </a>
            </router-link>
          </div>
        </template>
      </nav>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, PropType } from "vue";
import { useRoute } from "vue-router";
import { MainSidebarItems } from "@/types";

export default {
  props: {
    title: {
      type: String,
      default: "Menu Title",
    },
    items: {
      type: Array as PropType<MainSidebarItems>,
      default: () => [],
    },
  },
  setup() {
    const route = useRoute();
    const routeMatched1Name = computed(() => route.matched[1]?.name);
    return { route, routeMatched1Name };
  },
};
</script>
