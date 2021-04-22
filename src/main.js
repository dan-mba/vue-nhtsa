import {createApp} from 'vue';
import App from './App';
import PrimeVue from 'primevue/config';
import Dropdown from 'primevue/dropdown';
import Card from 'primevue/card';
import Rating from 'primevue/rating';
import 'primevue/resources/themes/vela-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './main.css';

const app = createApp(App);

app.use(PrimeVue);
app.component('Dropdown', Dropdown);
app.component('Card', Card);
app.component('Rating', Rating);

app.mount('#app');
