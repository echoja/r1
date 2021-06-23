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
                  v-if="showIndex"
                  scope="col"
                  class="
                    px-4
                    py-3
                    text-center text-xs
                    font-medium
                    text-gray-500
                    uppercase
                    tracking-wider
                  "
                  :class="thClass"
                >
                  연번
                </th>
                <th
                  scope="col"
                  class="
                    px-4
                    py-3
                    text-center text-xs
                    font-medium
                    text-gray-500
                    uppercase
                    tracking-wider
                  "
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
                v-for="(row, rowIndex) in slicedTableData"
                :key="rowIndex"
                class="bg-white"
              >
                <td
                  v-if="showIndex"
                  class="
                    px-4
                    py-2.5
                    break-all
                    text-sm text-center text-gray-900
                  "
                >
                  {{ rowIndex + startIndex }}
                </td>
                <td
                  v-for="col in fields"
                  :key="col.key"
                  class="
                    px-4
                    py-2.5
                    break-all
                    text-sm text-center text-gray-900
                  "
                  :style="{ maxWidth: '150px' }"
                  :class="col.tdClass"
                >
                  {{ row[col.key] }}
                </td>
              </tr>
            </tbody>
          </table>
          <div class="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
            <RePagination
              v-if="totalPage != 0"
              :currentPage="currentPage"
              :totalPage="totalPage"
              :linkGen="linkGen"
              :startIndex="startIndex"
              :endIndex="endIndex"
              :totalCount="tableData.length"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, PropType, ref } from "vue";
import { RouteLocationRaw, useRoute } from "vue-router";
import { comparerStringByKey } from "@/util";
import RePagination from "./RePagination.vue";

export default {
  components: {
    RePagination,
  },
  props: {
    tableData: {
      type: Array as PropType<Record<string, string>[]>,
      default: () => [],
    },
    fields: {
      type: Array as PropType<
        { key: string; label: string; tdClass?: string }[]
      >,
      required: true,
    },
    thClass: String,
    perpage: {
      type: Number,
      default: 20,
    },
    currentPage: {
      type: Number,
      default: 1,
    },
    linkGen: {
      type: Function as PropType<(page: number) => RouteLocationRaw>,
      default: (page: number): RouteLocationRaw => ({
        name: "Search",
        query: { page: `${page}` },
      }),
    },
    showIndex: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, ctx) {
    const defaultKey = ref(props.fields[0].key);
    const orderedTableData = computed(() => {
      return [...props.tableData].sort(comparerStringByKey(defaultKey.value));
    });
    const totalPage = computed(() => {
      return Math.ceil(props.tableData.length / props.perpage);
    });
    const startIndex = computed(() => {
      return (props.currentPage - 1) * props.perpage + 1;
    });
    const endIndex = computed(() => {
      let index = startIndex.value + props.perpage - 1;
      if (index > props.tableData.length) {
        index = props.tableData.length;
      }
      return index;
    });
    const slicedTableData = computed(() => {
      return orderedTableData.value.slice(startIndex.value - 1, endIndex.value);
    });
    return {
      orderedTableData,
      slicedTableData,
      totalPage,
      startIndex,
      endIndex,
    };
  },
};
</script>

<style></style>
