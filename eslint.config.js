import pluginVue from 'eslint-plugin-vue';
import js from "@eslint/js";

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
      'vue/multi-word-component-names': 'off'
    }
  }
]