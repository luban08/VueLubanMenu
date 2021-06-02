import NavMenu from './NavMenu.vue'

// 通过install来安装组件
NavMenu.install = function(Vue) {
  Vue.component(NavMenu.name, NavMenu);
};

export default NavMenu;