import Vue from "vue";
import VueI18n from "vue-i18n";
import en from "../locales/en.json"
import fa from "../locales/fa.json"

Vue.use(VueI18n)


export default new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: 
  {
    en: JSON.parse(JSON.stringify(en)),
    fa: JSON.parse(JSON.stringify(fa)),
  }
})