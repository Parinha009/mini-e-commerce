/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: ["next/core-web-vitals"],
  ignorePatterns: ["lib/generated/**", "**/lib/generated/**"],
  overrides: [
    {
      files: ["lib/generated/**", "**/lib/generated/**"],
      rules: {
        "@typescript-eslint/no-unused-vars": "off",
        "@typescript-eslint/no-unused-expressions": "off",
        "@typescript-eslint/no-this-alias": "off",
        "@typescript-eslint/no-require-imports": "off",
      },
    },
  ],
};
