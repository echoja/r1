<template>
  <div class="flex flex-col">
    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div
          class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"
        >
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                  :class="thClass"
                  v-for="field in fields"
                  :key="field.key"
                >
                  {{ field.label }}
                </th>
                <!-- <th scope="col" class="relative px-6 py-3">
                    <span class="sr-only">Edit</span>
                  </th> -->
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(row, rowIndex) in tableData"
                :key="rowIndex"
                class="bg-white"
              >
                <td
                  v-for="col in fields"
                  :key="col.key"
                  class="px-4 py-2.5 break-all text-sm text-center text-gray-900"
                  :style="{ maxWidth: '150px' }"
                  :class="col.tdClass"
                >
                  {{ row[col.key] }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { PropType } from "vue";

export default {
  props: {
    tableData: {
      type: Array as PropType<Record<string, string>[]>,
      default: [],
    },
    fields: {
      type: Array as PropType<{key: string, label: string, tdClass?: string}[]>,
      required: true,
    },
    thClass: String,
  },
};
</script>

<style>
</style>
