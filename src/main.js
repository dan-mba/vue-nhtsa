import {createApp} from 'vue';
import App from './App';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import Dropdown from 'primevue/dropdown';
import Card from 'primevue/card';
import Rating from 'primevue/rating';
import './main.css';
import 'primeicons/primeicons.css';

const app = createApp(App);

app.use(PrimeVue, {
  // Default theme configuration
  theme: {
    preset: Aura,
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
