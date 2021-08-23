<template>
  <div>
    <div ref="trigger" style="display: inline-block;">
      <slot />
    </div>
    <div class="luban-nav-mask" :style="{'z-index': zIndex - 1 }" ref="navMask" v-show="open"></div>
    <div class="luban-nav-panel" :style="{'z-index': zIndex, 'margin-top': offsetTop + 'px' }" ref="navMenu" :class="{'nav-open': open}">
      <div class="nav-left" :style="{'z-index': zIndex + 1 }">
        <div class="nav-all" :class="{'active': expandRight}" @mouseenter="showRight">
          <i></i>
          全部产品
        </div>
        <ul class="nav-collect">
          <li class="nav-item" v-for="fav in favoriteList" :key="'fav-' + (fav.menuApplicationId || fav.title)">
            <span class="nav-item-title" @click="handleMenuClick(fav)">{{fav.title}}</span>
            <span class="nav-item-close" @click="removeFavorite(fav)"></span>
          </li>
        </ul>
      </div>
      <div class="nav-right" :class="{'nav-right-open': expandRight}" :style="{'z-index': zIndex }">
        <div class="pro-box" v-for="app in apps" :key="'nav-' + (app.id || app.title)">
          <div class="pro-category">{{app.title}}</div>
          <div class="pro-list">
            <div class="pro-item" v-for="item in app.appInstances" :key="'app-' + (item.id || item.title)">
              <div class="pro-item-inner">
                <span class="pro-item-txt" @click="handleMenuClick(item)">{{item.title}}</span>
                <span class="pro-item-star" :class="isFavorited(item) ? 'favorited' : ''" @click="setFavorite(item)"></span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
<script>

export default {
  name: 'VueLubanMenu',
  props: {
    zIndex: {
      type: Number,
      default: 2000
    },
    offsetTop: {
      type: Number,
      default: 54
    },
    useDefaultAction: {
      type: Boolean,
      default: true
    },
    apps: {
      type: Array,
      required: true,
      default: function() {
				return []
			}
    },
    favorites: {
      type: Array,
      default: function() {
				return []
			}
    }
  },
  data() {
    return {
      open: false, // 展开菜单
      expandRight: false, // 展开右侧全部应用
      favoriteList: this.favorites,
    };
  },
  watch: {
    favorites(newValue, oldVaue) {
      // 响应prop变化, favoriteList由props的favorites维护
      this.favoriteList = newValue;
    }
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    this.dispose();
  },
  methods: {
    showRight() {
      this.expandRight = true;
    },
    setFavorite(app) {
      // favorites的menuApplicationId对应app的id
      const fav = {...app, menuApplicationId: app.id}
      if (this.isFavorited(fav)) {
        this.removeFavorite(fav);
      } else {
        if (this.useDefaultAction) {
          this.favoriteList = this.favoriteList.concat(fav);
        }
        this.$emit('favorite-add', fav);
      }
    },
    removeFavorite(fav) {
      if (this.useDefaultAction) {
        this.favoriteList = this.favoriteList.filter(i => i.menuApplicationId !== fav.menuApplicationId);
      }
      this.$emit('favorite-remove', fav);
    },
    isFavorited(app) {
      return this.favoriteList.find(i => i.menuApplicationId === app.id)
    },
    handleMenuClick(app) {
      this.hideMenu();
      this.$emit('menu-click', app);
    },
    handleTriggerClick(e) {
      this.open = true;
    },
    hideMenu(e) {
      this.expandRight = false;
      this.open = false;
    },
    init() {
      const reference = this.$refs.trigger;
      const navMenu = this.$refs.navMenu;
      const navMask = this.$refs.navMask;
      // append到body，组件隔离，页面中可同时存在多个导航菜单
      document.querySelector('body').appendChild(navMask);
      document.querySelector('body').appendChild(navMenu);

      reference.addEventListener('click', this.handleTriggerClick)
      navMask.addEventListener('click', this.hideMenu)
    },
    dispose() {
      this.hideMenu();
      const reference = this.$refs.trigger;
      const navMenu = this.$refs.navMenu;
      const navMask = this.$refs.navMask;
      reference.removeEventListener('click', this.handleTriggerClick)
      navMask.removeEventListener('click', this.hideMenu)
      // remove navMenu
      navMask.parentNode.removeChild(navMask);
      navMenu.parentNode.removeChild(navMenu);
    }
  },
};
</script>

<style lang="scss" scoped>
.luban-nav-mask {
  z-index: 1999;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
.luban-nav-panel {
  z-index: 2000;
  position: fixed;
  margin-top: 54px;
  left: 0;
  top: 0;
  bottom: 0;
  display: flex;
  // 防止部分浏览器在translateX(-100%)仍可触发显示菜单
  visibility: hidden;
  transform: translateX(-100%);
  transition: all .3s ease-in-out;
  &.nav-open {
    transform: translateX(0);
    visibility: visible;
  }
  .nav-left {
    z-index: 2001;
    position: relative;
    width: 250px;
    background: #000A17;
    .nav-all {
      position: relative;
      padding: 16px;
      font-size: 14px;
      line-height: 20px;
      color: #fff;
      text-align: left;
      cursor: pointer;
      i {
        display: inline-block;
        margin-right: 3px;
        width: 16px;
        height: 16px;
        vertical-align: -3px;
        background: url(../assets/icon-nav-all.png) no-repeat;
        background-size: contain;
      }
      &:hover {
        background: #061528;
      }
      &.active {
        background: #061528;
        &::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 16px;
          right: 16px;
          height: 1px;
          background: rgba(255,255,255,0.08);
        }
      }
    }
    .nav-collect {
      position: absolute;
      left: 0;
      right: 0;
      top: 52px;
      bottom: 0;
      overflow: auto;
      list-style: none;
      padding: 0;
      margin: 0;
      .nav-item {
        position: relative;
        padding: 16px;
        display: flex;
        align-items: center;
        cursor: pointer;
        .nav-item-title {
          flex: 1;
          display: block;
          font-size: 14px;
          line-height: 20px;
          color: #fff;
          text-align: left;
        }
        .nav-item-close {
          display: block;
          width: 12px;
          height: 12px;
          opacity: 0;
          background: url(../assets/icon-nav-close.png) no-repeat;
          background-size: contain;
        }
        &:hover {
          background: #061528;
          .nav-item-close {
            opacity: 1;
          }
        }
      }
    }
  }
  .nav-right {
    z-index: 2000;
    position: absolute;
    left: 250px;
    top: 0;
    bottom: 0;
    width: 560px;
    background: #061528;
    overflow: auto;
    transform: translateX(-100%);
    transition: all .24s ease-in-out;
    &.nav-right-open {
      transform: translateX(0);
    }
    .pro-box {
      margin-bottom: 20px;
      .pro-category {
        position: relative;
        margin: 0 24px;
        padding: 16px 0;
        font-size: 16px;
        line-height: 20px;
        text-align: left;
        color: #fff;
        padding-left: 24px;
        border-bottom: 1px solid rgba(255,255,255,0.08);
        &::before {
          content: '';
          display: block;
          position: absolute;
          top: 17px;
          left: 8px;
          width: 4px;
          height: 16px;
          background: #2E92F7;
        }
      }
      .pro-list {
        display: flex;
        flex-wrap: wrap;
        .pro-item {
          width: 50%;
          margin: 8px 0;
          .pro-item-inner {
            display: flex;
            align-items: center;
            padding: 8px;
            margin: 0 24px;
            cursor: pointer;
            &:hover {
              background: #15253A;
              border-radius: 4px;
              .pro-item-star {
                opacity: 1;
              }
            }
            .pro-item-txt {
              flex: 1;
              display: block;
              font-size: 14px;
              line-height: 20px;
              text-align: left;
              color: #fff;
            }
            .pro-item-star {
              display: block;
              opacity: 0;
              width: 20px;
              height: 20px;
              border-radius: 50%;
              background: url(../assets/icon-nav-star.png) no-repeat;
              background-size: contain;
              &.favorited {
                opacity: 1;
                background: url(../assets/icon-nav-stard.png) no-repeat;
                background-size: contain;
              }
            }
          }

        }
      }
    }
  }
}
</style>