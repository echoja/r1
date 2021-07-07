<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="bg-gray-100">
    <Disclosure as="nav" class="bg-white shadow-sm" v-slot="{ open }">
      <div class="mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <!-- Logo -->
          <div class="flex-shrink-0 flex items-center">
            <router-link
              :to="{ name: 'Home' }"
              class="font-bold text-2xl hover:text-gray-500 transition"
            >
              Kim Hyo Jung
            </router-link>
          </div>
          <!-- normal menu -->
          <div class="hidden md:-my-px md:ml-6 md:flex md:space-x-8">
            <router-link
              v-for="item in menu"
              :key="item.title"
              :to="item.route"
              custom
              v-slot="{ navigate, href, isActive }"
            >
              <a
                :href="href"
                :class="[
                  isActive
                    ? 'border-indigo-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                  'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium',
                ]"
                :aria-current="isActive ? 'page' : undefined"
                @click="navigate"
              >
                {{ item.title }}
              </a>
            </router-link>
          </div>
          <div class="-mr-2 flex items-center md:hidden">
            <!-- Mobile menu button -->
            <DisclosureButton
              class="
                bg-white
                inline-flex
                items-center
                justify-center
                p-2
                rounded-md
                text-gray-400
                hover:text-gray-500 hover:bg-gray-100
                focus:outline-none
                focus:ring-2
                focus:ring-offset-2
                focus:ring-indigo-500
              "
            >
              <span class="sr-only">Open main menu</span>
              <MenuIcon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
              <XIcon v-else class="block h-6 w-6" aria-hidden="true" />
            </DisclosureButton>
          </div>
        </div>
      </div>

      <DisclosurePanel class="md:hidden">
        <div class="pt-2 pb-3">
          <router-link
            v-for="item in menu"
            :key="item.title"
            :to="item.route"
            custom
            v-slot="{ navigate, href, isActive }"
          >
            <a
              @click="navigate"
              :aria-current="isActive ? 'page' : undefined"
              :href="href"
              :class="[
                isActive
                  ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                  : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800',
                'block pl-3 pr-4 py-2 border-l-4 text-base font-medium',
              ]"
            >
              {{ item.title }}
            </a>
          </router-link>
        </div>
        <div></div>
      </DisclosurePanel>
    </Disclosure>
  </div>
</template>

<script lang="ts">
import { PropType, ref } from "vue";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import { MenuIcon, XIcon } from "@heroicons/vue/outline";
import { MainSidebarItems } from "@/types";
import { RouteLocationRaw } from "vue-router";

export default {
  components: {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    MenuIcon,
    XIcon,
  },
  props: {
    menu: {
      type: Array as PropType<{ title: string; route: RouteLocationRaw }[]>,
      default: () => [],
    },
    sidebarItems: {
      type: Array as PropType<MainSidebarItems>,
      default: () => [],
    },
    sidebarTitle: {
      type: String,
      default: "sidebarTitle",
    },
  },
  setup() {
    const open = ref(false);

    return {
      open,
    };
  },
};
</script>
