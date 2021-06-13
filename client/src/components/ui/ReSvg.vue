<template>
  <svg class="re-svg" :width="width" :height="height"  :viewBox="viewBox">
    <path :d="path" fill="currentColor" />
  </svg>
</template>

<script lang="ts">
export default {
  props: {
    path: { type: String, required: true },
    viewBox: {
      type: String,
      default: "0 0 24 24",
    },
    width: {
      type: [String, Number],
      default: "24",
    },
    height: {
      type: [String, Number],
      default: "24",
    },
  },
};
</script>

