<template>
  <div class="flex items-center justify-between">
    <div class="flex-1 flex justify-between sm:hidden">
      <a
        href="#"
        class="
          relative
          inline-flex
          items-center
          px-4
          py-2
          border border-gray-300
          text-sm
          font-medium
          rounded-md
          text-gray-700
          bg-white
          hover:bg-gray-50
        "
      >
        이전
      </a>
      <a
        href="#"
        class="
          ml-3
          relative
          inline-flex
          items-center
          px-4
          py-2
          border border-gray-300
          text-sm
          font-medium
          rounded-md
          text-gray-700
          bg-white
          hover:bg-gray-50
        "
      >
        다음
      </a>
    </div>
    <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
      <div>
        <p class="text-sm text-gray-700">
          {{ " " }}
          <span class="font-medium"> {{ startIndex }} </span>
          ~
          <span class="font-medium"> {{ endIndex }} </span>
          표시 (총
          <span class="font-medium"> {{ totalCount }}</span>
          개)
        </p>
      </div>
      <div>
        <nav
          class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
          aria-label="Pagination"
        >
          <component
            :is="previousComponent"
            :to="currentPage > 1 ? linkGen(currentPage - 1) : ''"
            :class="arrowPrevClass"
            class="rounded-l-md"
          >
            <span class="sr-only">이전</span>
            <ChevronLeftIcon class="h-5 w-5" aria-hidden="true" />
          </component>
          <!-- Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" -->
          <component
            :is="isRouterLink ? RouterLink : 'a'"
            v-if="rangeInfo.showFirst"
            :to="linkGen(1)"
            :class="otherClass"
          >
            1
          </component>
          <span v-if="rangeInfo.showLeftDotted" :class="dottedClass">
            ...
          </span>
          <component
            :is="isRouterLink ? RouterLink : 'a'"
            v-for="page in rangeInfo.pageRange"
            :key="page"
            :to="linkGen(page)"
            :class="page === currentPage ? currentClass : otherClass"
          >
            {{ page }}
          </component>
          <span v-if="rangeInfo.showRightDotted" :class="dottedClass">
            ...
          </span>
          <component
            :is="isRouterLink ? RouterLink : 'a'"
            v-if="rangeInfo.showLast"
            :to="linkGen(totalPage)"
            :class="otherClass"
          >
            {{ totalPage }}
          </component>

          <component
            :is="nextComponent"
            :to="currentPage < totalPage ? linkGen(currentPage + 1) : ''"
            :class="arrowNextClass"
            class="rounded-r-md"
          >
            <span class="sr-only">다음</span>
            <ChevronRightIcon class="h-5 w-5" aria-hidden="true" />
          </component>
        </nav>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, PropType } from "vue";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/solid";
import { RouteLocationRaw, RouterLink } from "vue-router";

export default {
  components: {
    ChevronLeftIcon,
    ChevronRightIcon,
  },
  props: {
    currentPage: {
      type: Number,
      default: 1,
    },
    totalPage: {
      type: Number,
      default: 11,
    },
    nearCount: {
      type: Number,
      default: 3,
    },
    totalCount: {
      type: Number,
      default: 100,
    },
    startIndex: {
      type: Number,
      default: 1,
    },
    endIndex: {
      type: Number,
      default: 10,
    },
    linkGen: {
      type: Function as PropType<(page: number) => RouteLocationRaw>,
      default: (page: number): RouteLocationRaw => ({
        name: "ClassifySearch",
        query: { page: `${page}` },
      }),
    },
    isRouterLink: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, ctx) {
    const currentClass =
      "z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium";
    const otherClass =
      "bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium";
    const dottedClass =
      "relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700";

    const rangeInfo = computed(() => {
      let showFirst = true;
      let showLast = true;
      let showLeftDotted = false;
      let showRightDotted = false;
      let oLeft = props.currentPage - props.nearCount;
      let oRight = props.currentPage + props.nearCount;
      let leftDeficient = 0;
      let rightDeficient = 0;
      if (oLeft <= 1) {
        leftDeficient = 1 - oLeft;
        oLeft = 1;
      }
      if (oRight >= props.totalPage) {
        rightDeficient = oRight - props.totalPage;
        oRight = props.totalPage;
      }
      oRight += leftDeficient;
      oLeft -= rightDeficient;
      if (oRight >= props.totalPage) {
        oRight = props.totalPage;
        showLast = false;
      }
      if (oLeft <= 1) {
        oLeft = 1;
        showFirst = false;
      }
      if (oLeft >= 3) {
        showLeftDotted = true;
      }
      if (oRight <= props.totalPage - 2) {
        showRightDotted = true;
      }
      const pageRange: number[] = [];
      for (let i = oLeft; i <= oRight; i += 1) {
        pageRange.push(i);
      }
      return {
        showFirst,
        showLast,
        showLeftDotted,
        showRightDotted,
        oLeft,
        oRight,
        pageRange,
      };
    });

    const previousComponent = computed(() => {
      if (props.currentPage === 1) return "span";
      if (props.isRouterLink) return RouterLink;
      return "a";
    });
    const isPreviousActive = computed(() => {
      return props.currentPage !== 1;
    });
    const isNextActive = computed(() => {
      return props.currentPage !== props.totalPage;
    });

    const genArrowClass = (activeness: ComputedRef<boolean>) => {
      return computed(() => {
        let conditional = "";
        if (activeness.value) {
          conditional = "hover:bg-gray-50";
        } else {
          conditional = "opacity-50";
        }
        return `relative inline-flex items-center px-2 py-2  border border-gray-300 bg-white text-sm font-medium text-gray-500 ${conditional}`;
      });
    };
    const arrowPrevClass = genArrowClass(isPreviousActive);
    const arrowNextClass = genArrowClass(isNextActive);
    const nextComponent = computed(() => {
      if (props.currentPage === props.totalPage) return "span";
      if (props.isRouterLink) return RouterLink;
      return "a";
    });

    return {
      currentClass,
      otherClass,
      dottedClass,
      arrowPrevClass,
      arrowNextClass,
      rangeInfo,
      RouterLink,
      previousComponent,
      nextComponent,
      isPreviousActive,
      isNextActive,
    };
  },
};
</script>

<style></style>
