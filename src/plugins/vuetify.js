import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'faSvg',
  },
  theme: {
    themes: {
      light: {
      background: "#cfd8dc"
      }
    }
  }
});
