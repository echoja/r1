<template>
  <div class="mt-1">
    <input
      :type="type"
      v-bind="$attrs"
      @input="onInput"
      :modelValue="modelValue"
      :value="modelValue"
      class="
        shadow-sm
        focus:ring-indigo-500
        focus:border-indigo-500
        block
        w-full
        sm:text-sm
        border-gray-300
        rounded-md
      "
      :placeholder="placeholder"
      aria-describedby="email-description"
    />
  </div>
  <!-- <p class="mt-2 text-sm text-gray-500" id="email-description">
    We'll only use this for spam.
  </p> -->
</template>

<script lang="ts">
export default {
  props: {
    modelValue: String,
    placeholder: String,
    type: {
      type: String,
      default: "text",
    },
  },
  setup(props, cxt) {
    const onInput = (event: InputEvent) => {
      const target = event.target as HTMLInputElement | null
      cxt.emit("update:modelValue", target?.value);
    };
    return {
      onInput,
    };
  },
};
</script>

<style>
</style>
