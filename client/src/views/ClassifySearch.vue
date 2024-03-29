<template>
  <div class="text-left mx-auto mt-20" :style="{ width: '1600px' }">
    <div class="mx-10">
      <div class="flex justify-center mb-3">
        <ReSelect
          class="mr-2"
          :style="{ width: '230px' }"
          v-model="group"
          :data="searchOptions"
        />
        <ReInput
          @keypress.enter.stop="searchEnterPressed"
          placeholder="검색어 입력"
          class="mr-2"
          v-model="search"
          :style="{ width: '400px' }"
        />
        <ReButton
          @click="searchClicked"
          :affixIcon="SearchIcon"
          :loading="dataLoading"
          >검색</ReButton
        >
      </div>
      <div v-if="tableData.length !== 0">
        <div class="flex justify-end mb-3">
          <ReButton
            variant="white"
            @click="excelClicked"
            :loading="excelLoading"
          >
            <ReSvg :path="mdiFileExcel"></ReSvg>
          </ReButton>
        </div>
        <ReTable
          :fields="fields"
          :tableData="tableData"
          :thClass="thClass"
          :linkGen="linkGen"
          :currentPage="currentPage"
          @align="
            $router.push({
              name: 'Search',
              query: { ...$route.query, page: 1 },
            })
          "
        ></ReTable>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineAsyncComponent,
  onMounted,
  reactive,
  Ref,
  ref,
} from "vue";
import { searchGroupNameMap } from "@const";
import { searchGroupKey } from "@type";
import { SearchIcon } from "@heroicons/vue/solid";
import { mdiFileExcel } from "@mdi/js";
import { ReTableField } from "@/components/ui/ui-types";
import {
  useRouter,
  useRoute,
  onBeforeRouteUpdate,
  RouteLocationRaw,
} from "vue-router";
import axios from "axios";
import { saveAs } from "file-saver";

const axiosLocal = axios.create();

export default {
  name: "ClassifySearch",
  components: {
    ReSelect: defineAsyncComponent(
      () => import("@/components/ui/ReSelect.vue")
    ),
    ReButton: defineAsyncComponent(
      () => import("@/components/ui/ReButton.vue")
    ),
    ReInput: defineAsyncComponent(() => import("@/components/ui/ReInput.vue")),
    ReTable: defineAsyncComponent(() => import("@/components/ui/ReTable.vue")),
    ReSvg: defineAsyncComponent(() => import("@/components/ui/ReSvg.vue")),
  },
  setup(props, cxt) {
    const router = useRouter();
    const route = useRoute();

    const searchOptionValue: Ref<string | null> = ref(null);
    const group = ref("");
    const searchOptions: { value: searchGroupKey; label: string }[] = [
      {
        value: "P",
        label: searchGroupNameMap.P,
      },
      {
        value: "I",
        label: searchGroupNameMap.I,
      },
      {
        value: "E",
        label: searchGroupNameMap.E,
      },
      {
        value: "A",
        label: searchGroupNameMap.A,
      },
      {
        value: "D",
        label: searchGroupNameMap.D,
      },
    ];
    const search = ref("");
    const dataLoading = ref(false);

    const doSearch = async () => {
      if (!group.value) {
        alert("분류를 선택해주세요.");
        return;
      }
      router.push({
        name: "ClassifySearch",
        query: { group: group.value, search: search.value },
      });
    };

    const searchClicked = (event: MouseEvent) => {
      doSearch();
    };
    const searchEnterPressed = (event: KeyboardEvent) => {
      const target = event.target as HTMLInputElement;
      target.blur();
      doSearch();
    };
    const noResult = ref(false);
    const tableData = ref(reactive<Record<string, string>[]>([]));
    const thClass = "";
    const fields = ref(reactive<ReTableField>([]));
    const makeFields = (data: Record<string, string>[]) => {
      fields.value = reactive(
        Object.keys(data[0]).map((colName) => ({
          key: colName,
          label: colName,
          tdClass: "",
          align: true,
        }))
      );
    };

    const fetchData = async () => {
      dataLoading.value = true;
      try {
        // 데이터 받아오기
        const res = await axiosLocal.get<Record<string, string>[]>(
          `/api/search-by-group/${group.value}/${search.value}`
        );
        console.log(res.data);
        if (res.data.length === 0) {
          noResult.value = true;
          throw new Error("검색 결과가 없습니다");
        }
        // 적절한 필드 생성
        makeFields(res.data);

        // 데이터 갱신
        tableData.value = res.data;
        noResult.value = false;
      } catch (e) {
        alert(e.message);
      }
      dataLoading.value = false;
    };

    onMounted(() => {
      const { group: groupParam, search: searchParam } = route.query;
      if (typeof groupParam === "string" && typeof searchParam === "string") {
        group.value = groupParam;
        search.value = searchParam;
        fetchData();
      } else {
        noResult.value = true;
      }
    });
    onBeforeRouteUpdate((to, from, next): void => {
      const { group: groupTo, search: searchTo } = to.query;
      const { group: groupFrom, search: searchFrom } = from.query;
      if (groupTo === groupFrom && searchTo === searchFrom) return next();
      if (typeof groupTo === "string" && typeof searchTo === "string") {
        group.value = groupTo;
        search.value = searchTo;
        fetchData();
      } else {
        noResult.value = true;
      }
      return next();
    });

    /** excel download */
    const excelLoading = ref(false);
    const excelClicked = () => {
      // const excel = xlsxUtils.json_to_sheet(tableData.value);
      // const book = xlsxUtils.book_new();
      // xlsxUtils.book_append_sheet(book, excel, "export");
      // const array = xlsxWrite(book, { type: "array" });
      // const blob = new Blob([array]);
      excelLoading.value = true;
      const now = new Date();
      saveAs(
        `/api/download/${group.value}/${search.value}`,
        `research_result_${
          search.value
        }_${now.getFullYear()}-${now.getMonth()}-${now.getDate()}.xlsx`
      );
      excelLoading.value = false;
    };

    /** pagination */
    const currentPage = computed(() => {
      const { page } = route.query;
      if (typeof page !== "string") {
        return 1;
      }
      const pageNumber = parseInt(page, 10);
      if (Number.isNaN(pageNumber) || pageNumber < 1) {
        return 1;
      }
      return pageNumber;
    });
    const linkGen = (page: number): RouteLocationRaw => {
      return {
        name: "ClassifySearch",
        query: {
          ...route.query,
          page,
        },
      };
    };

    return {
      searchOptionValue,
      searchOptions,
      group,
      search,
      searchClicked,
      searchEnterPressed,
      SearchIcon,
      dataLoading,
      noResult,
      fields,
      thClass,
      tableData,
      excelClicked,
      excelLoading,
      mdiFileExcel,
      linkGen,
      currentPage,
    };
  },
};
</script>
