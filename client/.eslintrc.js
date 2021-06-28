module.exports = {
  // env: {
  //   es2021: true,
  //   node: true,
  // },
  extends: [
    "airbnb-base",
    "eslint:recommended",
    "plugin:prettier/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:vue/vue3-essential",
  ],
  // plugins: ["vue"],
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: 2021,
    sourceType: "module",
  },
  rules: {
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "import/no-unresolved": "off",
    "import/extensions": "off",
  },
};
