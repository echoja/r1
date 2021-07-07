<template>
  <div class="flex flex-col">
    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div
          class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"
        >
          <div class="min-w-full grid" :style="{ gridTemplateColumns }">
            <div
              v-if="showIndex"
              scope="col"
              :class="`${thClass} ${thDefaultClass}`"
            >
              연번
            </div>
            <div
              scope="col"
              :class="`${thClass} ${thDefaultClass}`"
              v-for="field in fields"
              :key="field.key"
            >
              <div
                class="flex justify-center items-start"
                :class="[
                  alignKey.key === field.key
                    ? ['font-bold', 'text-gray-700']
                    : [],
                ]"
              >
                <span>{{ field.label }}</span>
                <span v-if="field.align"
                  ><button type="button" @click="align(field.key)">
                    <SelectorIcon
                      class="h-4 w-4 text-gray-400"
                      aria-hidden="true"
                    />
                  </button>
                </span>
              </div>
            </div>

            <template
              v-for="(row, rowIndex) in slicedTableData"
              :key="rowIndex"
              class="bg-white"
            >
              <div
                v-if="showIndex"
                class="
                  px-4
                  py-2.5
                  break-all
                  text-sm text-center text-gray-900
                  border-t
                "
              >
                {{ rowIndex + startIndex }}
              </div>
              <div
                v-for="col in fields"
                :key="col.key"
                class="
                  px-4
                  py-2.5
                  break-all
                  text-sm text-center text-gray-900
                  border-t
                "
                :class="col.tdClass"
              >
                <!-- :style="{ maxWidth: '150px' }" -->
                {{ row[col.key] }}
              </div>
            </template>
          </div>
          <!-- <table class="min-w-full divide-y divide-gray-200">
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
                    px-2
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
                  <div
                    class="flex justify-center items-start"
                    :class="[
                      alignKey.key === field.key
                        ? ['font-bold', 'text-gray-700']
                        : [],
                    ]"
                  >
                    <span>{{ field.label }}</span>
                    <span v-if="field.align"
                      ><button type="button" @click="align(field.key)">
                        <SelectorIcon
                          class="h-4 w-4 text-gray-400"
                          aria-hidden="true"
                        />
                      </button>
                    </span>
                  </div>
                </th>
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
          </table> -->
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
import { computed, PropType, reactive, ref } from "vue";
import { RouteLocationRaw, useRoute } from "vue-router";
import { comparerStringByKey } from "@/util";
import { SelectorIcon } from "@heroicons/vue/solid";
import RePagination from "./RePagination.vue";
import { ReTableField, ReTableFieldItem } from "./ui-types";

export default {
  components: {
    SelectorIcon,
    RePagination,
  },
  props: {
    tableData: {
      type: Array as PropType<Record<string, string>[]>,
      default: () => [],
    },
    fields: {
      type: Array as PropType<ReTableField>,
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
        name: "ClassifySearch",
        query: { page: `${page}` },
      }),
    },
    showIndex: {
      type: Boolean,
      default: true,
    },
    gridTemplateColumns: {
      type: String,
      default: `
        max-content
        max-content
        auto
        max-content
        max-content
        max-content
        auto
        minmax(0px, 60px)
        minmax(min-content, 60px)
        minmax(min-content, 60px)
        minmax(min-content, 60px)
        minmax(min-content, 60px)
        auto
        auto
        minmax(min-content, 60px)
        auto
      `,
    },
  },
  emits: ["align"],
  setup(props, ctx) {
    const alignKey = reactive<{ key: string; desc?: boolean }>({
      key: props.fields[1].key,
    });
    const align = (key: string): void => {
      if (alignKey.key === key) {
        alignKey.desc = !alignKey.desc;
      } else {
        alignKey.key = key;
        alignKey.desc = false;
      }
      ctx.emit("align");
    };
    const orderedTableData = computed(() => {
      return [...props.tableData].sort(
        comparerStringByKey(alignKey.key, { desc: alignKey.desc })
      );
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
      thDefaultClass:
        "px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider flex items-center justify-center",
      orderedTableData,
      slicedTableData,
      totalPage,
      startIndex,
      endIndex,
      alignKey,
      align,
    };
  },
};
</script>
