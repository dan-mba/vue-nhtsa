import pluginVue from 'eslint-plugin-vue';
import js from "@eslint/js";
import globals from 'globals';

export default [
  {
    ignores: ["dist/**/*"],
  },
  js.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  {
    rules: {
      'no-console': 'off',
      'no-prototype-builtins': 'off',
      'vue/multi-word-component-names': 'off',
      'vue/attribute-hyphenation': 'off',
      'vue/first-attribute-linebreak': 'off',
      'vue/max-attributes-per-line': 'off'
    },
    languageOptions: {
      sourceType: 'module',
      globals: {
        ...globals.browser
      }
    }
  }
]