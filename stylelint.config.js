/** @type {import('stylelint').Config} */
export default {
  extends: ["stylelint-config-standard"],
  rules: {
    // 關閉可能與 Tailwind CSS 衝突的規則
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: [
          "tailwind",
          "apply",
          "variants",
          "responsive",
          "screen",
          "layer"
        ]
      }
    ],
    // 允許 Tailwind CSS 的 @apply 指令
    "property-no-unknown": [
      true,
      {
        ignoreProperties: ["@apply"]
      }
    ],
    // 允許 CSS 變數
    "custom-property-pattern": null,
    // 允許 Tailwind CSS 類名中的斜線
    "function-no-unknown": [
      true,
      {
        ignoreFunctions: ["theme", "screen"]
      }
    ],
    // 針對 Tailwind CSS 的顏色函數
    "color-function-notation": null,
    // 允許空的規則集（Tailwind CSS 組件可能為空）
    "block-no-empty": null,
    // 針對 utility-first 的方法，可能會有很多小的 CSS 規則
    "no-descending-specificity": null,
    // 允許 Tailwind CSS v4 的 @import 語法
    "import-notation": null
  }
};