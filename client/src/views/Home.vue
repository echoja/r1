<template>
  <div class="text-left" :style="{ margin: '0 10%', minWidth: '1400px' }">
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
        :heroiconComp="SearchIcon"
        :loading="dataLoading"
        >검색</ReButton
      >
    </div>
    <ReTable
      :fields="fields"
      :tableData="tableData"
      :thClass="thClass"
    ></ReTable>
  </div>
</template>

<script lang="ts">
import { onMounted, reactive, Ref, ref, watch } from "vue";
import { searchGroupNameMap } from "@const";
import { searchGroupKey } from "@type";
import { store } from "@/loader";
import ReSelect from "@/components/ui/ReSelect.vue";
import ReButton from "@/components/ui/ReButton.vue";
import ReInput from "@/components/ui/ReInput.vue";
import ReTable from "@/components/ui/ReTable.vue";
import { SearchIcon } from "@heroicons/vue/solid";
import { useRouter, useRoute, onBeforeRouteUpdate } from "vue-router";
import axios from "axios";
const axiosLocal = axios.create();

const people = [
  {
    name: "Jane Cooper",
    title: "Regional Paradigm Technician",
    role: "Admin",
    email: "jane.cooper@example.com",
  },
  {
    name: "Cody Fisher",
    title: "Product Directives Officer",
    role: "Owner",
    email: "cody.fisher@example.com",
  },
];

export default {
  name: "Home",
  components: {
    ReSelect,
    ReButton,
    ReInput,
    ReTable,
  },
  setup(props, cxt) {
    const router = useRouter();
    const route = useRoute();

    const searchOptionValue: Ref<string | null> = ref(null);
    const group = ref("");
    const searchOptions: { value: searchGroupKey; label: string }[] = [
      {
        value: "P",
        label: searchGroupNameMap["P"],
      },
      {
        value: "I",
        label: searchGroupNameMap["I"],
      },
      {
        value: "E",
        label: searchGroupNameMap["E"],
      },
      {
        value: "A",
        label: searchGroupNameMap["A"],
      },
      {
        value: "D",
        label: searchGroupNameMap["D"],
      },
    ];
    const search = ref("");
    const dataLoading = ref(false);

    const searchClicked = (event: MouseEvent) => {
      doSearch();
    };
    const searchEnterPressed = (event: KeyboardEvent) => {
      const target = event.target as HTMLInputElement;
      target.blur();
      doSearch();
    };
    onMounted(() => {
      const { group: groupParam, search: searchParam } = route.params;
      if (typeof groupParam === "string" && typeof searchParam === "string") {
        group.value = groupParam;
        search.value = searchParam;
        fetchData();
      } else {
        noResult.value = true;
      }
    });
    onBeforeRouteUpdate((to, from, next) => {
      const { group: groupParam, search: searchParam } = to.params;
      if (typeof groupParam === "string" && typeof searchParam === "string") {
        group.value = groupParam;
        search.value = searchParam;
        fetchData();
      } else {
        noResult.value = true;
      }
      next();
    });

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
    const doSearch = async () => {
      if (!group.value) {
        alert("분류를 선택해주세요.");
        return;
      }
      router.push({
        name: "Home",
        params: { group: group.value, search: search.value },
      });
    };

    const makeFields = (data: Record<string, string>[]) => {
      fields.value = reactive(
        Object.keys(data[0]).map((colName) => ({
          key: colName,
          label: colName,
          tdClass: "",
        }))
      );
    };

    const noResult = ref(false);
    const thClass =
      "";
    const fields = ref(
      reactive([
        {
          key: "id",
          label: "hi",
          tdClass: "",
        },
      ])
    );
    const tableData = ref(reactive<Record<string, string>[]>([]));

    return {
      searchOptionValue,
      searchOptions,
      group,
      search,
      searchClicked,
      searchEnterPressed,
      people,
      SearchIcon,
      dataLoading,
      noResult,
      fields,
      thClass,
      tableData,
    };
  },
};
</script>
