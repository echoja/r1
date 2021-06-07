<template>
  <div class="container mx-auto text-left">
    <div class="flex justify-center">
      <el-select v-model="searchOptionValue" placeholder="Select" class="mr-3">
        <el-option
          v-for="item in searchOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-input v-model="search" class="max-w-md" suffix-icon="el-icon-search"></el-input>
    </div>
  </div>
</template>

<script lang="ts">
import { Ref, ref } from "vue";
import {ElSelect, ElOption, ElInput} from 'element-plus'
export default {
  name: "Home",
  components: {
    ElSelect,
    ElOption,
    ElInput,
  },
  setup() {
    const searchOptionValue: Ref<string | null> = ref(null);
    const searchOptions = [
      {
        value: "Option1",
        label: "Option1",
      },
      {
        value: "Option2",
        label: "Option2",
      },
      {
        value: "Option3",
        label: "Option3",
      },
      {
        value: "Option4",
        label: "Option4",
      },
      {
        value: "Option5",
        label: "Option5",
      },
    ];
    const search = ref('');

    return {
      searchOptionValue,
      searchOptions,
      search,
    };
  },
};
</script>
