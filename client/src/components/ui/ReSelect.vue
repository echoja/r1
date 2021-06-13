<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <!-- <Listbox as="div" :modelValue="selected" @update:modelValue="selectedChanged"> -->
  <Listbox as="div" v-model="selected" @update:modelValue="selectedChanged">
    <ListboxLabel v-if="label" class="block text-sm font-medium text-gray-700">
      {{ label }}
    </ListboxLabel>
    <div class="mt-1 relative">
      <ListboxButton
        class="
          bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left
          cursor-default
          focus:outline-none
          focus:ring-1
          focus:ring-indigo-500
          focus:border-indigo-500
          sm:text-sm
          disabled:opacity-70
        "
      >
        <!-- it was truncate -->
        <span class="block truncate">{{ currentLabel ?? placeholder }}</span>
        <span
          class="
            absolute
            inset-y-0
            right-0
            flex
            items-center
            pr-2
            pointer-events-none
          "
        >
          <SelectorIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </span>
      </ListboxButton>

      <transition
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions
          class="
            absolute
            z-10
            mt-1
            w-full
            bg-white
            shadow-lg
            max-h-60
            rounded-md
            py-1
            text-base
            ring-1 ring-black ring-opacity-5
            overflow-auto
            focus:outline-none
            sm:text-sm
          "
        >
          <ListboxOption
            as="template"
            v-for="item in data"
            :key="item.value"
            :value="item"
            v-slot="{ active, selected }"
          >
            <li
              :class="[
                active ? 'text-white bg-indigo-600' : 'text-gray-900',
                'cursor-default select-none relative py-2 pl-3 pr-9',
              ]"
            >
              <!-- it was truncate -->
              <span
                :class="[
                  selected ? 'font-semibold' : 'font-normal',
                  'block truncate',
                ]"
              >
                {{ labelMap.get(item.value) }}
              </span>

              <span
                v-if="selected"
                :class="[
                  active ? 'text-white' : 'text-indigo-600',
                  'absolute inset-y-0 right-0 flex items-center pr-4',
                ]"
              >
                <CheckIcon class="h-5 w-5" aria-hidden="true" />
              </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>

  </Listbox>

</template>

<script lang="ts">
import { ref, PropType, computed} from "vue";
import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/vue";
import { CheckIcon, SelectorIcon } from "@heroicons/vue/solid";
import { mdiAccount, mdiLoading } from '@mdi/js'
import ReSvg from './ReSvg.vue';

interface ListItem {
  label: string;
  value: any;
}

export default {
  name: "ReSelect",
  components: {
    Listbox,
    ListboxButton,
    ListboxLabel,
    ListboxOption,
    ListboxOptions,
    CheckIcon,
    SelectorIcon,
    ReSvg,
  },
  props: {
    data: {
      type: Array as PropType<ReadonlyArray<ListItem>>,
      required: true,
    },
    placeholder: {
      type: String,
      default: "선택",
    },
    label: {
      type: String,
    },
    modelValue: {
      type: String,
    },
  },
  setup(props, cxt) {
    const selected = ref<ListItem | null>(null);
    const labelMap = new Map(props.data.map((item) => [item.value, item.label]));
    const currentLabel = computed(() => labelMap.get(props.modelValue));
    const selectedChanged = (item: ListItem) => {
      // selected.value = item;
      console.log(item.value);
      cxt.emit('update:modelValue', item.value);
    }
    const foundItem = computed(() =>
      props.data.find((item) => item.value === props.modelValue)
    );
    return {
      selected,
      selectedChanged,
      labelMap,
      currentLabel,
      console,
      foundItem,
      mdiAccount,
    };
  },
};
</script>
