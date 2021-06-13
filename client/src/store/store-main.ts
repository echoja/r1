import { createStore } from "vuex";

interface RootState {
  count: number;
}

export const store = createStore<RootState>({
  state() {
    return {
      count: 1,
    };
  },
  mutations: {
    addCount(state) {
      state.count++;
    },
  },
});
