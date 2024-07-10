import {createApp} from 'vue';
import App from './App';
import PrimeVue from 'primevue/config';
import {definePreset} from '@primevue/themes';
import Aura from '@primevue/themes/aura';
import Dropdown from 'primevue/dropdown';
import Card from 'primevue/card';
import Rating from 'primevue/rating';
import './main.css';
import 'primeicons/primeicons.css';

const app = createApp(App);
const MyPreset = definePreset(Aura, {
  semantic: {
      primary: {
          50: '{sky.50}',
          100: '{sky.100}',
          200: '{sky.200}',
          300: '{sky.300}',
          400: '{sky.400}',
          500: '{sky.500}',
          600: '{sky.600}',
          700: '{sky.700}',
          800: '{sky.800}',
          900: '{sky.900}',
          950: '{sky.950}'
      }
  }
});

app.use(PrimeVue, {
  // Default theme configuration
  theme: {
    preset: MyPreset,
    options: {
      prefix: 'p',
      darkModeSelector: 'system',
      cssLayer: {
        name: 'primevue',
        order: 'tailwind-base, primevue, tailwind-utilities'
      }
    }
  }
});
app.component('Dropdown', Dropdown);
app.component('Card', Card);
app.component('Rating', Rating);

app.mount('#app');
