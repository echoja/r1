<template>
  <button
    type="button"
    :class="[paddingClass, classByLoading]"
    v-bind="$attrs"
    :disabled="disabled || loading"
    class="
      mt-1
      relative
      inline-flex
      items-center
      border border-transparent

      shadow-sm
      text-sm
      font-medium
      rounded-md
      text-white
      bg-indigo-600
    "
  >
    <div class="inline-flex" :class="{ 'opacity-0': loading }">
      <slot></slot>
      <component
        v-if="heroiconComp"
        class="ml-2 -mr-1 h-5 w-5"
        aria-hidden="true"
        :is="heroiconComp"
      ></component>
    </div>
    <!-- v-show="loading" -->
    <!-- animate-spin -->
    <div
      v-if="loading"
      class="
        flex
        items-center
        justify-center
        absolute
        left-0
        right-0
        top-0
        bottom-0
      "
    >
      <ReSvg :path="mdiLoading" class="text-white animate-spin" />
    </div>
  </button>
</template>

<script type="ts">
import { computed } from "vue";
import { mdiLoading } from "@mdi/js";
import ReSvg from "@/components/ui/ReSvg.vue";

export default {
  components: {
    ReSvg,
  },
  props: {
    paddingClass: {
      type: String,
      default: "px-3 py-1.5",
    },
    heroiconComp: {
      type: Function,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    disabled: Boolean,
  },
  setup(props, ctx) {
    const classByLoading = computed(() => {
      if (props.loading || props.disabled) return "opacity-70 cursor-default";
      return "hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500";
    });
    return {
      mdiLoading,
      classByLoading,
    };
  },
  methods: {
    test() {},
  },
};
</script>

<style>
</style>
