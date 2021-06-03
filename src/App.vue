<template>
  <div id="app">
    
    <vue-luban-menu :z-index="1000" :offset-top="54" :apps="apps" :use-default-action="false" :favorites="favorites" @favorite-remove="removeFavorite" @favorite-add="addFavorite">
      <div class="trigger">
        <img src="./icon-trigger.png">
      </div>
    </vue-luban-menu>

  </div>
</template>

<script>

export default {
  name: 'app',
  data () {
    return {
      favorites: [],
      apps: [
        {
          id: 1,
          title: '应用开发',
          appInstances: [
            { id: 2, title: '数据质量开发' },
            { id: 3, title: '数据服务开发' },
            { id: 4, title: 'steamSQL' },
            { id: 5, title: '工作流开发' },
          ]
        },
        {
          id: 2,
          title: '数据分析&可视化',
          appInstances: [
            { id: 6, title: 'Scripts' },
            { id: 7, title: 'Visualis' },
            { id: 8, title: 'Datav' },
            { id: 9, title: 'EasyIED' },
          ]
        }
      ],
    }
  },
  mounted() {
    setTimeout(() => {
      this.favorites = [{ id: 1, menuApplicationId: 3, title: '数据服务开发' }];
    }, 2000)
  },
  methods: {
    removeFavorite(item) {
      console.log('outer remove', item);
      this.favorites = this.favorites.filter(i => i.menuApplicationId !== item.menuApplicationId);
    },
    addFavorite(item) {
      console.log('outer add', item)
      this.favorites = this.favorites.concat(item);
    }
  }
}
</script>

<style lang="scss">
html,body {
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.trigger {
  display: block;
  width: 54px;
  height: 54px;
  line-height: 54px;
  background: #0B203C;
  text-align: center;
  cursor: pointer;
  &:hover {
    background: #061528;
  }
  img {
    width: 24px;
    height: 24px;
    vertical-align: middle;
  }
}
</style>
