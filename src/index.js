import { nami } from './nami';

export const NsVueNami = {
  install(Vue, options) {
    let vm = new Vue();
    Vue.prototype.$nami = nami(vm);
  }
}

export default NsVueNami;