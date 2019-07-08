module.exports = {
  plugins: ["stylelint-order"],
  extends: [
    "stylelint-config-standard",
    "./node_modules/prettier-stylelint/config.js"
  ],
  ignoreFiles: ["**/node_modules/**"],
  rules: {
    indentation: 2,
    "string-quotes": "single",
    "order/properties-alphabetical-order": true,
    "selector-type-no-unknown": null,
    "selector-type-case": null,
    "font-family-no-missing-generic-family-keyword": null,
    "rule-empty-line-before": null
  }
};
