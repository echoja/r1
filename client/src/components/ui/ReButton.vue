<template>
  <button
    type="button"
    :class="[paddingClass, typeClass]"
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
      focus:outline-none focus:ring-2 focus:ring-offset-2
      disabled:opacity-70 disabled:cursor-default
    "
  >
    <div class="inline-flex" :class="{ 'opacity-0': loading }">
      <slot></slot>
      <component
        v-if="affixIcon"
        class="ml-2 -mr-1 h-5 w-5"
        aria-hidden="true"
        :is="affixIcon"
      ></component>
    </div>
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

<script lang="ts">
import { computed, PropType } from "vue";
import { mdiLoading } from "@mdi/js";
import ReSvg from "@/components/ui/ReSvg.vue";

const buttonTypes = ["primary", "secondary", "white"] as const;
type buttonType = typeof buttonTypes[number];

export default {
  components: {
    ReSvg,
  },
  props: {
    paddingClass: {
      type: String,
      default: "px-3 py-1.5",
    },
    affixIcon: {
      type: Function,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    bg: {
      type: String,
      default: "indigo",
    },
    variant: {
      type: String as PropType<buttonType>,
      default: "primary",
    },
    disabled: Boolean,
  },
  setup(props, ctx) {
    const typeClass = computed(() => {
      let result = "";
      switch (props.variant) {
        case "primary":
        case "secondary":
          result = `text-white bg-${props.bg}-600 hover:bg-${props.bg}-700 focus:ring-${props.bg}-500`;
          break;
        case "white":
          result = `border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:ring-${props.bg}-500`;
          break;
        default:
          break;
      }
      return result;
    });

    return {
      mdiLoading,
      typeClass,
    };
  },
};
</script>

<style></style>
